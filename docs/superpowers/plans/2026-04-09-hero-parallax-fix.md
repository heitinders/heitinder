# HeroParallax Fix-in-Place Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the static HeroParallax section so the video responds to scroll, panels animate, and all Hero content is merged into one section.

**Architecture:** Sync Lenis smooth-scroll with GSAP ScrollTrigger via shared ticker. Switch video from broken `currentTime` seeking to `playbackRate` modulation driven by scroll velocity. Merge old Hero.tsx content (headline, trust chips, CTAs) into HeroParallax, replacing Framer Motion animations with GSAP equivalents.

**Tech Stack:** GSAP 3.14.2 + ScrollTrigger, @studio-freight/lenis 1.0.42 (v1 API), Next.js 16 App Router, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-04-09-hero-parallax-fix-design.md`

**Key decisions already made:**
- ffmpeg is NOT installed — using playbackRate fallback (not video re-encode)
- Lenis is v1 (`@studio-freight/lenis@1.0.42`) — using `lenis.raf(time * 1000)` pattern
- `hero-video.mp4` is the source of truth video file
- Hero.tsx is only imported in `app/page.tsx` — safe to delete

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/shared/smooth-scroll-provider.tsx` | Modify | Connect Lenis to GSAP ticker, remove manual rAF loop |
| `components/sections/HeroParallax.tsx` | Rewrite | Unified hero: video playbackRate, merged Hero content, GSAP-only animations |
| `app/page.tsx` | Modify | Remove Hero import and element |
| `components/sections/Hero.tsx` | Delete | Dead code after merge |

---

### Task 1: Fix Lenis + GSAP Integration

**Files:**
- Modify: `components/shared/smooth-scroll-provider.tsx`

This is the foundation — nothing else works until Lenis and ScrollTrigger are synced.

- [ ] **Step 1: Read the current file**

Read `components/shared/smooth-scroll-provider.tsx`. Copy the exact Lenis constructor arguments verbatim — they contain site-specific tuning (duration, easing, wheelMultiplier, etc.) that must be preserved. Only add the GSAP integration lines; do not change the Lenis config.

- [ ] **Step 2: Rewrite smooth-scroll-provider.tsx**

Replace the entire file. **IMPORTANT:** The Lenis constructor config below is copied from the existing file. If the existing file has different values, use those instead:

```typescript
"use client";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Lenis notifies ScrollTrigger on every scroll frame
    lenis.on("scroll", ScrollTrigger.update);

    // CRITICAL: store as named variable so gsap.ticker.remove() can find it.
    // An inline arrow cannot be removed and leaks on every hot reload.
    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // iOS Safari: prevent touch inertia from causing unpredictable scroll events
    ScrollTrigger.normalizeScroll(true);

    // Refresh after fonts load so GSAP pin positions use correct element dimensions.
    // Guard against unmount before fonts resolve (happens on every hot reload in dev).
    let mounted = true;
    document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh(); });

    return () => {
      mounted = false;
      gsap.ticker.remove(lenisRaf);
      ScrollTrigger.normalizeScroll(false);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Verify build passes**

Run: `npx next build 2>&1 | tail -5`
Expected: `Generating static pages` with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/shared/smooth-scroll-provider.tsx
git commit -m "fix: sync Lenis with GSAP ScrollTrigger via shared ticker"
```

---

### Task 2: Rewrite HeroParallax — Video, Scrub Logic, and Merged Content

**Files:**
- Rewrite: `components/sections/HeroParallax.tsx`
- Reference (read-only): `components/sections/Hero.tsx` — copy content from here

This is the largest task. It replaces the broken video scrub, merges Hero content, and uses GSAP-only animations. Because so many parts are interconnected (video, panels, text, trust chips all share one ScrollTrigger pin), this is done as one rewrite rather than multiple incremental edits.

- [ ] **Step 1: Read Hero.tsx to capture content**

Read `components/sections/Hero.tsx` fully. Note the exact JSX for:
- Availability badge (lines 159-176)
- Headline with gradient shimmer (lines 178-207)
- Mono tagline (lines 209-217)
- Bio paragraph (lines 219-229)
- CTAs with MagneticButton (lines 231-246)
- Trust chips data + TrustChip component (lines 14-53)
- MagneticButton component (lines 56-108)

- [ ] **Step 2: Write the new HeroParallax.tsx**

Replace the entire file. Key changes from the current version:

