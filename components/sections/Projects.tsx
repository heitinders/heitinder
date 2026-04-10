"use client";

import { motion, useReducedMotion } from "framer-motion";

import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" className="py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
            02 / SELECTED WORK
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-[700] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]">
            Products I&apos;ve{" "}
            <span className="gradient-text">Built &amp; Shipped</span>.
          </h2>
        </div>

        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {PROJECTS.map((project, index) => (
            <motion.div
              layout={false}
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard {...project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
