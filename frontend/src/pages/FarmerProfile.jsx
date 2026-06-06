import { useState } from 'react'
import { registerFarmer } from '../services/api'
import { useFarmer } from '../context/FarmerContext'

function notify(type, message) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { type, message } }))
}

export default function FarmerProfile() {
  const { farmer, setFarmer } = useFarmer()
  const [form, setForm] = useState({
    name: farmer?.name || '',
    phone: farmer?.phone || '',
    location: farmer?.location || ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await registerFarmer(form)
      setFarmer(response.data)
      notify('success', 'Farmer profile saved successfully.')
    } catch (error) {
      notify('error', error.message || 'Unable to save farmer profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-extrabold text-primary">My Profile</h3>
      <p className="mt-2 text-sm text-slate-600">Register your farmer profile before adding farms.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Phone Number</label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. +2507..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Location</label>
          <input
            required
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="District / Village"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none ring-primary/20 transition focus:ring"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </section>
  )
}