**Video approach:**
- Add `autoPlay`, `muted`, `playsInline`, `loop` to video element
- Remove `<source>` for webm (doesn't exist)
- Call `video.play().catch(() => {})` in useEffect
- Set initial `video.playbackRate = 0.3`
- In main ScrollTrigger's `onUpdate`: capture `self.getVelocity()` (instance method) into a `lastVelocity` variable
- In GSAP ticker callback: read `lastVelocity`, map to playbackRate via lerp
- Velocity mapping: 0 velocity = 0.3 rate, 500px/s = 1.0, 1500px/s = 2.0, negative = 0.15
- Floor at 0.15 (Safari), cap at 2.0

**ScrollTrigger fix:**
- Main trigger: `scrub: 1` (was `scrub: false`)
- Remove `targetTimeRef`, `rafRef`, the standalone rAF tick loop
- Remove all `video.currentTime` code

**Merged content from Hero.tsx:**
- Copy MagneticButton component (already uses GSAP, no Framer dependency)
- Copy TrustChip component — replace `motion.div` with plain `div`, replace `useMotionValue`/`useTransform` mouse parallax with `gsap.quickTo()` on mousemove
- Availability badge, headline, tagline, bio, CTAs — convert from `motion.*` to plain elements with GSAP `gsap.from()` entrance animations

**Reduced motion:**
- Inside useEffect: `const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches`
- If true: skip entrance animations, call `video.pause()` (not `playbackRate = 0` which throws in Safari), don't start velocity ticker

**What stays the same:**
- 3D skill panels with scrubbed ScrollTrigger entrance
- Scroll-reveal labels with clip-path
- End-of-pin CTA
- Progress bar
- Particle canvas
- Dark gradient overlay
- Video fade at 80%
- Mobile fallback

The complete file:

```typescript
/**
 * HeroParallax — Unified scroll-driven cinematic hero section
 *
 * Lenis + GSAP integration happens in smooth-scroll-provider.tsx.
 * This component assumes ScrollTrigger is already synced with Lenis.
 *
 * Video plays as ambient atmosphere with playbackRate tied to scroll velocity.
 * 3D panels, text reveals, and parallax depth are the visual centerpiece.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* --- Skill Panel Data --------------------------------------------------- */

interface SkillPanel {
  label: string;
  icon: React.ReactNode;
  tx: string;
  ty: string;
  tz: number;
  ry: number;
  rx: number;
}

const SKILL_PANELS: SkillPanel[] = [
  {
    label: "React & Next.js",
    tx: "-38vw", ty: "-18vh", tz: 60, ry: 14, rx: -4,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Three.js & WebGL",
    tx: "32vw", ty: "-22vh", tz: 90, ry: -18, rx: 6,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2l-8 4.5v7L12 18l8-4.5v-7L12 2z" />
        <path d="M12 18v4.5" /><path d="M4 6.5L12 11l8-4.5" /><path d="M12 11v7" />
      </svg>
    ),
  },
  {
    label: "GSAP Animations",
    tx: "-30vw", ty: "12vh", tz: 40, ry: 10, rx: 8,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <line x1="3" y1="12" x2="21" y2="12" /><circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" />
        <line x1="3" y1="6" x2="21" y2="6" strokeOpacity={0.4} />
        <line x1="3" y1="18" x2="21" y2="18" strokeOpacity={0.4} />
      </svg>
    ),
  },
  {
    label: "TypeScript",
    tx: "36vw", ty: "8vh", tz: 70, ry: -12, rx: -5,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.1 14.4v-1.7c.4.4 1 .7 1.6.7.8 0 1.2-.4 1.2-1 0-1.4-3-.9-3-3.1 0-1.2.9-2 2.2-2 .6 0 1.1.1 1.5.4v1.6c-.4-.3-.9-.5-1.4-.5-.7 0-1.1.3-1.1.9 0 1.3 3 .8 3 3.1 0 1.2-.9 2.1-2.3 2.1-.7 0-1.3-.2-1.7-.5zM7 10.5h1.8V17H10v-6.5h1.8V9H7v1.5z" />
      </svg>
    ),
  },
  {
    label: "UI Systems & Design",
    tx: "-12vw", ty: "26vh", tz: 50, ry: 6, rx: -8,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" />
      </svg>
    ),
  },
  {
    label: "Performance & CWV",
    tx: "18vw", ty: "24vh", tz: 80, ry: -8, rx: 4,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="14" r="8" /><path d="M12 14l3-5" strokeLinecap="round" />
        <line x1="12" y1="6" x2="12" y2="4" /><line x1="4" y1="14" x2="6" y2="14" />
        <line x1="18" y1="14" x2="20" y2="14" />
      </svg>
    ),
  },
];

/* --- Scroll-reveal Labels ----------------------------------------------- */

const SCROLL_LABELS = [
  { text: "3D Interfaces", progress: 0.2 },
  { text: "Scroll-Driven UX", progress: 0.4 },
  { text: "Component Architecture", progress: 0.6 },
  { text: "Performance Engineering", progress: 0.8 },
];

/* --- Trust Chip Data ---------------------------------------------------- */

const TRUST_CHIPS = [
  { text: "Federal Reserve Bank of NY", depth: 0.02, pos: "left-[2%] bottom-16 sm:left-[10%] sm:bottom-20" },
  { text: "BNY \u00b7 4.5yrs", depth: 0.04, pos: "left-[8%] bottom-4 sm:left-[28%] sm:bottom-4" },
  { text: "12+ Years Shipping", depth: 0.03, pos: "right-[2%] bottom-16 sm:right-[25%] sm:bottom-14" },
  { text: "4 SaaS Products", depth: 0.05, pos: "right-[8%] bottom-4 sm:right-[8%] sm:bottom-4" },
];

/* --- Headline Lines ----------------------------------------------------- */

const HEADLINE_LINES = ["12 years.", "Wall Street", "to AI SaaS."];

/* --- MagneticButton (from Hero.tsx, already uses GSAP) ------------------ */

function MagneticButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = buttonRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      if (distance > 80) {
        gsap.to(node, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
        return;
      }
      gsap.to(node, { x: dx * 0.18, y: dy * 0.18, duration: 0.25, ease: "power3.out" });
    };

    const reset = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    };

    window.addEventListener("mousemove", move, { passive: true });
    node.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", move);
      node.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href="#work"
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(109,40,217,0.3)]"
    >
      See What I&apos;ve Shipped <span aria-hidden>&#8595;</span>
    </a>
  );
}

/* --- Main Component ----------------------------------------------------- */

export default function HeroParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const trustChipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  /* -- Mobile detection -------------------------------------------------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* -- Particle system --------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 50;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    interface Particle { x: number; y: number; speed: number; opacity: number; }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.2 + Math.random() * 0.5,
      opacity: 0.15 + Math.random() * 0.2,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -2) { p.y = h + 2; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* -- Video playbackRate + ScrollTrigger animations --------------------- */
  // isMobile is read via ref to avoid full ScrollTrigger teardown on resize
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // SSR-safe reduced motion check (useEffect only runs on client)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start video playing as ambient atmosphere
    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.playbackRate = 0.3;
      video.play().catch(() => {});
    }

    const triggers: ScrollTrigger[] = [];
    const cleanups: (() => void)[] = [];

    // --- Video playbackRate driven by scroll velocity ---
    // Velocity is captured from the ScrollTrigger instance's getVelocity()
    // inside onUpdate, then the ticker reads it for smooth lerping.
    let lastVelocity = 0;
    let currentRate = 0.3;
    let targetRate = 0.3;

    const velocityTick = () => {
      if (prefersReducedMotion) return;
      const absVelocity = Math.abs(lastVelocity);
      // Map: 0 -> 0.3, 500 -> 1.0, 1500+ -> 2.0
      if (absVelocity < 10) {
        targetRate = 0.3;
      } else {
        targetRate = Math.min(2.0, 0.3 + (absVelocity / 500) * 0.7);
      }
      // Slow down on scroll up
      if (lastVelocity < -10) {
        targetRate = 0.15;
      }
      // Lerp for smooth transitions
      currentRate += (targetRate - currentRate) * 0.08;
      currentRate = Math.max(0.15, currentRate); // Safari floor
      video.playbackRate = currentRate;
    };

    if (!prefersReducedMotion) {
      gsap.ticker.add(velocityTick);
      cleanups.push(() => gsap.ticker.remove(velocityTick));
    }

    // --- Main pin trigger (scrub: 1 for smooth progress) ---
    const mainTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 4}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        // Capture velocity from the instance — getVelocity() is an instance method
        lastVelocity = self.getVelocity();

        // Progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${self.progress})`;
        }
        // Video fade to 60% after 80%
        if (self.progress > 0.8) {
          const fade = 1 - ((self.progress - 0.8) / 0.2) * 0.4;
          video.style.opacity = String(fade);
        } else {
          video.style.opacity = "1";
        }
      },
    });
    triggers.push(mainTrigger);

    // Pin distance in px — all child trigger positions must use this as base
    const PIN_DISTANCE = window.innerHeight * 4;

    // --- Hero text fade-out (0-10% of pin distance) ---
    if (heroTextRef.current) {
      const heroTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: `+=${PIN_DISTANCE * 0.1}px`, scrub: 1 },
      });
      heroTl.to(heroTextRef.current, { opacity: 0, y: -40, ease: "none" });
      if (heroTl.scrollTrigger) triggers.push(heroTl.scrollTrigger);
    }

    // --- 3D Skill panels (read isMobile via ref) ---
    // Uses px offsets from PIN_DISTANCE — NOT % which resolves against element height
    if (!isMobileRef.current) {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const staggerStart = 0.08 + i * 0.1; // 8%, 18%, 28%, 38%, 48%, 58%
        const staggerEnd = staggerStart + 0.25;

        gsap.set(panel, { opacity: 0, z: -200, rotateY: SKILL_PANELS[i].ry * 2, rotateX: SKILL_PANELS[i].rx * 2 });

        const panelTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: `top+=${staggerStart * PIN_DISTANCE}px top`,
            end: `top+=${staggerEnd * PIN_DISTANCE}px top`,
            scrub: 1,
          },
        });
        panelTl.to(panel, {
          opacity: 1, z: SKILL_PANELS[i].tz, rotateY: SKILL_PANELS[i].ry, rotateX: SKILL_PANELS[i].rx,
          ease: "power2.out",
        });
        if (panelTl.scrollTrigger) triggers.push(panelTl.scrollTrigger);
      });
    }

    // --- Scroll-reveal labels ---
    labelRefs.current.forEach((label, i) => {
      if (!label) return;
      const p = SCROLL_LABELS[i].progress;
      const labelTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `top+=${(p - 0.05) * PIN_DISTANCE}px top`,
          end: `top+=${(p + 0.08) * PIN_DISTANCE}px top`,
          scrub: 1,
        },
      });
      labelTl
        .fromTo(label, { clipPath: "inset(100% 0 0 0)", opacity: 0 }, { clipPath: "inset(0% 0 0 0)", opacity: 1, ease: "none" })
        .to(label, { clipPath: "inset(0 0 100% 0)", opacity: 0, ease: "none", delay: 0.2 });
      if (labelTl.scrollTrigger) triggers.push(labelTl.scrollTrigger);
    });

    // --- CTA reveal ---
    if (ctaRef.current) {
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: `top+=${PIN_DISTANCE * 0.85}px top`, end: `top+=${PIN_DISTANCE * 0.95}px top`, scrub: 1 },
      });
      ctaTl.fromTo(ctaRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: "power2.out" });
      if (ctaTl.scrollTrigger) triggers.push(ctaTl.scrollTrigger);
    }

    // --- GSAP entrance animations (replaces Framer Motion) ---
    if (!prefersReducedMotion) {
      const heroContent = heroTextRef.current;
      if (heroContent) {
        const children = heroContent.children;
        gsap.from(children, {
          opacity: 0, y: 20, duration: 0.6, stagger: 0.12, delay: 0.3, ease: "power3.out",
        });
      }
    }

    // --- Trust chip mouse parallax (replaces Framer useMotionValue) ---
    if (!prefersReducedMotion && !isMobileRef.current) {
      const quickTos = trustChipRefs.current.map((chip) => {
        if (!chip) return null;
        return { x: gsap.quickTo(chip, "x", { duration: 0.5, ease: "power3" }), y: gsap.quickTo(chip, "y", { duration: 0.5, ease: "power3" }) };
      });

      const onMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        TRUST_CHIPS.forEach((chip, i) => {
          const qt = quickTos[i];
          if (!qt) return;
          qt.x(nx * chip.depth * 420);
          qt.y(ny * chip.depth * 220);
        });
      };
      const onMouseLeave = () => {
        quickTos.forEach((qt) => { if (qt) { qt.x(0); qt.y(0); } });
      };

      section.addEventListener("mousemove", onMouseMove);
      section.addEventListener("mouseleave", onMouseLeave);
      cleanups.push(() => {
        section.removeEventListener("mousemove", onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
      });
    }

    // Single cleanup function — no dual-return issue
    return () => {
      triggers.forEach((t) => t.kill());
      cleanups.forEach((fn) => fn());
    };
  }, []); // Empty deps — reads isMobile via ref, no teardown on resize

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-parallax relative w-full bg-[#04040a]"
      style={{ height: "100vh", position: "relative", willChange: "transform", isolation: "isolate" }}
    >
      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-[#4B9EFF]"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Video Background */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        poster="/hero-poster.jpg"
        preload="auto"
        muted
        playsInline
        loop
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[2] h-full w-full" />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(0,0,0,0.8) 100%)" }}
      />

      {/* Hero Text — fades out on scroll */}
      <div
        ref={heroTextRef}
        className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center"
      >
        {/* Availability badge */}
        <div className="glass-card mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#22c55e]" />
            <span className="relative h-2 w-2 rounded-full bg-[#22c55e]" style={{ boxShadow: "0 0 0 4px rgba(34,197,94,0.2)" }} />
          </span>
          <span className="font-mono text-[12px] text-[var(--text-primary)]/70">
            Available for Hire &middot; NYC/NJ &amp; Remote
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-0">
          {HEADLINE_LINES.map((line, index) => (
            <span
              key={line}
              className={cn(
                "block text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]",
                "font-[800] text-[var(--text-primary)]",
                index === 2 && "gradient-text",
              )}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Name subtitle */}
        <p
          className="mt-5 text-[clamp(1.1rem,2.5vw,1.6rem)] leading-[1.1] tracking-[-0.01em] text-white/70"
          style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif" }}
        >
          Heitinder Singh
        </p>

        {/* Mono tagline */}
        <p className="mt-5 font-mono text-[14px] tracking-[0.15em] text-[var(--text-primary)]/60 uppercase">
          Enterprise-grade frontend &middot; Startup-speed shipping &middot; AI-native
        </p>

        {/* Bio */}
        <p className="mt-5 max-w-[520px] text-[16px] leading-[1.7] text-[var(--text-primary)]/55">
          Senior Frontend Engineer who built trading platforms at the Federal
          Reserve and BNY Mellon, then shipped 4 AI-powered SaaS products.
          I engineer experiences that perform at scale.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton />
          <a
            href="#contact"
            className="rounded-full border border-[var(--border)] px-6 py-3.5 text-sm font-medium tracking-[0.04em] text-[var(--text-primary)] transition-colors hover:border-[var(--accent-glow)]"
          >
            Book a Call <span aria-hidden>&rarr;</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll to explore</span>
          <svg className="hero-parallax-chevron h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Trust Chips */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-36 sm:block">
        {TRUST_CHIPS.map((chip, i) => (
          <div
            key={chip.text}
            ref={(el) => { trustChipRefs.current[i] = el; }}
            className={cn("absolute", chip.pos)}
          >
            <div className="glass-card rounded-full px-4 py-2">
              <span className="font-mono text-[11px] tracking-[0.05em] text-[var(--text-secondary)]">
                {chip.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Skill Panels (desktop only) */}
      {!isMobile && (
        <div className="absolute inset-0 z-[3]" style={{ perspective: "1200px", transformStyle: "preserve-3d" }}>
          {SKILL_PANELS.map((panel, i) => (
            <div
              key={panel.label}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="hero-parallax-panel absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${panel.tx}, ${panel.ty}) translateZ(${panel.tz}px) rotateY(${panel.ry}deg) rotateX(${panel.rx}deg)`,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="hero-parallax-panel-glow flex items-center gap-3 rounded-xl border bg-[#0B0F1A]/80 px-5 py-4 text-white backdrop-blur-[8px]"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <span className="text-[#4B9EFF]">{panel.icon}</span>
                <span className="whitespace-nowrap text-sm font-medium tracking-wide">{panel.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile: Static Skill Tags */}
      {isMobile && (
        <div className="absolute inset-x-0 bottom-24 z-[4] flex flex-wrap justify-center gap-2 px-4">
          {SKILL_PANELS.map((panel) => (
            <div key={panel.label} className="flex items-center gap-2 rounded-full border border-[rgba(75,158,255,0.3)] bg-[#0B0F1A]/70 px-3 py-2 text-xs font-medium text-white">
              <span className="text-[#4B9EFF]">{panel.icon}</span>
              {panel.label}
            </div>
          ))}
        </div>
      )}

      {/* Scroll-reveal Labels */}
      {SCROLL_LABELS.map((item, i) => (
        <div
          key={item.text}
          ref={(el) => { labelRefs.current[i] = el; }}
          className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center"
          style={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
        >
          <span className="text-center font-semibold leading-tight tracking-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
            {item.text}
          </span>
        </div>
      ))}

      {/* CTA at end of pin */}
      <div ref={ctaRef} className="absolute inset-0 z-[6] flex flex-col items-center justify-center" style={{ opacity: 0 }}>
        <p className="mb-8 max-w-lg text-center text-[clamp(1.25rem,3vw,2.25rem)] font-light leading-snug text-white">
          Built with precision.<br />Ready for your stack.
        </p>
        <a href="/#projects" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#04040a] transition-transform hover:scale-105">
          View My Work <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `npx next build 2>&1 | tail -5`
Expected: `Generating static pages` with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroParallax.tsx
git commit -m "feat: rewrite HeroParallax with playbackRate video, merged Hero content, GSAP-only animations"
```

---

### Task 3: Update page.tsx and Delete Hero.tsx

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/sections/Hero.tsx`

- [ ] **Step 1: Update page.tsx — remove Hero import and element**

In `app/page.tsx`:
- Remove line: `import Hero from "@/components/sections/Hero";`
- Remove line: `<Hero />`

The file should go from:
```tsx
<HeroParallax />
<Hero />
<LogoBar />
```
To:
```tsx
<HeroParallax />
<LogoBar />
```

- [ ] **Step 2: Delete Hero.tsx**

Run: `rm components/sections/Hero.tsx`

Only `app/page.tsx` imports it (already confirmed via grep).

- [ ] **Step 3: Verify build passes**

Run: `npx next build 2>&1 | tail -10`
Expected: Build succeeds, no broken imports.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git rm components/sections/Hero.tsx
git commit -m "refactor: remove Hero.tsx, content merged into HeroParallax"
```

---

### Task 4: Generate Poster Image

**Files:**
- Create: `public/hero-poster.jpg`

ffmpeg is not installed, so this must be done manually.

- [ ] **Step 1: Generate poster from video**

Open `public/hero-video.mp4` in QuickTime or any video player. Pause at frame 0. Take a screenshot. Save/export as `public/hero-poster.jpg`.

Alternatively, use a quick Node script:

```bash
# Open video in browser to capture frame 0
node -e "
const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(\`<video id='v' src='/hero-video.mp4' muted></video>
    <canvas id='c'></canvas>
    <script>
      const v=document.getElementById('v'), c=document.getElementById('c');
      v.addEventListener('loadeddata', () => {
        c.width=v.videoWidth; c.height=v.videoHeight;
        c.getContext('2d').drawImage(v,0,0);
        const a=document.createElement('a');
        a.href=c.toDataURL('image/jpeg',0.92);
        a.download='hero-poster.jpg'; a.click();
      });
    </script>\`);
  } else {
    const file = './public' + req.url;
    if (fs.existsSync(file)) {
      res.writeHead(200); fs.createReadStream(file).pipe(res);
    } else { res.writeHead(404); res.end(); }
  }
}).listen(3333, () => console.log('Open http://localhost:3333 — poster will auto-download'));
"
```

- [ ] **Step 2: Verify poster exists**

Run: `ls -lh public/hero-poster.jpg`
Expected: File exists, reasonable size (50KB-500KB).

- [ ] **Step 3: Commit**

```bash
git add public/hero-poster.jpg
git commit -m "feat: add hero poster image for video placeholder"
```

---

### Task 5: Final Verification

- [ ] **Step 1: Full build check**

Run: `npx next build 2>&1 | tail -15`
Expected: All pages build, no errors.

- [ ] **Step 2: Dev server smoke test**

Run: `npx next dev`
Open `http://localhost:3000` and verify:
- Video plays slowly on load (0.3x)
- Scrolling speeds up the video
- Hero text fades out in first 10% of scroll
- 3D panels animate in with stagger
- Scroll-reveal labels appear at 20/40/60/80%
- Progress bar fills at top of viewport
- Video fades to 60% opacity after 80%
- Trust chips follow mouse
- "Built with precision" CTA appears at end
- Mobile: panels replaced with static tags

- [ ] **Step 3: Commit any remaining fixes if needed**
