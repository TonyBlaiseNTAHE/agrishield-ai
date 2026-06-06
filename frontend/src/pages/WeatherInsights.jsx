import { useEffect, useMemo, useState } from 'react'
import WeatherCard from '../components/WeatherCard'
import { fetchFarms, fetchWeatherInsight } from '../services/api'

function notify(type, message) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { type, message } }))
}

export default function WeatherInsights() {
  const [farms, setFarms] = useState([])
  const [farmId, setFarmId] = useState('')
  const [insight, setInsight] = useState(null)
  const [loadingFarms, setLoadingFarms] = useState(true)
  const [loadingInsight, setLoadingInsight] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoadingFarms(true)
      try {
        const response = await fetchFarms()
        const list = response.data || []
        setFarms(list)
        if (list.length > 0) {
          setFarmId(list[0]._id)
        }
      } catch (error) {
        notify('error', error.message || 'Failed to load farms.')
      } finally {
        setLoadingFarms(false)
      }
    }

    run()
  }, [])

  useEffect(() => {
    if (!farmId) {
      setInsight(null)
      return
    }

    const run = async () => {
      setLoadingInsight(true)
      try {
        const response = await fetchWeatherInsight(farmId)
        setInsight(response.data)
      } catch (error) {
        notify('error', error.message || 'Failed to load weather insight.')
      } finally {
        setLoadingInsight(false)
      }
    }
    run()
  }, [farmId])

  const selectedFarm = useMemo(() => farms.find((farm) => farm._id === farmId), [farms, farmId])

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-extrabold text-primary">Weather Insights</h3>
        <p className="mt-2 text-sm text-slate-600">Choose a farm to view current weather analytics and planting readiness.</p>

        <div className="mt-4 max-w-md">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Select Farm</label>
          <select
            value={farmId}
            onChange={(event) => setFarmId(event.target.value)}
            disabled={loadingFarms || farms.length === 0}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none ring-primary/20 transition focus:ring"
          >
            {farms.map((farm) => (
              <option key={farm._id} value={farm._id}>
                {farm.cropType} - {farm.location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loadingInsight && (
        <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-primary" />
          <p className="mt-3 text-sm text-slate-600">Analyzing weather data...</p>
        </div>
      )}

      {!loadingInsight && insight && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <WeatherCard label="Temperature" value={`${insight.currentWeather.temperature ?? '-'} C`} />
            <WeatherCard label="Humidity" value={`${insight.currentWeather.humidity ?? '-'} %`} />
            <WeatherCard label="Rainfall" value={`${insight.currentWeather.rainfall ?? '-'} mm`} />
            <WeatherCard label="Wind Speed" value={`${insight.currentWeather.windSpeed ?? '-'} km/h`} />
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-emerald-800">
              <span>Planting Readiness Meter</span>
              <span>{insight.optimalPlantingScore}%</span>
            </div>
            <div className="h-3 rounded-full bg-emerald-100">
              <div className="h-3 rounded-full bg-primary" style={{ width: `${insight.optimalPlantingScore}%` }} />
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Farm: {selectedFarm?.cropType || '-'} in {selectedFarm?.location || '-'}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h4 className="text-lg font-extrabold text-primary">7-Day Weather Forecast Preview</h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
              {insight.forecast.map((day) => (
                <div key={day.day} className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm">
                  <p className="font-bold text-emerald-900">{day.day}</p>
                  <p className="mt-1 text-slate-700">Min: {day.min ?? '-'} C</p>
                  <p className="text-slate-700">Max: {day.max ?? '-'} C</p>
                  <p className="text-slate-700">Rain: {day.rainfall ?? '-'} mm</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}