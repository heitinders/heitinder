# CLAUDE.md — Heitinder Singh Portfolio

## Project

Personal portfolio site at heitindersingh.dev. Next.js 16 App Router, Tailwind v4, GSAP + ScrollTrigger, Lenis smooth scroll, Framer Motion, Three.js.

## Design Context

### Users
Hiring managers and engineering leads evaluating senior frontend candidates. They scan in 3 seconds, judge in 10. Secondary: potential SaaS clients who need production-grade UI craft.

### Brand Personality
**Creative, Experimental, Expressive.** The site is a frontend engineering showpiece — the medium IS the message. Confident but not boastful, technical but not sterile. First-person voice, no corporate jargon.

### Aesthetic Direction
Dark, spatial, cinematic. Depth through layering — video atmosphere, floating 3D panels, parallax, particles. Near-black canvas (#04040a) with luminous purple/cyan accents. No light mode.

**Anti-references:** Generic dev portfolios, over-animated showreels, corporate enterprise, brutalist raw.

### Design Principles

1. **The site IS the portfolio** — Every interaction demonstrates frontend craft. If a visitor can't tell a senior engineer built this within 3 seconds, the design has failed.
2. **Purposeful motion, never gratuitous** — Every animation earns its place. If it doesn't serve comprehension, pacing, or delight, remove it.
3. **Depth through layering, not clutter** — Z-axis richness: video, particles, panels, text, glass cards. Each layer has a clear role.
4. **Dark canvas, luminous accents** — Purple and cyan are the performers. Use color sparingly. When everything glows, nothing does.
5. **Credibility through restraint** — Trust chips and stats are matter-of-fact, not boastful. No exclamation marks, no superlatives.

### Design Tokens
- Defined in `styles/tokens.css` — bg-base, bg-surface, accent-primary/glow/secondary, accent-gold, text-primary/secondary/muted, border, glass, radius-card
- Typography: Inter (body), JetBrains Mono (labels/technical), DM Serif Display (name/editorial)
- Patterns: glass-card, gradient-text shimmer, grain overlay, scroll-reveal, magnetic buttons

### Lenis + GSAP Integration
Lenis and GSAP ScrollTrigger are synced via shared ticker in `components/shared/smooth-scroll-provider.tsx`. Do NOT use `ScrollTrigger.normalizeScroll()` — it conflicts with Lenis. Do NOT apply `transform: translateZ(0)` to ancestors of pinned sections — it breaks GSAP pin positioning.
