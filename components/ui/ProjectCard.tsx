"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ProjectCardProps = {
  id: string;
  title: string;
  url: string;
  description: string;
  role: string;
  tags: string[];
  accentFrom: string;
  accentTo: string;
  image: string;
  index: number;
};

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const int = Number.parseInt(normalized, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

export default function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    url,
    description,
    role,
    tags,
    accentFrom,
    image,
    index,
  } = props;

  const domain = getDomain(url);
  const imageRight = index % 2 === 0;

  return (
    <motion.article
      className="group glass-card relative min-h-[78vh] overflow-hidden"
      whileHover={{
        scale: 1.01,
        filter: `drop-shadow(0 30px 50px ${hexToRgba(accentFrom, 0.12)})`,
      }}
      layout={false}
      transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.35 }}
    >
      <div className="grid h-full min-h-full grid-cols-1 lg:grid-cols-2">
        <div
          className={cn(
            "relative flex min-h-[360px] flex-col justify-center px-6 py-12 sm:px-8 lg:px-10",
            !imageRight && "lg:order-2",
          )}
        >
          <div className="pointer-events-none absolute left-4 top-3 font-mono text-[8rem] leading-none opacity-10 gradient-text select-none sm:left-6 sm:text-[9rem]">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-[var(--text-muted)]">
              {role}
            </span>

            <h3 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
              {title}
            </h3>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
             
              className="mt-3 inline-block font-mono text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--accent-secondary)]"
            >
              {domain}
            </a>

            <p className="mt-5 max-w-[420px] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--glass)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
             
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-glow)] hover:text-[var(--text-primary)]"
            >
              Visit {domain} <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div
          className={cn(
            "relative min-h-[320px] overflow-hidden border-t border-white/5 lg:min-h-full lg:border-t-0",
            imageRight ? "lg:order-2 lg:border-l" : "lg:order-1 lg:border-r",
            "border-white/5",
          )}
        >
          {/* Accent gradient behind the image */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, ${hexToRgba(accentFrom, 0.15)}, transparent 70%),
                linear-gradient(180deg, rgba(13,13,26,0.5), rgba(4,4,10,0.85))
              `,
            }}
          />
          {/* Screenshot image */}
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 lg:p-10">
            <motion.div
              layout={false}
              className="relative w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl"
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={image}
                alt={`${title} – ${description.slice(0, 100)}`}
                width={800}
                height={450}
                className="block w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
