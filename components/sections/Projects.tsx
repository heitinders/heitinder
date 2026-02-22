"use client";

import { motion, useReducedMotion } from "framer-motion";

import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
            02 / SELECTED WORK
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
            Products I&apos;ve{" "}
            <span className="gradient-text">Built &amp; Shipped</span>.
          </h2>
        </div>

        <div className="space-y-8 sm:space-y-10">
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
