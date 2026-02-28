"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MidPageCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="py-16">
      <motion.div
        className="mx-auto max-w-3xl px-6 text-center"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card relative overflow-hidden rounded-2xl px-8 py-12 sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10"
            aria-hidden
          />
          <div className="relative z-[1]">
            <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
              Need a senior engineer who{" "}
              <span className="gradient-text">ships</span>?
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Open to contracts, AI product collaborations, and technical
              advisory. Based in NYC/NJ, available globally.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(109,40,217,0.3)]"
              >
                Let&apos;s Talk <span aria-hidden>→</span>
              </a>
              <a
                href="mailto:heitinder.js@gmail.com"
                className="rounded-full border border-[var(--border)] px-6 py-3.5 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent-glow)]"
              >
                heitinder.js@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
