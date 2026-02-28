import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { PROJECTS } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return PROJECTS.find((p) => p.id === slug);
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.role} | Heitinder Singh`;
  const description = project.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://heitindersingh.dev/projects/${project.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://heitindersingh.dev/projects/${project.id}`,
      images: [{ url: project.image, width: 800, height: 450, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  };
}

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const domain = (() => {
    try {
      return new URL(project.url).hostname.replace(/^www\./, "");
    } catch {
      return project.url;
    }
  })();

  return (
    <section className="relative flex min-h-screen flex-col items-center px-6 pb-24 pt-32 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${hexToRgba(project.accentFrom, 0.12)}, transparent 50%), radial-gradient(circle at 70% 80%, ${hexToRgba(project.accentTo, 0.08)}, transparent 50%)`,
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-[900px]">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <div className="mt-8">
          <span className="inline-flex rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-[var(--text-muted)]">
            {project.role}
          </span>

          <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
            {project.title}
          </h1>

          <p className="mt-4 max-w-[620px] text-[16px] leading-[1.7] text-[var(--text-secondary)]">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-[var(--glass)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(109,40,217,0.25)] transition-shadow hover:shadow-[0_12px_40px_rgba(109,40,217,0.35)]"
          >
            Visit {domain} <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <Image
            src={project.image}
            alt={`${project.title} – ${project.description.slice(0, 100)}`}
            width={900}
            height={506}
            priority
            className="block w-full"
          />
        </div>
      </div>
    </section>
  );
}
