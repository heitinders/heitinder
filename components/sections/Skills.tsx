"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart2,
  CheckCircle,
  Cloud,
  Monitor,
  Sparkles,
  Users,
} from "lucide-react";

import BentoCard from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";

type PillCloudProps = {
  items: string[];
  accentColor: string;
};

function PillCloud({ items, accentColor }: PillCloudProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      style={{ ["--pill-accent" as string]: accentColor } as React.CSSProperties}
    >
      {items.map((item) => (
        <span key={item} className="skills-pill font-mono text-[11px] tracking-[0.04em]">
          {item}
        </span>
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          05 / SKILLS
        </p>

        <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)]">
          The <span className="gradient-text">Full Stack</span>.
        </h2>

        <motion.div
          layout={false}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView={prefersReducedMotion ? "visible" : "visible"}
          viewport={{ once: true, amount: 0.15 }}
        >
          <BentoCard
            title="Frontend Mastery"
            icon={Monitor}
            accentColor="var(--accent-primary)"
            className="md:col-span-2"
            variants={cardVariants}
            custom={0}
          >
            <PillCloud
              accentColor="var(--accent-primary)"
              items={[
                "React",
                "Next.js",
                "Angular",
                "TypeScript",
                "Redux",
                "RxJS",
                "Tailwind CSS",
                "SCSS/SASS",
                "Material UI",
                "Bootstrap",
                "Framer Motion",
                "Three.js",
              ]}
            />
          </BentoCard>

          <BentoCard
            title="Backend & Cloud"
            icon={Cloud}
            accentColor="var(--accent-secondary)"
            variants={cardVariants}
            custom={1}
          >
            <PillCloud
              accentColor="var(--accent-secondary)"
              items={[
                "Node.js",
                "Express",
                "GraphQL",
                "AWS Lambda",
                "S3",
                "CloudFront",
                "Docker",
                "Jenkins",
                "MongoDB",
                "PostgreSQL",
                "REST APIs",
              ]}
            />
          </BentoCard>

          <BentoCard
            title="AI & Emerging"
            icon={Sparkles}
            accentColor="#f59e0b"
            variants={cardVariants}
            custom={2}
          >
            <PillCloud
              accentColor="#f59e0b"
              items={[
                "OpenAI API",
                "Claude API",
                "LLMs",
                "Prompt Eng.",
                "Vector DBs",
                "RAG",
                "Automation",
                "Cursor IDE",
              ]}
            />
          </BentoCard>

          <BentoCard
            title="Testing & Quality"
            icon={CheckCircle}
            accentColor="#10b981"
            variants={cardVariants}
            custom={3}
          >
            <PillCloud
              accentColor="#10b981"
              items={[
                "Jest",
                "Cypress",
                "Mocha",
                "Chai",
                "Karma",
                "Jasmine",
                "E2E",
                "TDD",
                "Unit Testing",
              ]}
            />
          </BentoCard>

          <BentoCard
            title="Data Visualization"
            icon={BarChart2}
            accentColor="#f43f5e"
            variants={cardVariants}
            custom={4}
          >
            <PillCloud
              accentColor="#f43f5e"
              items={["D3.js", "ag-Grid", "Highcharts", "Canvas", "SVG", "WebGL", "C3.js"]}
            />
          </BentoCard>

          <BentoCard
            title="Leadership & Collaboration"
            icon={Users}
            accentColor="var(--accent-primary)"
            className="relative min-h-[230px] md:col-span-2 lg:col-span-3"
            variants={cardVariants}
            custom={5}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <div className="absolute -right-8 top-6 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.24),transparent_70%)] blur-2xl" />
              <div className="absolute left-1/3 top-10 h-20 w-48 -rotate-6 rounded-2xl border border-white/8 bg-white/[0.02]" />
              <div className="absolute right-1/4 bottom-8 h-14 w-36 rotate-6 rounded-2xl border border-white/8 bg-white/[0.02]" />
              <div className="absolute inset-x-6 bottom-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative grid gap-5 lg:grid-cols-[1.05fr_1.95fr] lg:items-end">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[1.55rem]">
                  I&apos;ve mentored, led, and shipped.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Team Mentorship",
                  "Code Review",
                  "Agile/Scrum",
                  "Sprint Planning",
                  "Technical Architecture",
                  "Offshore Team Lead",
                  "Cross-functional Collaboration",
                  "Client Communication",
                  "Jira",
                  "Confluence",
                ].map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "skills-pill font-mono text-[11px] tracking-[0.04em]",
                      "bg-white/[0.03]",
                    )}
                    style={{ ["--pill-accent" as string]: "var(--accent-primary)" } as React.CSSProperties}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>
        </motion.div>
      </div>

      <style jsx>{`
        .skills-pill {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          border-radius: 999px;
          padding: 0.35rem 0.65rem;
          transition:
            background-color 160ms ease,
            border-color 160ms ease,
            color 160ms ease,
            transform 160ms ease;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .skills-pill:hover {
          color: var(--text-primary);
          border-color: var(--pill-accent);
          background: color-mix(in srgb, var(--pill-accent) 15%, rgba(255, 255, 255, 0.04));
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
