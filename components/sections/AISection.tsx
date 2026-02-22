"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const tools = [
  "OpenAI API",
  "Anthropic Claude",
  "Cursor IDE",
  "LangChain",
  "Prompt Engineering",
  "Vector Databases",
  "AI SaaS Architecture",
  "LLM Integration",
  "RAG Pipelines",
  "Lovable",
  "v0 by Vercel",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function NeuralVisual() {
  return (
    <div className="relative h-full min-h-[280px] w-full [perspective:1000px]">
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_25%_20%,rgba(109,40,217,0.18),transparent_52%),radial-gradient(circle_at_80%_25%,rgba(34,211,238,0.14),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />

      <motion.div
        className="absolute inset-[10%] rounded-2xl border border-white/10 bg-white/[0.015] shadow-[0_20px_60px_rgba(4,4,10,0.35)]"
        animate={{ rotateX: [-4, 2, -4], rotateY: [8, -6, 8], y: [-6, 4, -6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 420 280" className="h-full w-full">
          <defs>
            <linearGradient id="lineG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {[
            [70, 80, 170, 60],
            [170, 60, 265, 105],
            [70, 80, 150, 170],
            [150, 170, 245, 185],
            [245, 185, 340, 135],
            [265, 105, 340, 135],
            [170, 60, 150, 170],
            [265, 105, 245, 185],
          ].map((line, i) => (
            <g key={i}>
              <motion.line
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="url(#lineG)"
                strokeWidth="1.2"
                strokeDasharray="6 8"
                opacity="0.7"
                animate={{ strokeDashoffset: [0, -28] }}
                transition={{ duration: 2.4 + i * 0.15, repeat: Infinity, ease: "linear" }}
              />
            </g>
          ))}

          {[
            { x: 70, y: 80, label: "Prompt" },
            { x: 170, y: 60, label: "LLM" },
            { x: 265, y: 105, label: "RAG" },
            { x: 150, y: 170, label: "Ops" },
            { x: 245, y: 185, label: "Eval" },
            { x: 340, y: 135, label: "UI" },
          ].map((node, i) => (
            <g key={node.label} filter="url(#glow)">
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={i % 2 === 0 ? "#8b5cf6" : "#22d3ee"}
                animate={{ r: [5.5, 7.5, 5.5], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <text
                x={node.x + 12}
                y={node.y + 4}
                fill="rgba(241,245,249,0.75)"
                fontSize="10"
                fontFamily="var(--font-jetbrains-mono), monospace"
                letterSpacing="0.08em"
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[14%] h-28 w-28 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
        animate={{ y: [-8, 6, -8], rotate: [-3, 2, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[8%] h-20 w-36 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
        animate={{ y: [6, -6, 6], rotate: [2, -2, 2] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function AISection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section id="ai" ref={ref} className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          04 / AI × ENGINEERING
        </p>

        <div className="ai-border-wrap relative mt-8 rounded-[24px] p-px">
          <div className="ai-drift absolute inset-0 -z-10 rounded-[24px]" aria-hidden />

          <div className="relative overflow-hidden rounded-[23px] bg-[var(--bg-surface)] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
              <div>
                <motion.p
                  className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent-secondary)] uppercase"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={0}
                >
                  AI × Engineering
                </motion.p>

                <motion.div
                  className="mt-4"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
                  }}
                >
                  <motion.h2
                    variants={fadeUp}
                    className="text-[clamp(2.1rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]"
                  >
                    I build
                  </motion.h2>
                  <motion.h2
                    variants={fadeUp}
                    className="gradient-text text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.04em] italic font-bold"
                  >
                    with AI.
                  </motion.h2>
                  <motion.h3
                    variants={fadeUp}
                    className="mt-1 text-[clamp(1.1rem,2vw,1.4rem)] font-normal text-[var(--text-secondary)]"
                  >
                    Not just using it.
                  </motion.h3>
                </motion.div>

                <div className="mt-8 space-y-5">
                  {[
                    "Most developers use AI as an autocomplete tool. I go further — I architect products where AI IS the core feature. GovCon Finds uses LLM pipelines to analyze federal contract data and surface bid opportunities. I've integrated OpenAI and Anthropic APIs into production systems, engineered prompts that drive real business outcomes, and built automation workflows that replace hours of manual work.",
                    "In my daily engineering workflow: Cursor AI for velocity, Claude for architecture decisions, custom GPTs for client deliverables. AI isn't my crutch — it's my multiplier.",
                  ].map((copy, i) => (
                    <motion.p
                      key={i}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      variants={fadeUp}
                      custom={0.35 + i * 0.12}
                      className="text-[15px] leading-[1.8] text-[var(--text-secondary)]"
                    >
                      {copy}
                    </motion.p>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } }
                    : { opacity: 0, y: 18 }
                }
                className="relative"
              >
                <NeuralVisual />
              </motion.div>
            </div>

            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-2.5"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { delayChildren: 0.45, staggerChildren: 0.045 } },
              }}
            >
              {tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  variants={{
                    hidden: { opacity: 0, scale: 0.92, y: 8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className={cn(
                    "inline-flex rounded-full border px-3 py-2 font-mono text-xs transition hover:scale-[1.05] hover:border-[var(--accent-glow)]",
                    index % 2 === 0
                      ? "border-violet-400/20 bg-violet-500/5 text-violet-200/90"
                      : "border-cyan-400/20 bg-cyan-500/5 text-cyan-200/90",
                  )}
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .ai-border-wrap {
          --angle: 0deg;
          background: conic-gradient(
            from var(--angle),
            #6d28d9,
            #22d3ee,
            #6d28d9
          );
          animation: spinAngle 8s linear infinite;
        }

        .ai-drift {
          background:
            radial-gradient(circle at 20% 35%, rgba(109, 40, 217, 0.12), transparent 45%),
            radial-gradient(circle at 78% 60%, rgba(109, 40, 217, 0.08), transparent 40%);
          filter: blur(18px);
          animation: driftBlob 14s ease-in-out infinite;
        }

        @keyframes spinAngle {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }

        @keyframes driftBlob {
          0%,
          100% {
            transform: translate3d(-1%, 0%, 0) scale(1);
          }
          50% {
            transform: translate3d(1.5%, -2%, 0) scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}
