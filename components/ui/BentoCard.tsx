"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type BentoCardProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  accentColor: string;
} & Omit<HTMLMotionProps<"div">, "title" | "children" | "className">;

export default function BentoCard({
  title,
  icon: Icon,
  children,
  className,
  accentColor,
  ...props
}: BentoCardProps) {
  return (
    <motion.div
     
      className={cn(
        "glass-card relative overflow-hidden border transition-colors",
        "p-5 sm:p-6",
        className,
      )}
      style={
        {
          "--bento-accent": accentColor,
        } as React.CSSProperties
      }
      whileHover={{
        scale: 1.02,
        y: -4,
        borderColor: accentColor,
        filter: `drop-shadow(0 16px 28px color-mix(in srgb, ${accentColor} 20%, transparent))`,
      }}
      layout={false}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.35 }}
      {...props}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
          <Icon size={16} className="text-white/85" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--text-muted)] uppercase">
          {title}
        </span>
      </div>

      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
