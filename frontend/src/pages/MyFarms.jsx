import { useEffect, useState } from 'react'
import FarmCard from '../components/FarmCard'
import WeatherModal from '../components/WeatherModal'
import { fetchFarms } from '../services/api'

function notify(type, message) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { type, message } }))
}

export default function MyFarms() {
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFarm, setSelectedFarm] = useState(null)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const response = await fetchFarms()
        setFarms(response.data || [])
      } catch (error) {
        notify('error', error.message || 'Failed to load farms.')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <section>
      <h3 className="text-2xl font-extrabold text-primary">My Farms</h3>
      <p className="mt-2 text-sm text-slate-600">Select a farm and request weather insight instantly.</p>

      {loading ? (
        <div className="py-14 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-primary" />
          <p className="mt-3 text-sm text-slate-600">Loading farms...</p>
        </div>
      ) : farms.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-6 text-sm font-medium text-amber-700">
          No farms found. Register a farm first.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {farms.map((farm) => (
            <FarmCard key={farm._id} farm={farm} onGetInsight={setSelectedFarm} />
          ))}
        </div>
      )}

      {selectedFarm && (
        <WeatherModal farm={selectedFarm} onClose={() => setSelectedFarm(null)} />
      )}
    </section>
  )
}