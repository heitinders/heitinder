"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const HeroCanvas = dynamic(() => import("@/components/canvas/HeroCanvas"), {
  ssr: false,
});

const headlineLines = ["Building the", "Future of the", "Web."];
const trustChips = [
  { text: "Federal Reserve Bank of NY", depth: 0.02, pos: "left-[4%] bottom-20 sm:left-[10%] sm:bottom-20" },
  { text: "BNY · 4.5yrs", depth: 0.04, pos: "left-[10%] bottom-6 sm:left-[28%] sm:bottom-4" },
  { text: "12+ Years Shipping", depth: 0.03, pos: "right-[10%] bottom-20 sm:right-[25%] sm:bottom-14" },
  { text: "4 SaaS Products", depth: 0.05, pos: "right-[4%] bottom-6 sm:right-[8%] sm:bottom-4" },
];

function TrustChip({
  text,
  depth,
  pos,
  mouseX,
  mouseY,
}: {
  text: string;
  depth: number;
  pos: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useTransform(mouseX, (v) => v * (depth * 420));
  const y = useTransform(mouseY, (v) => v * (depth * 220));

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
      }}
      style={{ x, y }}
      className={cn("absolute", pos)}
    >
      <div className="glass-card rounded-full px-4 py-2">
        <span className="font-mono text-[11px] tracking-[0.05em] text-[var(--text-secondary)]">
          {text}
        </span>
      </div>
    </motion.div>
  );
}

function MagneticButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = buttonRef.current;
    if (!node || prefersReducedMotion) return;

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

      gsap.to(node, {
        x: dx * 0.18,
        y: dy * 0.18,
        duration: 0.25,
        ease: "power3.out",
      });
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
  }, [prefersReducedMotion]);

  return (
    <a
      ref={buttonRef}
      href="#projects"
     
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(109,40,217,0.3)]"
    >
      View Selected Work <span aria-hidden>↓</span>
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || prefersReducedMotion) return;
    let lastTime = 0;

    const onMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 16) return;
      lastTime = now;
      const rect = node.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    const onLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_20%,rgba(109,40,217,0.20),transparent_45%),radial-gradient(circle_at_80%_26%,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_52%_100%,rgba(109,40,217,0.10),transparent_38%)]" />
      <HeroCanvas />
      {/* Dark overlay for text contrast — darkens center/top where text lives */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(4,4,10,0.55),transparent_100%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(4,4,10,0.7)] via-[rgba(4,4,10,0.35)] to-[var(--bg-base)]" />

      <div className="relative z-[1] mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          layout={false}
          initial={{ opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#22c55e]" />
            <span
              className="relative h-2 w-2 rounded-full bg-[#22c55e]"
              style={{ boxShadow: "0 0 0 4px rgba(34,197,94,0.2)" }}
            />
          </span>
          <span className="font-mono text-[12px] text-[var(--text-primary)]/70">
            Available · NYC/NJ & Remote
          </span>
        </motion.div>

        <motion.div
          layout={false}
          className="mt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: 0.4, staggerChildren: 0.1 },
            },
          }}
        >
          {headlineLines.map((line, index) => (
            <motion.div
              layout={false}
              key={line}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={cn(
                "text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]",
                "font-[800] text-[var(--text-primary)]",
                index === 2 && "gradient-text",
              )}
            >
              {line}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          layout={false}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.8 }}
          className="mt-7 font-mono text-[14px] tracking-[0.15em] text-[var(--text-primary)]/60 uppercase"
        >
          Senior Frontend Engineer · AI Product Builder · 12+ Years
        </motion.p>

        <motion.p
          layout={false}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 max-w-[480px] text-[16px] leading-[1.7] text-[var(--text-primary)]/55"
        >
          From Wall Street trading platforms to AI-powered SaaS — I engineer
          experiences that perform at scale and feel like art.
        </motion.p>

        <motion.div
          layout={false}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton />
          <a
            href="mailto:heitinder.js@gmail.com"
           
            className="rounded-full border border-[var(--border)] px-6 py-3.5 text-sm tracking-[0.04em] text-[var(--text-primary)] transition-colors hover:border-[var(--accent-glow)]"
          >
            heitinder.js@gmail.com
          </a>
        </motion.div>
      </div>

      <motion.div
        layout={false}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-36 sm:block"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 1.4, staggerChildren: 0.08 } },
        }}
      >
        {trustChips.map((chip) => (
          <TrustChip
            key={chip.text}
            text={chip.text}
            depth={chip.depth}
            pos={chip.pos}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </motion.div>

      <motion.div
        layout={false}
        className="absolute bottom-8 left-1/2 z-[1] hidden -translate-x-1/2 items-end gap-3 sm:flex"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.6 }}
      >
        <span className="mb-6 origin-center -rotate-90 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
          SCROLL
        </span>
        <div className="relative h-[60px] w-px overflow-hidden bg-transparent">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[var(--accent-primary)] to-transparent"
            animate={{ scaleY: [0, 1, 1] }}
            transition={{ duration: 1.2, times: [0, 0.7, 1], repeat: Infinity, repeatDelay: 0.2 }}
          />
          <motion.div
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--accent-glow)]"
            animate={{ y: [4, 46, 42] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
