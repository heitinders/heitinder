import { ArrowUpRight } from "lucide-react";

import { PROJECTS } from "@/lib/constants";

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.22em] text-[var(--accent-secondary)] uppercase">
            Selected Work
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Featured Projects
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
             
              className="group glass-card block overflow-hidden p-0"
            >
              <div
                className="h-28 border-b border-white/5"
                style={{
                  background: `linear-gradient(135deg, ${project.accentFrom}, ${project.accentTo})`,
                  opacity: 0.65,
                }}
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">
                      {project.title}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">{project.role}</p>
                  </div>
                  <ArrowUpRight className="text-white/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" size={18} />
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
