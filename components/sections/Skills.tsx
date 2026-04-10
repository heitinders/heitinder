"use client";

import { motion, useReducedMotion } from "framer-motion";

const categories = [
  {
    title: "Frontend Mastery",
    items: [
      "React", "Next.js", "Angular", "TypeScript", "Redux", "RxJS",
      "Tailwind CSS", "SCSS/SASS", "Material UI", "Bootstrap",
      "Framer Motion", "Three.js",
    ],
  },
  {
    title: "Backend & Cloud",
    items: [
      "Node.js", "Express", "GraphQL", "AWS Lambda", "S3",
      "CloudFront", "Docker", "Jenkins", "MongoDB", "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    title: "AI & Emerging",
    items: [
      "OpenAI API", "Claude API", "LLMs", "Prompt Eng.",
      "Vector DBs", "RAG", "Automation", "Cursor IDE",
    ],
  },
  {
    title: "Testing & Quality",
    items: [
      "Jest", "Cypress", "Mocha", "Chai", "Karma", "Jasmine",
      "E2E", "TDD", "Unit Testing",
    ],
  },
  {
    title: "Data Visualization",
    items: ["D3.js", "ag-Grid", "Highcharts", "Canvas", "SVG", "WebGL", "C3.js"],
  },
  {
    title: "Leadership & Collaboration",
    items: [
      "Team Mentorship", "Code Review", "Agile/Scrum", "Sprint Planning",
      "Technical Architecture", "Offshore Team Lead",
      "Cross-functional Collaboration", "Client Communication",
      "Jira", "Confluence",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-[13px] font-mono font-medium uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
          05 / SKILLS
        </p>

        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-[700] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]">
          The <span className="gradient-text">Full Stack</span>.
        </h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView={prefersReducedMotion ? "visible" : "visible"}
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={itemVariants}>
              <h3 className="text-[15px] font-[600] text-[var(--text-primary)] mb-3">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-[13px] font-mono text-[var(--text-muted)] border border-[var(--border)] rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
