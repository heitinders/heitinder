"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

/* ── Data ─────────────────────────────────────────────────────── */

const HEADLINE_LINES = ["12 years.", "Wall Street", "to AI SaaS."];

const TRUST_CHIPS = [
  "Federal Reserve Bank of NY",
  "BNY Mellon · 4.5 yrs",
  "12+ Years Shipping",
  "4 SaaS Products",
];

/* ── MagneticButton ───────────────────────────────────────────── */

function MagneticButton({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) > 80) {
        gsap.to(node, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
        return;
      }
      gsap.to(node, { x: dx * 0.15, y: dy * 0.15, duration: 0.25, ease: "power3.out" });
    };
    const reset = () => gsap.to(node, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });

    window.addEventListener("mousemove", move, { passive: true });
    node.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", move);
      node.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Staggered entrance — left-aligned content reveals top to bottom
    const items = section.querySelectorAll("[data-animate]");
    gsap.set(items, { opacity: 0, y: 24 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      delay: 0.15,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden bg-[var(--bg-base)]"
    >
      {/* Subtle radial glow — warm, not neon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(201,169,110,0.07), transparent 70%), radial-gradient(ellipse 40% 60% at 80% 80%, rgba(184,106,80,0.05), transparent 60%)",
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-6xl px-6 py-28 sm:py-32 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">

          {/* Left column — headline + bio */}
          <div className="flex-1">
            {/* Availability */}
            <div data-animate className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]/60 px-4 py-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#22c55e]" />
                <span className="relative h-2 w-2 rounded-full bg-[#22c55e]" style={{ boxShadow: "0 0 0 3px rgba(34,197,94,0.15)" }} />
              </span>
              <span className="text-[13px] text-[var(--text-secondary)]">
                Available for hire · NYC/NJ &amp; Remote
              </span>
            </div>

            {/* Headline */}
            <h1 data-animate>
              {HEADLINE_LINES.map((line, i) => (
                <span
                  key={line}
                  className={cn(
                    "block text-[clamp(2.8rem,8vw,6rem)] font-[800] leading-[0.92] tracking-[-0.035em]",
                    i < 2 ? "text-[var(--text-primary)]" : "text-[var(--accent-glow)]",
                  )}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Name + role */}
            <div data-animate className="mt-6 flex flex-col gap-1">
              <p
                className="text-[clamp(1.1rem,2.2vw,1.5rem)] text-white/90"
                style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif" }}
              >
                Heitinder Singh
              </p>
              <p className="text-[15px] text-[var(--text-secondary)]">
                Senior Frontend Engineer · UI Architect
              </p>
            </div>

            {/* Bio */}
            <p data-animate className="mt-6 max-w-lg text-[15px] leading-[1.7] text-[var(--text-secondary)]">
              Built trading platforms at the Federal Reserve and BNY Mellon,
              then shipped 4 AI-powered SaaS products. I engineer experiences
              that perform at scale.
            </p>

            {/* CTAs */}
            <div data-animate className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-glow)] px-7 py-3.5 text-sm font-semibold text-[var(--bg-base)] transition-opacity hover:opacity-90"
              >
                See What I&apos;ve Shipped
                <span aria-hidden className="text-[var(--bg-base)]/60">&darr;</span>
              </MagneticButton>
              <a
                href="#contact"
                className="rounded-full border border-[var(--border)] px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-glow)]/40"
              >
                Book a Call <span aria-hidden>&rarr;</span>
              </a>
            </div>

            {/* Trust chips */}
            <div data-animate className="mt-10 flex flex-wrap gap-2">
              {TRUST_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-surface)]/40 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-[var(--text-muted)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — visible on desktop only, subtle credential accent */}
          <div data-animate className="mt-14 hidden lg:mt-0 lg:block lg:w-[320px] lg:shrink-0">
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]/40 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  Currently
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-primary)]">
                  Building AI-powered SaaS products.
                  Previously enterprise trading systems at scale.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]/40 p-4">
                  <p className="font-mono text-2xl font-bold text-[var(--text-primary)]">12+</p>
                  <p className="mt-1 text-[12px] text-[var(--text-muted)]">Years experience</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]/40 p-4">
                  <p className="font-mono text-2xl font-bold text-[var(--text-primary)]">4</p>
                  <p className="mt-1 text-[12px] text-[var(--text-muted)]">SaaS products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint — bottom center */}
      <div
        data-animate
        className="absolute bottom-6 left-1/2 z-[1] hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
      </div>
    </section>
  );
}
