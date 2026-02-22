import { EXPERIENCE } from "@/lib/constants";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.22em] text-[var(--accent-secondary)] uppercase">
            Career Journey
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Professional Experience
          </h2>
        </div>
        <div className="space-y-4">
          {EXPERIENCE.map((item) => (
            <article key={`${item.company}-${item.period}`} className="glass-card p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {item.company}
                  </h3>
                  <p className="text-sm text-[var(--accent-glow)]">{item.role}</p>
                </div>
                <div className="text-xs text-[var(--text-secondary)] sm:text-right">
                  <p>{item.period}</p>
                  <p>{item.location}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span key={tech} className="rounded-lg bg-white/[0.03] px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/8">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
