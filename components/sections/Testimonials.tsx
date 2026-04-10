"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Heitinder doesn't just write code — he thinks in products. He shipped our trade platform ahead of schedule and mentored two junior engineers along the way.",
    name: "Engineering Lead",
    title: "BNY Mellon — Pershing",
  },
  {
    quote:
      "One of the strongest frontend engineers I've worked with. He architected our React component library and reduced page load times by 40% across the platform.",
    name: "Senior VP, Technology",
    title: "Federal Reserve Bank of NY",
  },
  {
    quote:
      "Heitinder brought our AI product vision to life in weeks, not months. His ability to integrate LLM APIs into production-grade UIs is rare and invaluable.",
    name: "Co-Founder",
    title: "ScalifAI",
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
    <section ref={ref} className="py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          className="text-[13px] font-mono font-medium uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
        >
          05 / WHAT OTHERS SAY
        </motion.p>

        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-[700] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0.1}
        >
          Working with <span className="gradient-text">Heitinder</span>.
        </motion.h2>

        <div className="mt-16 space-y-0">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className={
                i > 0
                  ? "border-t border-[var(--border)] pt-8 mt-8"
                  : ""
              }
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0.2 + i * 0.12}
            >
              <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] leading-[1.5] text-[var(--text-primary)] italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[15px] text-[var(--text-secondary)] mt-4 not-italic">
                {t.name} &middot; {t.title}
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
