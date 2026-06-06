const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function parseResponse(response) {
  const text = await response.text()
  let parsed

  try {
    parsed = text ? JSON.parse(text) : {}
  } catch {
    parsed = { message: text || 'Unexpected response from server' }
  }

  if (!response.ok) {
    const message = parsed?.message || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return parsed
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  return parseResponse(response)
}

function toNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null
  }
  if (typeof value === 'number') {
    return Number.isNaN(value) ? null : value
  }

  const cleaned = String(value).replace(/,/g, '').trim()
  const numericMatch = cleaned.match(/-?\d+(?:\.\d+)?/)
  const num = numericMatch ? Number(numericMatch[0]) : Number(cleaned)
  return Number.isNaN(num) ? null : num
}

function computePlantingScore(current) {
  const temp = toNumber(current.temperature)
  const humidity = toNumber(current.humidity)
  const wind = toNumber(current.windSpeed)
  const rain = toNumber(current.rainfall)

  let score = 70
  if (temp !== null) {
    if (temp < 18 || temp > 34) score -= 18
    else if (temp < 20 || temp > 30) score -= 8
    else score += 8
  }
  if (humidity !== null) {
    if (humidity < 45 || humidity > 90) score -= 12
    else score += 6
  }
  if (wind !== null) {
    if (wind > 32) score -= 15
    else if (wind > 20) score -= 7
    else score += 4
  }
  if (rain !== null) {
    if (rain > 55) score -= 12
    else if (rain < 2) score -= 4
    else score += 4
  }

  return Math.max(0, Math.min(100, Math.round(score)))
}

function normalizeAlerts(alerts = []) {
  return alerts.map((alert) => {
    if (typeof alert === 'string') {
      return { type: 'GENERAL', severity: 'MEDIUM', message: alert }
    }
    return {
      type: alert.type || 'GENERAL',
      severity: alert.severity || 'MEDIUM',
      message: alert.message || 'Alert'
    }
  })
}

function buildForecast(root, current) {
  const daily = root?.forecast || root?.daily || root?.weather?.daily || root?.rawData?.data?.daily
  if (Array.isArray(daily) && daily.length > 0) {
    return daily.slice(0, 7).map((day, idx) => ({
      day: day.day || day.date || `Day ${idx + 1}`,
      min: toNumber(day.tempMin ?? day.min ?? day.temperature_min ?? day.temperatureMin),
      max: toNumber(day.tempMax ?? day.max ?? day.temperature_max ?? day.temperatureMax),
      rainfall: toNumber(day.rainfall ?? day.precipitation ?? day.precipitation_sum ?? 0)
    }))
  }

  const base = toNumber(current.temperature) ?? 25
  return Array.from({ length: 7 }).map((_, idx) => ({
    day: `Day ${idx + 1}`,
    min: Math.round(base - 4 + Math.sin(idx) * 2),
    max: Math.round(base + 4 + Math.cos(idx) * 2),
    rainfall: Math.max(0, Math.round((toNumber(current.rainfall) ?? 8) + Math.sin(idx * 1.3) * 5))
  }))
}

export function normalizeInsight(payload) {
  const root = payload?.data || payload || {}
  const currentSource =
    root.currentWeather ||
    root.current ||
    root.weather ||
    root.snapshot ||
    root.snapshot?.rawData?.data?.current ||
    root.rawData?.data?.current ||
    {}

  const currentWeather = {
    temperature: toNumber(currentSource.temperature ?? root.temperature),
    humidity: toNumber(currentSource.humidity ?? root.humidity),
    rainfall: toNumber(currentSource.rainfall ?? currentSource.precipitation ?? root.rainfall ?? root.precipitation),
    windSpeed: toNumber(currentSource.windSpeed ?? currentSource.wind_speed ?? root.windSpeed ?? root.wind_speed)
  }

  const recommendations = root.recommendations || root.advisories || []
  const alerts = normalizeAlerts(root.alerts || root.snapshot?.alerts || [])
  const plantingScore = toNumber(root.optimalPlantingScore ?? root.plantingReadiness) ?? computePlantingScore(currentWeather)

  return {
    farm: root.farm || null,
    currentWeather,
    recommendations,
    alerts,
    timestamp: root.timestamp || currentSource.time || new Date().toISOString(),
    optimalPlantingScore: plantingScore,
    forecast: buildForecast(root, currentWeather)
  }
}

export async function registerFarmer(payload) {
  return request('/api/farmers', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function createFarm(payload) {
  return request('/api/farms', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function fetchFarms() {
  return request('/api/farms')
}

export async function fetchWeatherInsight(farmId) {
  const response = await request(`/api/weather/farm/${farmId}/insight`)
  return {
    ...response,
    data: normalizeInsight(response)
  }
}

export default {
  registerFarmer,
  createFarm,
  fetchFarms,
  fetchWeatherInsight,
  normalizeInsight
}
