"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
    image,
  } = props;

  const domain = getDomain(url);

  return (
    <article>
      {/* Image */}
      <div className="rounded-2xl overflow-hidden border border-[var(--border)]">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-opacity hover:opacity-80"
        >
          <Image
            src={image}
            alt={`${title} – ${description.slice(0, 100)}`}
            width={1200}
            height={675}
            className="block w-full"
          />
        </a>
      </div>

      {/* Text */}
      <div className="mt-6">
        <span className="text-[13px] font-mono font-medium leading-[1.4] tracking-[0.04em] text-[var(--text-muted)]">
          {role}
        </span>

        <h3 className="mt-2 text-[clamp(1.1rem,2vw,1.5rem)] font-[600] leading-[1.2] tracking-[-0.01em] text-[var(--text-primary)]">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h3>

        <p className="mt-3 max-w-2xl text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-secondary)]">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-mono font-medium leading-[1.4] tracking-[0.04em] text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[15px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          Visit {domain} <ArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}
