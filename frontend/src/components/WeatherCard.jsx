export default function WeatherCard({ label, value }) {
  return (
    <div className="metric-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-primary">{value}</p>
    </div>
  )
}