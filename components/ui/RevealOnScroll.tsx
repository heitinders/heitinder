"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function RevealOnScroll({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={fadeInUp}
      initial="hidden"
      animate={prefersReducedMotion ? "visible" : inView ? "visible" : "hidden"}
      layout={false}
    >
      {children}
    </motion.div>
  );
}
