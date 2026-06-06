import { useState } from 'react'
import { createFarm } from '../services/api'
import { useFarmer } from '../context/FarmerContext'

function notify(type, message) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { type, message } }))
}

export default function FarmRegistration() {
  const { farmerId } = useFarmer()
  const [form, setForm] = useState({
    cropType: 'maize',
    location: '',
    latitude: '',
    longitude: '',
    size: ''
  })
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!farmerId) {
      notify('error', 'Please register your profile first.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        farmerId,
        cropType: form.cropType,
        location: form.location,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        size: parseFloat(form.size)
      }

      await createFarm(payload)
      notify('success', 'Farm registered successfully.')
      setForm({ cropType: 'maize', location: '', latitude: '', longitude: '', size: '' })
    } catch (err) {
      notify('error', err.message || 'Failed to register farm.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-extrabold text-primary">Register Farm</h3>
      <p className="mt-2 text-sm text-slate-600">Add farm details to receive weather and risk insights.</p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Crop Type</label>
          <select
            name="cropType"
            value={form.cropType}
            onChange={handle}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          >
            <option value="maize">Maize</option>
            <option value="beans">Beans</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Location Name</label>
          <input
            required
            name="location"
            value={form.location}
            onChange={handle}
            placeholder="Village / Sector"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Latitude</label>
          <input
            required
            name="latitude"
            type="number"
            step="any"
            value={form.latitude}
            onChange={handle}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Longitude</label>
          <input
            required
            name="longitude"
            type="number"
            step="any"
            value={form.longitude}
            onChange={handle}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Size (hectares)</label>
          <input
            required
            name="size"
            type="number"
            step="0.01"
            min="0"
            value={form.size}
            onChange={handle}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Farm'}
          </button>
        </div>
      </form>
    </section>
  )
}
