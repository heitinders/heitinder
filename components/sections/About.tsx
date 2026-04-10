"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const headlineLines = [
  { text: "12 years.", gradient: false, italic: false, weight: "font-[700]" },
  { text: "5 banks.", gradient: false, italic: false, weight: "font-[700]" },
  { text: "4 SaaS products.", gradient: false, italic: false, weight: "font-[700]" },
  { text: "One obsession.", gradient: true, italic: true, weight: "font-[600]" },
];

const miniStats = [
  { label: "Based in", value: "NYC / NJ Area" },
  { label: "Languages", value: "JavaScript · TypeScript · Python" },
  { label: "Focus", value: "React · Angular · AI Integration" },
];

const confidenceBars = [
  { label: "React / Next.js", value: 98 },
  { label: "Angular", value: 90 },
  { label: "Node.js / Cloud", value: 80 },
  { label: "AI Integration", value: 75 },
  { label: "Leadership", value: 82 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section id="about" ref={ref} className="py-20 sm:py-28 lg:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <motion.p
          className="text-[13px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
        >
          01 / ABOUT
        </motion.p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
          {/* Left column — visual card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={
              inView
                ? { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.35 } }
                : { opacity: 0, y: 24 }
            }
            className="space-y-8"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="absolute right-3 top-3 rounded-full border border-[var(--border)] bg-[var(--bg-base)]/70 px-3 py-1">
                <span className="text-[13px] font-mono font-medium leading-[1.4] tracking-[0.04em] text-[var(--text-primary)]/85">
                  Senior Engineer · 12+ yrs
                </span>
              </div>

              <div className="absolute inset-0 grid place-items-center px-4">
                <div className="relative w-full max-w-[90%] text-center">
                  <span className="relative block bg-gradient-to-r from-[var(--accent-glow)] to-[var(--accent-secondary)] bg-clip-text font-mono text-4xl font-semibold leading-tight text-transparent sm:text-5xl lg:text-6xl">
                    Heitinder Singh
                  </span>
                </div>
              </div>
            </div>

            {/* Skills as plain text list */}
            <div className="space-y-3">
              {confidenceBars.map((bar) => (
                <div key={bar.label} className="flex items-center justify-between">
                  <span className="text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-primary)]/90">{bar.label}</span>
                  <span className="text-[13px] font-mono font-medium leading-[1.4] tracking-[0.04em] text-[var(--text-muted)]">
                    {bar.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — bio text */}
          <div>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {headlineLines.map((line) => (
                <motion.h2
                  key={line.text}
                  variants={fadeUp}
                  className={cn(
                    "text-[clamp(2rem,5vw,3.5rem)] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]",
                    line.weight,
                    line.italic && "italic",
                    line.gradient && "gradient-text",
                  )}
                >
                  {line.text}
                </motion.h2>
              ))}
            </motion.div>

            <div className="mt-10 space-y-6">
              {[
                "I'm a NYC/NJ-based Senior Frontend Engineer who has spent over a decade building mission-critical financial platforms for institutions like the Federal Reserve Bank of New York, BNY Mellon, Morgan Stanley, and Verizon.",
                "I don't just write code — I architect experiences. I obsess over the 0.1 seconds that separates a good UI from a great one. I've mentored junior engineers, led offshore teams, and shipped products used by thousands of professionals every day. Outside client work, I run Glisco Lab and build AI-powered SaaS products that solve real problems.",
              ].map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  className="text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-secondary)]"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={0.6 + index * 0.2}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-10 h-px w-full bg-[var(--border)]" />

            <motion.div
              className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { delayChildren: 1.1, staggerChildren: 0.08 } },
              }}
            >
              {miniStats.map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="space-y-1">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    {item.label}
                  </p>
                  <p className="text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-primary)]/90">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
