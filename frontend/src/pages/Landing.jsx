import { Link, useNavigate } from 'react-router-dom'
import { useFarmer } from '../context/FarmerContext'

const features = [
  {
    title: 'Real-time Weather',
    description: 'Monitor local weather trends and farm-level conditions in near real-time.'
  },
  {
    title: 'Planting Recommendations',
    description: 'Get AI-generated guidance on when to plant and how to prepare fields.'
  },
  {
    title: 'Risk Alerts',
    description: 'Receive warnings for heavy rain, drought, wind, and crop stress events.'
  }
]

export default function Landing() {
  const navigate = useNavigate()
  const { farmerId } = useFarmer()

  const handleGetStarted = () => {
    if (farmerId) {
      navigate('/dashboard/farms')
    } else {
      navigate('/dashboard/profile')
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="floating-blob absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="floating-blob absolute -right-20 top-36 h-64 w-64 rounded-full bg-green-300/30 blur-3xl" />

      <section className="page-wrap relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Smart Agriculture Platform
          </p>
          <h1 className="hero-title fade-in-up text-5xl font-bold text-primary sm:text-6xl">
            AgriShield AI
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
            AI-powered weather intelligence for smallholder farmers.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Understand weather patterns, protect crops earlier, and make better planting decisions with confidence.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleGetStarted}
              className="rounded-xl bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Get Started
            </button>
            <Link
              to="/dashboard/insights"
              className="rounded-xl border border-emerald-200 bg-white px-7 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              Explore Insights
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <article
              key={feature.title}
              className="fade-in-up glass-panel rounded-2xl p-5"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <h2 className="text-lg font-extrabold text-primary">{feature.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}