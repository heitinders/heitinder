# heitindersingh.dev

Personal portfolio for **Heitinder Singh** — Senior Frontend Engineer with 12+ years of experience building enterprise-grade applications and SaaS products.

**Live →** [heitindersingh.dev](https://heitindersingh.dev)

---

## Overview

A single-page portfolio built with Next.js 16, featuring real-time 3D graphics, physics-based animations, and smooth scroll interactions. Designed to reflect the same engineering standards applied to enterprise work at the Federal Reserve Bank of NY, BNY Mellon, Morgan Stanley, Verizon, and T-Mobile.

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript 5 |
| **3D & WebGL** | Three.js, React Three Fiber, React Three Drei |
| **Animation** | Framer Motion, GSAP, Lenis (smooth scroll) |
| **Styling** | Tailwind CSS 4, CSS custom properties, clsx + tailwind-merge |
| **UI** | Radix UI, Lucide icons |
| **Infrastructure** | Cloudflare Workers, OpenNext adapter, Wrangler |

## Architecture

```
app/
├── layout.tsx              # Root layout, metadata, fonts, providers
├── page.tsx                # Single-page composition
└── sitemap.ts              # Dynamic sitemap generation

components/
├── canvas/                 # Three.js scenes (breathing icosahedron w/ custom shaders)
├── sections/               # Page sections — Hero, About, Experience, Projects, Skills, Contact
├── shared/                 # Navbar, Footer, Preloader, SmoothScrollProvider
└── ui/                     # Reusable primitives — ProjectCard, BentoCard, RevealOnScroll

lib/
├── constants.ts            # Structured data — projects, experience, skills, stats
├── animations.ts           # Framer Motion variant presets
└── utils.ts                # cn() utility

styles/
├── globals.css             # Global styles, keyframe animations
└── tokens.css              # Design tokens — colors, spacing, radii, filters
```

## Sections

| Section | Description |
|---|---|
| **Hero** | 3D animated icosahedron (custom vertex shaders), magnetic CTA button, parallax trust badges |
| **Marquee** | Infinite bi-directional scrolling tech stack display |
| **About** | Narrative bio with animated confidence bars and gradient portrait card |
| **Stats** | Animated counters — 12+ years, 5 enterprise clients, 40+ projects, 4 SaaS products |
| **Experience** | Tabbed timeline (desktop) / accordion (mobile) across 6 roles |
| **Projects** | Showcase of 4 SaaS products — Glisco Lab, EcomHands, GovCon Finds, ScaliFai |
| **AI × Engineering** | AI integration philosophy with animated SVG neural network diagram |
| **Skills** | Bento grid across frontend, backend, AI, testing, data viz, and leadership |
| **Contact** | Magnetic CTA, direct contact methods, social links |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

This project deploys to **Cloudflare Workers** via the OpenNext adapter.

```bash
# Authenticate with Cloudflare (one-time)
npx wrangler login

# Build and deploy
npm run deploy

# Preview locally before deploying
npm run preview
```

### Custom Domain

After deploying, add your domain in the Cloudflare dashboard:
**Workers & Pages → heitinder-portfolio → Settings → Domains & Routes → Add Custom Domain**

## Performance

- **Dynamic imports** — Three.js canvas loaded client-side only, no SSR overhead
- **Font optimization** — Inter + JetBrains Mono via `next/font` with `display: swap`
- **Package tree-shaking** — Optimized imports for Framer Motion, Lucide, GSAP
- **GPU acceleration** — `will-change: transform` and `translateZ(0)` on animated elements
- **Canvas tuning** — DPR clamped to [1, 1.5], antialias disabled, high-performance power preference

## SEO & Accessibility

- Full Open Graph and Twitter Card metadata with custom OG image
- XML sitemap generation at `/sitemap.xml`
- `robots.txt` for crawler directives
- Semantic HTML with ARIA attributes throughout
- Reduced motion detection — animations respect `prefers-reduced-motion`
- Keyboard navigation and focus-visible styles
- Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |
| `npm run preview` | Build and preview on Cloudflare locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |

## License

Private. All rights reserved.
