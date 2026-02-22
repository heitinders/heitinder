import { ArrowDownRight, Download } from "lucide-react";

import { HeroCanvas } from "@/components/canvas/hero-canvas";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(109,40,217,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.14),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(245,158,11,0.10),transparent_35%)]" />
      <HeroCanvas />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[var(--bg-base)]/20 to-[var(--bg-base)]" />

      <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 font-mono text-xs tracking-[0.22em] text-[var(--accent-secondary)] uppercase">
            Senior Frontend Engineer · AI Product Builder
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            Heitinder Singh
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            Building high-performance product experiences for enterprise finance, SaaS,
            and AI-driven workflows with React, Next.js, and design-system rigor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
             
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition",
                "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_10px_30px_rgba(109,40,217,0.25)]",
              )}
            >
              View Work <ArrowDownRight size={16} />
            </a>
            <a
              href="mailto:heitinder.js@gmail.com"
             
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/[0.05]",
              )}
            >
              Contact <Download size={16} />
            </a>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-7">
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent-gold)] uppercase">
            Snapshot
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
            <li>12+ years building enterprise-grade frontend systems</li>
            <li>Current: Frontend Developer at Federal Reserve Bank of New York</li>
            <li>Previous: BNY, Verizon, Morgan Stanley, T-Mobile</li>
            <li>Founder of Glisco Lab (digital growth + web performance)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
