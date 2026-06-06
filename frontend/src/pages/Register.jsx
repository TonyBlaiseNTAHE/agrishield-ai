import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerFarmer } from '../services/api'
import { useFarmer } from '../context/FarmerContext'

export default function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { setFarmer } = useFarmer()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await registerFarmer({ name, phone, location })
      setFarmer(res.data)
      navigate('/farm/new')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-12 glass p-6 rounded-lg card-shadow">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input required value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            required
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Kigali, Rwanda"
            className="mt-1 block w-full rounded-md border-gray-200 p-2"
          />
        </div>
        {error && <div className="text-danger text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="w-full py-2 rounded-md bg-primary text-white">{loading? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  )
}
