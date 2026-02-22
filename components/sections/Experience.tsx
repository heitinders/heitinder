"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

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

function DesktopExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const active = EXPERIENCES[activeIndex];

  useLayoutEffect(() => {
    const listEl = listRef.current;
    const itemEl = itemRefs.current[activeIndex];
    if (!listEl || !itemEl) return;

    const listRect = listEl.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    setIndicator({
      top: itemRect.top - listRect.top,
      height: itemRect.height,
    });
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => {
      const listEl = listRef.current;
      const itemEl = itemRefs.current[activeIndex];
      if (!listEl || !itemEl) return;
      const listRect = listEl.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();
      setIndicator({
        top: itemRect.top - listRect.top,
        height: itemRect.height,
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  return (
    <div className="hidden gap-8 lg:grid lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]">
      <div className="relative">
        <div ref={listRef} className="relative">
          <motion.div
            aria-hidden
            className="absolute left-0 rounded-r-xl bg-white/[0.03] shadow-[0_0_24px_rgba(139,92,246,0.10)]"
            animate={{ top: indicator.top, height: indicator.height }}
            transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.25 }}
            style={{ width: "100%" }}
          />

          {EXPERIENCES.map((item, index) => {
            const activeItem = index === activeIndex;
            return (
              <button
                key={item.company}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
               
                className={cn(
                  "relative z-[1] block w-full border-l-2 px-5 py-4 text-left transition-colors",
                  activeItem
                    ? "border-[var(--accent-glow)] bg-white/[0.02]"
                    : "border-[var(--border)]",
                )}
              >
                <div
                  className={cn(
                    "text-base font-semibold",
                    activeItem ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]",
                  )}
                >
                  {item.company}
                </div>
                <div className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                  {item.period}
                </div>
                {activeItem ? (
                  <div className="pointer-events-none absolute left-[-2px] top-0 h-full w-[2px] bg-[var(--accent-glow)] shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-card relative min-h-[520px] overflow-hidden p-7 sm:p-8">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-[var(--accent-glow)] to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.company}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pl-2"
          >
            <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
              {active.company}
            </h3>

            {active.formerlyNote ? (
              <p className="mt-2 text-sm italic text-[var(--text-muted)]">{active.formerlyNote}</p>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-[rgba(109,40,217,0.12)] px-3 py-1 font-mono text-xs text-[var(--accent-glow)]">
                {active.role}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {active.period}
                {active.location ? ` · ${active.location}` : ""}
              </span>
            </div>

            <p className="mt-5 text-[15px] leading-[1.8] text-[var(--text-secondary)]">
              {active.description}
            </p>

            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
            >
              {active.stack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                  }}
                  className="rounded-full border border-[var(--border)] bg-[var(--glass)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 lg:hidden">
      {EXPERIENCES.map((item, index) => {
        const open = openIndex === index;

        return (
          <div key={item.company} className="glass-card overflow-hidden">
            <button
              type="button"
             
              className="w-full px-5 py-4 text-left"
              onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[var(--text-primary)]">{item.company}</p>
                  <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">{item.period}</p>
                </div>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mt-1 text-xl leading-none text-[var(--text-secondary)]"
                >
                  +
                </motion.span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--border)] px-5 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex rounded-full bg-[rgba(109,40,217,0.12)] px-3 py-1 font-mono text-xs text-[var(--accent-glow)]">
                        {item.role}
                      </span>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {item.location || "Location not listed"}
                      </span>
                    </div>
                    {item.formerlyNote ? (
                      <p className="mt-3 text-sm italic text-[var(--text-muted)]">{item.formerlyNote}</p>
                    ) : null}
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border)] bg-[var(--glass)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Experience() {
  const headline = useMemo(() => "Where I've  Shipped.", []);

  return (
    <section id="experience" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          03 / EXPERIENCE
        </p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)]">
          {headline}
        </h2>

        <div className="mt-10">
          <DesktopExperience />
          <MobileAccordion />
        </div>
      </div>
    </section>
  );
}
