"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  { name: "Federal Reserve Bank of NY", short: "Fed Reserve" },
  { name: "BNY Mellon", short: "BNY Mellon" },
  { name: "Morgan Stanley", short: "Morgan Stanley" },
  { name: "Verizon", short: "Verizon" },
  { name: "T-Mobile", short: "T-Mobile" },
];

export default function LogoBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div ref={ref} className="py-10 sm:py-14">
      <motion.div
        className="mx-auto max-w-5xl px-6"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {clients.map((client, i) => (
            <motion.span
              key={client.name}
              className="font-mono text-sm tracking-[0.06em] text-[var(--text-secondary)] opacity-40 sm:text-base"
              initial={{ opacity: 0, y: 8 }}
              animate={
                inView
                  ? { opacity: 0.4, y: 0, transition: { delay: 0.1 + i * 0.08, duration: 0.5 } }
                  : { opacity: 0, y: 8 }
              }
              whileHover={{ opacity: 0.8 }}
            >
              {client.short}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
