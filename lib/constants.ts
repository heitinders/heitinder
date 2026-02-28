export type Project = {
  id: string;
  title: string;
  url: string;
  description: string;
  role: string;
  tags: string[];
  accentFrom: string;
  accentTo: string;
  image: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  stack: string[];
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const PROJECTS: Project[] = [
  {
    id: "glisco-lab",
    title: "Glisco Lab",
    url: "https://gliscolab.com",
    description:
      "Full-service digital marketing agency delivering SEO, paid ads, social strategy, and web development. Grew client organic traffic by 3x in 6 months across multiple accounts.",
    role: "Founder & Lead Developer",
    tags: ["Agency", "Web Design", "SEO", "Paid Advertising"],
    accentFrom: "#7c3aed",
    accentTo: "#ec4899",
    image: "/gliscolab.png",
  },
  {
    id: "ecomhands",
    title: "EcomHands",
    url: "https://ecomhands.com",
    description:
      "Hands-on e-commerce growth platform. Product optimization, conversion strategies, and managed services that helped merchants increase average order value by 28%.",
    role: "Product Builder",
    tags: ["E-Commerce", "Growth", "Optimization", "React"],
    accentFrom: "#0891b2",
    accentTo: "#6366f1",
    image: "/ecomhands.png",
  },
  {
    id: "govcon-finds",
    title: "GovCon Finds",
    url: "https://govconfinds.com",
    description:
      "AI-powered federal contract discovery for small businesses. Surfaces SAM.gov opportunities, analyzes set-aside eligibility, and generates AI bid insights. Processing 1,000+ contracts daily with LLM pipelines.",
    role: "Founder · Full-Stack · AI Integration",
    tags: ["AI", "GovTech", "SaaS", "Next.js", "OpenAI"],
    accentFrom: "#059669",
    accentTo: "#0891b2",
    image: "/govconfinds.png",
  },
  {
    id: "scalifai",
    title: "ScalifAI",
    url: "https://www.scalifai.app",
    description:
      "AI-powered business automation platform. AI assistants that answer calls, emails, and optimize digital marketing — replacing 10+ hours of manual work per week per client.",
    role: "Product Architect",
    tags: ["AI", "SaaS", "Automation", "TypeScript", "React"],
    accentFrom: "#6d28d9",
    accentTo: "#4f46e5",
    image: "/scalifai.png",
  },
  {
    id: "seo-ops-hub",
    title: "SEO Ops Hub",
    url: "https://seo-ops-hub.com",
    description:
      "Complete SEO operations platform. Onboard clients, run technical audits, generate content briefs, and ship deliverables — cutting audit turnaround from days to under 30 minutes.",
    role: "Founder & Full-Stack Developer",
    tags: ["AI", "SaaS", "SEO", "Next.js", "Automation"],
    accentFrom: "#14b8a6",
    accentTo: "#3b82f6",
    image: "/seo-ops-hub.png",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Federal Reserve Bank of New York",
    role: "Frontend Developer",
    period: "Dec 2024 – Present",
    location: "New York, NY",
    description:
      "Building Next.js and React components on AWS, modernizing a legacy TypeScript codebase, resolving production incidents, and improving CI/CD workflows.",
    stack: ["Next.js", "React", "TypeScript", "AWS", "Jenkins", "CI/CD"],
  },
  {
    company: "BNY Mellon",
    role: "Frontend Developer",
    period: "Jun 2020 – Dec 2024",
    location: "New York, NY",
    description:
      "Launched a trade platform with React and TypeScript, mentored junior engineers, integrated tax products, and optimized APIs to reduce latency.",
    stack: ["React", "TypeScript", "Redux", "REST APIs", "Enterprise UI"],
  },
  {
    company: "Verizon",
    role: "React Developer",
    period: "Jan 2020 – May 2020",
    location: "Basking Ridge, NJ",
    description:
      "Built responsive React interfaces with Redux Saga, created D3.js visualizations, and contributed to production performance improvements.",
    stack: ["React", "Redux Saga", "D3.js", "JavaScript", "Responsive UI"],
  },
  {
    company: "Morgan Stanley",
    role: "Angular Developer",
    period: "Jul 2019 – Dec 2019",
    location: "New York, NY",
    description:
      "Developed Angular 7 workflows using NGRX, ag-Grid data interfaces, and reactive forms for financial operations.",
    stack: ["Angular", "NGRX", "ag-Grid", "RxJS", "TypeScript"],
  },
  {
    company: "Pro-Tek / Ameriprise Financial",
    role: "JavaScript UI Developer",
    period: "Mar 2015 – Jul 2019",
    location: "Minneapolis, MN",
    description:
      "Delivered Angular and React SPAs across enterprise clients, including hybrid mobile implementations using Ionic and Cordova.",
    stack: ["Angular", "React", "Ionic", "Cordova", "JavaScript"],
  },
  {
    company: "T-Mobile",
    role: "Frontend Developer",
    period: "Apr 2013 – Feb 2015",
    location: "Bellevue, WA",
    description:
      "Built AngularJS responsive interfaces, coordinated offshore execution, and implemented SVG/D3 data visualizations.",
    stack: ["AngularJS", "D3.js", "SVG", "HTML/CSS", "Team Coordination"],
  },
];

export const STATS = [
  {
    value: "12+",
    label: "Years Experience",
    description: "Enterprise and product-focused frontend engineering across finance and SaaS.",
  },
  {
    value: "5",
    label: "Enterprise Clients",
    description: "Federal Reserve, BNY Mellon, Morgan Stanley, Verizon, and T-Mobile.",
  },
  {
    value: "40+",
    label: "Projects Shipped",
    description: "Production launches spanning internal platforms, marketing sites, and SaaS apps.",
  },
  {
    value: "5",
    label: "SaaS Products Built",
    description: "AI-enabled and workflow-centric products from concept to polished interfaces.",
  },
] as const;

export const SKILLS = {
  frontend: [
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "Redux",
    "RxJS",
    "Framer Motion",
    "Tailwind CSS",
    "SCSS/SASS",
    "shadcn/ui",
    "Material UI",
  ],
  backendCloud: [
    "Node.js",
    "Express",
    "GraphQL",
    "REST APIs",
    "AWS Lambda",
    "S3 / CloudFront",
    "Docker",
    "Jenkins",
    "CI/CD",
    "MongoDB",
    "PostgreSQL",
  ],
  aiEmerging: [
    "OpenAI API",
    "Claude API",
    "LLM Prompt Engineering",
    "AI Product Building",
    "Cursor AI",
    "Vector Databases",
    "Automation Workflows",
    "Lovable / v0",
  ],
  leadership: [
    "Team Mentorship",
    "Code Reviews",
    "Agile/Scrum",
    "Sprint Planning",
    "Technical Architecture",
    "Cross-functional Collaboration",
    "Client Communication",
  ],
} as const;
