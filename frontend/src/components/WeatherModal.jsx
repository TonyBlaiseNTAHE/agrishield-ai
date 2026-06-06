import { useEffect, useState } from 'react'
import { fetchWeatherInsight } from '../services/api'
import WeatherCard from './WeatherCard'

function Progress({ score }) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-emerald-800">
        <span>Optimal Planting Score</span>
        <span>{score}%</span>
      </div>
      <div className="h-2 rounded-full bg-emerald-100">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export default function WeatherModal({ farm, onClose }) {
  const [insight, setInsight] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetchWeatherInsight(farm._id)
        setInsight(response.data)
      } catch (err) {
        setError(err.message || 'Failed to fetch weather insight.')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [farm._id])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close weather modal"
        onClick={onClose}
      />

      <section className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-primary">{farm.cropType} Weather Insight</h3>
            <p className="text-sm text-slate-600">{farm.location}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
          >
            Close
          </button>
        </div>

        {loading && (
          <div className="py-12 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-primary" />
            <p className="mt-3 text-sm text-slate-600">Fetching insight...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {!loading && insight && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <WeatherCard label="Temperature" value={`${insight.currentWeather.temperature ?? '-'} C`} />
              <WeatherCard label="Humidity" value={`${insight.currentWeather.humidity ?? '-'} %`} />
              <WeatherCard label="Rainfall" value={`${insight.currentWeather.rainfall ?? '-'} mm`} />
              <WeatherCard label="Wind Speed" value={`${insight.currentWeather.windSpeed ?? '-'} km/h`} />
            </div>

            <Progress score={insight.optimalPlantingScore ?? 0} />

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-emerald-800">Planting Recommendations</h4>
              {insight.recommendations.length === 0 ? (
                <p className="mt-2 text-sm text-emerald-900/70">No recommendations available.</p>
              ) : (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-900">
                  {insight.recommendations.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-red-700">Alerts</h4>
              {insight.alerts.length === 0 ? (
                <p className="mt-2 text-sm text-red-900/70">No active alerts.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {insight.alerts.map((alert, index) => (
                    <li key={`${alert.type}-${index}`} className="rounded-lg border border-red-200 bg-white/70 p-3 text-sm">
                      <span className="font-semibold text-red-700">{alert.type}</span>
                      <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                        {alert.severity}
                      </span>
                      <p className="mt-1 text-red-900">{alert.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="text-xs text-slate-500">Updated: {new Date(insight.timestamp).toLocaleString()}</p>
          </div>
        )}
      </section>
    </div>
  )
}
