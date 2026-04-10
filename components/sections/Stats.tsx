"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    value: "12+",
    label: "Years",
  },
  {
    value: "5",
    label: "Tier-1 Clients",
  },
  {
    value: "40+",
    label: "Projects",
  },
  {
    value: "4",
    label: "SaaS Products",
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
      className="flex flex-col"
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
      <div className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--text-primary)]">
        {count}
        {suffix}
      </div>
      <p className="text-[13px] text-[var(--text-muted)] mt-1">
        {item.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((item, index) => (
            <StatItem key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
