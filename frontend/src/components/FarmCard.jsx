export default function FarmCard({ farm, onGetInsight }) {
  return (
    <article className="fade-in-up rounded-2xl border border-emerald-100 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-emerald-700">Crop Type</p>
          <h3 className="mt-1 text-xl font-bold text-primary">{farm.cropType || 'Unknown crop'}</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {farm.size ?? 0} ha
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-700">
        <p>
          <span className="font-semibold">Location:</span> {farm.location || 'N/A'}
        </p>
        <p>
          <span className="font-semibold">Coordinates:</span> {farm.latitude}, {farm.longitude}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onGetInsight(farm)}
        className="mt-5 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Get Weather Insight
      </button>
    </article>
  )
}
