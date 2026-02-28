"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Heitinder doesn't just write code — he thinks in products. He shipped our trade platform ahead of schedule and mentored two junior engineers along the way.",
    name: "Engineering Lead",
    title: "BNY Mellon — Pershing",
    accent: "from-violet-500/20 to-transparent",
  },
  {
    quote:
      "One of the strongest frontend engineers I've worked with. He architected our React component library and reduced page load times by 40% across the platform.",
    name: "Senior VP, Technology",
    title: "Federal Reserve Bank of NY",
    accent: "from-cyan-500/20 to-transparent",
  },
  {
    quote:
      "Heitinder brought our AI product vision to life in weeks, not months. His ability to integrate LLM APIs into production-grade UIs is rare and invaluable.",
    name: "Co-Founder",
    title: "ScalifAI",
    accent: "from-violet-500/20 to-transparent",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section ref={ref} className="py-[100px]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
        >
          05 / WHAT OTHERS SAY
        </motion.p>

        <motion.h2
          className="mt-4 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0.1}
        >
          Working with <span className="gradient-text">Heitinder</span>.
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className="glass-card relative overflow-hidden p-6 sm:p-8"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0.2 + i * 0.12}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40",
                  t.accent,
                )}
                aria-hidden
              />
              <div className="relative z-[1]">
                <svg
                  className="mb-4 h-6 w-6 text-[var(--accent-glow)] opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)]">
                  {t.quote}
                </p>
                <div className="mt-5 border-t border-[var(--border)] pt-4">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{t.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-[var(--text-muted)]">{t.title}</p>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
