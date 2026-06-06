import { useNavigate } from 'react-router-dom'
import { useFarmer } from '../context/FarmerContext'

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate()
  const { farmer, logout } = useFarmer()

  const handleLogout = () => {
    logout()
    window.dispatchEvent(
      new CustomEvent('app:toast', {
        detail: { type: 'success', message: 'You have logged out.' }
      })
    )
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 lg:hidden"
          >
            Menu
          </button>
          <div>
            <h2 className="text-lg font-extrabold text-primary">Dashboard</h2>
            <p className="text-xs text-emerald-900/70">AI-guided insights for crop decisions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 sm:block">
            {farmer?.name || 'Farmer'}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-danger px-3 py-2 text-sm font-semibold text-white shadow transition hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
