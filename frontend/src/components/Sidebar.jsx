import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard/profile', label: 'My Profile' },
  { to: '/dashboard/farm/new', label: 'Register Farm' },
  { to: '/dashboard/farms', label: 'My Farms' },
  { to: '/dashboard/insights', label: 'Weather Insights' }
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-emerald-100 bg-white/90 p-6 backdrop-blur transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8">
          <h1 className="hero-title text-2xl font-bold text-primary">AgriShield AI</h1>
          <p className="mt-2 text-sm text-emerald-900/70">Farm intelligence dashboard</p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
              }
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}
    </>
  )
}