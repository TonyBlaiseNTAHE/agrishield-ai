import React, { useEffect, useState } from 'react'
import { fetchFarms } from '../services/api'
import FarmCard from '../components/FarmCard'
import WeatherModal from '../components/WeatherModal'

export default function Dashboard() {
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFarm, setSelectedFarm] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchFarms().then(res => {
      if (mounted) { setFarms(res.data || []); setLoading(false) }
    }).catch(err => { setError(err.message || 'Failed to load farms'); setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Farms</h1>
      </div>

      {loading && <div className="text-center py-8">Loading farms...</div>}
      {error && <div className="text-danger">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map(f => (
          <FarmCard key={f._id} farm={f} onClick={() => setSelectedFarm(f)} />
        ))}
      </div>

      {selectedFarm && (
        <WeatherModal farm={selectedFarm} onClose={() => setSelectedFarm(null)} />
      )}
    </div>
  )
}
