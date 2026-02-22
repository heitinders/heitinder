"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const headlineLines = [
  { text: "12 years.", gradient: false, italic: false, weight: "font-[800]" },
  { text: "5 banks.", gradient: false, italic: false, weight: "font-[800]" },
  { text: "4 SaaS products.", gradient: false, italic: false, weight: "font-[800]" },
  { text: "One obsession.", gradient: true, italic: true, weight: "font-[650]" },
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
    <section id="about" ref={ref} className="min-h-screen py-[120px]">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.p
          className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
        >
          01 / ABOUT
        </motion.p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
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
                    "text-[clamp(3rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]",
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
                  className="max-w-3xl text-[16px] leading-[1.8] text-[var(--text-secondary)]"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={0.6 + index * 0.2}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="mt-10 h-px w-full bg-gradient-to-r from-[var(--accent-primary)]/80 via-[var(--accent-glow)]/30 to-transparent"
              initial={{ opacity: 0, scaleX: 0, transformOrigin: "left center" }}
              animate={
                inView
                  ? { opacity: 1, scaleX: 1, transition: { duration: 0.7, delay: 1.05 } }
                  : { opacity: 0, scaleX: 0 }
              }
            />

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
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--text-muted)] uppercase">
                    {item.label}
                  </p>
                  <p className="text-sm leading-6 text-[var(--text-primary)]/90">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={
              inView
                ? { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.35 } }
                : { opacity: 0, y: 24 }
            }
            className="space-y-8"
          >
            <div className="relative">
              <div className="about-card-ring absolute inset-0 rounded-[26px]" aria-hidden />
              <div className="glass-card relative aspect-[3/4] overflow-hidden rounded-[24px] p-1">
                <div className="about-card-mesh relative h-full w-full rounded-[20px] border border-white/5">
                  <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#04040a]/70 px-3 py-1">
                    <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--text-primary)]/85">
                      Senior Engineer · 12+ yrs
                    </span>
                  </div>

                  <div className="absolute inset-0 grid place-items-center px-4">
                    <div className="relative w-full max-w-[90%] text-center">
                      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.28),transparent_70%)] blur-2xl" />
                      <span className="relative block bg-gradient-to-r from-[#6d28d9] to-[#22d3ee] bg-clip-text font-mono text-4xl font-semibold leading-tight text-transparent sm:text-5xl lg:text-6xl">
                        Heitinder Singh
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="glass-card p-5"
              initial={{ opacity: 0, y: 18 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.7 } }
                  : { opacity: 0, y: 18 }
              }
            >
              <div className="space-y-4">
                {confidenceBars.map((bar, index) => (
                  <div key={bar.label}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-xs text-[var(--text-primary)]/90">{bar.label}</span>
                      <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                        {bar.value}%
                      </span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-[var(--border)]">
                      <motion.div
                        className="h-full rounded-full bg-[var(--accent-primary)]"
                        initial={{ width: 0 }}
                        animate={
                          inView
                            ? {
                                width: `${bar.value}%`,
                                transition: {
                                  duration: 0.8,
                                  delay: 0.85 + index * 0.1,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                              }
                            : { width: 0 }
                        }
                        style={{
                          filter: "drop-shadow(0 0 18px rgba(109, 40, 217, 0.25))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .about-card-ring {
          background: conic-gradient(
            from 0deg,
            rgba(109, 40, 217, 0.9),
            rgba(34, 211, 238, 0.8),
            rgba(109, 40, 217, 0.15),
            rgba(109, 40, 217, 0.9)
          );
          animation: aboutSpin 8s linear infinite;
          filter: saturate(1.05);
          opacity: 0.85;
          padding: 1px;
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .about-card-mesh {
          background:
            radial-gradient(circle at 18% 22%, rgba(109, 40, 217, 0.28), transparent 50%),
            radial-gradient(circle at 78% 28%, rgba(99, 102, 241, 0.22), transparent 48%),
            radial-gradient(circle at 52% 76%, rgba(34, 211, 238, 0.16), transparent 52%),
            linear-gradient(180deg, rgba(13, 13, 26, 0.9), rgba(4, 4, 10, 0.96));
          animation: meshPulse 10s ease-in-out infinite;
        }

        @keyframes aboutSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes meshPulse {
          0%,
          100% {
            transform: scale(1);
            filter: saturate(1) brightness(1);
          }
          50% {
            transform: scale(1.015);
            filter: saturate(1.08) brightness(1.04);
          }
        }
      `}</style>
    </section>
  );
}
