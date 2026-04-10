"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  stack: string[];
  formerlyNote?: string;
};

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Federal Reserve Bank of New York",
    role: "Front End Developer",
    period: "Dec 2024–Present",
    location: "New York, NY",
    description:
      "Building Next.js + React components on AWS infrastructure. Modernized legacy TypeScript codebase from v3.9 to v5.5. Resolved 8+ production incidents via Splunk log analysis. Streamlined CI/CD with Jenkins automation and semantic commit validation.",
    stack: ["Next.js", "React", "AWS", "TypeScript", "Jenkins", "GraphQL", "Jest", "React Native"],
  },
  {
    company: "BNY",
    role: "Front End Developer",
    period: "Jun 2020–Dec 2024",
    location: "Jersey City NJ / NYC Hybrid",
    formerlyNote: "(Previously Bank of New York Mellon)",
    description:
      "(Previously Bank of New York Mellon) — 4.5 years launching a new Trade Platform with React + TypeScript. Mentored junior developers through their onboarding journey. Reduced API response latency by 15–20% through request optimization and caching strategies. Cut code duplication by 40% with reusable React Native Reanimated components.",
    stack: ["React", "TypeScript", "Next.js", "Redux", "Node.js", "Jest", "Bloomreach CMS", "Bitbucket"],
  },
  {
    company: "Verizon",
    role: "React Developer",
    period: "Jan 2020–May 2020",
    location: "Piscataway, NJ",
    description:
      "Built responsive React + Redux Saga architecture for Verizon's main consumer portal. Implemented D3.js and Highcharts data visualizations for a dashboard POC. Led production performance optimization reducing page load times significantly.",
    stack: ["React", "Redux Saga", "D3.js", "TypeScript", "Highcharts", "Webpack"],
  },
  {
    company: "Morgan Stanley",
    role: "Angular Developer",
    period: "Jul 2019–Dec 2019",
    location: "New York, NY",
    description:
      "Developed Angular 7 state management workflows with NGRX for financial wire systems. Implemented ag-Grid for large dataset rendering with async scroll. Built reactive forms, Karma/Jasmine test suites, and participated in code reviews as a senior team member.",
    stack: ["Angular", "NGRX", "ag-Grid", "RxJS", "TypeScript", "Angular Material"],
  },
  {
    company: "Pro-Tek Consulting / Ameriprise Financial",
    role: "JS UI Developer",
    period: "Mar 2015–Jul 2019",
    location: "",
    description:
      "4 years across multiple enterprise clients building Angular and React SPAs. Implemented hybrid mobile applications via Ionic/Cordova for iOS and Android. Built JWT authentication flows, reusable directive libraries, and mentored offshore development teams.",
    stack: ["Angular", "React", "Redux", "Ionic", "Cordova", "SASS", "Jasmine"],
  },
  {
    company: "T-Mobile",
    role: "Front End Developer",
    period: "Apr 2013–Feb 2015",
    location: "Seattle, WA",
    description:
      "Led on-shore/off-shore team coordination as team lead. Built AngularJS responsive interfaces with D3.js + SVG data visualizations. Implemented media-query-driven responsive design systems and jQuery plugin integrations.",
    stack: ["AngularJS", "D3.js", "SASS", "Bootstrap", "jQuery", "HTML5", "CSS3"],
  },
];

function ExperienceEntry({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={!isLast ? "border-b border-[var(--border)]" : ""}>
      <button
        type="button"
        className="w-full py-8 text-left flex items-start justify-between gap-4"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-mono font-medium leading-[1.4] tracking-[0.04em] text-[var(--text-muted)]">
            {item.period}
            {item.location ? ` · ${item.location}` : ""}
          </p>
          <h3 className="mt-2 text-[clamp(1.1rem,2vw,1.5rem)] font-[600] leading-[1.2] tracking-[-0.01em] text-[var(--text-primary)]">
            {item.company}
          </h3>
          <p className="mt-1 text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-secondary)]">
            {item.role}
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-2 text-xl leading-none text-[var(--text-secondary)] shrink-0"
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8">
              {item.formerlyNote ? (
                <p className="text-[13px] italic text-[var(--text-muted)] mb-3">{item.formerlyNote}</p>
              ) : null}
              <p className="text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-secondary)]">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {item.stack.map((tech, i) => (
                  <span
                    key={tech}
                    className="text-[13px] font-mono font-medium leading-[1.4] tracking-[0.04em] text-[var(--text-muted)]"
                  >
                    {tech}
                    {i < item.stack.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-36">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
          03 / EXPERIENCE
        </p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-[700] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]">
          Where I&apos;ve Shipped.
        </h2>

        <div className="mt-10">
          {EXPERIENCES.map((item, index) => (
            <ExperienceEntry
              key={item.company}
              item={item}
              isLast={index === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
