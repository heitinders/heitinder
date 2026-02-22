import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <p className="text-3xl font-semibold text-[var(--text-primary)]">{stat.value}</p>
            <p className="mt-1 text-sm text-[var(--text-primary)]/85">{stat.label}</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
