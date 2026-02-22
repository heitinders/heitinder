"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    value: "12+",
    label: "Years",
    description: "Building high-performance web experiences",
  },
  {
    value: "5",
    label: "Tier-1 Clients",
    description: "Fed Reserve · BNY · Morgan Stanley · Verizon · T-Mobile",
  },
  {
    value: "40+",
    label: "Projects",
    description: "Shipped to production across finance, SaaS, and e-commerce",
  },
  {
    value: "4",
    label: "SaaS Products",
    description: "Founded and built from zero to live users",
  },
] as const;

function useCounter(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [duration, start, target]);

  return value;
}

function StatItem({
  item,
  index,
}: {
  item: (typeof STATS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const numericTarget = Number.parseInt(item.value, 10);
  const suffix = item.value.replace(String(numericTarget), "");
  const count = useCounter(numericTarget, isInView, 1500);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center px-6 py-2 text-center"
      initial={{ opacity: 0, y: 22 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.65,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              },
            }
          : { opacity: 0, y: 22 }
      }
    >
      <div className="text-[clamp(4rem,8vw,7rem)] leading-[0.92] font-black tracking-[-0.04em] gradient-text">
        {count}
        {suffix}
      </div>

      <p className="mt-2 font-mono text-[12px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
        {item.label}
      </p>

      <p className="mt-3 max-w-[160px] text-[14px] leading-[1.5] text-[var(--text-secondary)]">
        {item.description}
      </p>

      {index < STATS.length - 1 ? (
        <div
          aria-hidden
          className="absolute right-0 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-[var(--border)] lg:block"
        />
      ) : null}
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-[80px]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(var(--bg-base),var(--bg-surface))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.05),transparent_55%)]" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-glow)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-glow)] to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start justify-items-center gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((item, index) => (
          <StatItem key={item.label} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
