import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import DashboardLayout from './pages/DashboardLayout'
import FarmerProfile from './pages/FarmerProfile'
import FarmRegistration from './pages/FarmRegistration'
import MyFarms from './pages/MyFarms'
import WeatherInsights from './pages/WeatherInsights'

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-xl border p-4 shadow-lg backdrop-blur ${toast.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium">{toast.message}</p>
            <button className="text-xs opacity-70 hover:opacity-100" onClick={() => onDismiss(toast.id)}>
              close
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (event) => {
      const { type = 'success', message = 'Done' } = event.detail || {}
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, type, message }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 3500)
    }

    window.addEventListener('app:toast', handler)
    return () => window.removeEventListener('app:toast', handler)
  }, [])

  const dismissToast = useMemo(
    () => (id) => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
    []
  )

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route path="farm/new" element={<FarmRegistration />} />
          <Route path="farms" element={<MyFarms />} />
          <Route path="insights" element={<WeatherInsights />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}
