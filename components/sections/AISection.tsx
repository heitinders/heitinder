"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export default function AISection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section id="ai" ref={ref} className="py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
          04 / AI × ENGINEERING
        </p>

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
            className="text-[clamp(2rem,5vw,3.5rem)] font-[700] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]"
          >
            I build{" "}
            <span className="gradient-text italic">with AI.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-2 max-w-2xl text-[clamp(1.1rem,2vw,1.5rem)] font-[600] leading-[1.2] tracking-[-0.01em] text-[var(--text-secondary)]"
          >
            Not just using it.
          </motion.p>
        </motion.div>

        <div className="mt-10 max-w-2xl space-y-5">
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
              className="text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-secondary)]"
            >
              {copy}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 0.45, staggerChildren: 0.045 } },
          }}
        >
          {tools.map((tool) => (
            <motion.span
              key={tool}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="border-t border-[var(--border)] pt-4 text-[13px] font-mono font-medium leading-[1.4] tracking-[0.04em] text-[var(--text-secondary)]"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
