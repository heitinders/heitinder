"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MidPageCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-36">
      <motion.div
        className="mx-auto max-w-3xl px-6 text-center"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-[700] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]">
          Need a senior engineer who{" "}
          <span className="gradient-text">ships</span>?
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-secondary)]">
          Open to contracts, AI product collaborations, and technical
          advisory. Based in NYC/NJ, available globally.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-[var(--accent-glow)] px-8 py-4 text-sm font-semibold text-[var(--bg-base)]"
          >
            Let&apos;s Talk
          </a>
          <a
            href="mailto:heitinder.js@gmail.com"
            className="rounded-full border border-[var(--border)] px-6 py-3.5 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent-glow)]"
          >
            heitinder.js@gmail.com
          </a>
        </div>
      </motion.div>
    </section>
  );
}
