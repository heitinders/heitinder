"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const rowOne = [
  "React",
  "TypeScript",
  "Next.js",
  "Angular",
  "Node.js",
  "AWS",
  "GraphQL",
  "Three.js",
  "GSAP",
  "Framer Motion",
  "Redux",
  "WebGL",
];

const rowTwo = [
  "AI Integration",
  "ag-Grid",
  "Docker",
  "Jest",
  "D3.js",
  "CI/CD",
  "Tailwind",
  "SCSS",
  "Lenis",
  "Cypress",
  "MongoDB",
  "LangChain",
];

function MarqueeRow({
  items,
  direction,
  speed,
  rowKey,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number;
  rowKey: string;
}) {
  const segmentRef = useRef<HTMLDivElement>(null);
  const [segmentWidth, setSegmentWidth] = useState(0);

  useEffect(() => {
    const node = segmentRef.current;
    if (!node) return;

    const measure = () => setSegmentWidth(node.getBoundingClientRect().width);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const tripled = useMemo(() => [...items, ...items, ...items], [items]);
  const durationSeconds = segmentWidth > 0 ? segmentWidth / speed : 30;

  return (
    <div className="marquee-row group relative h-[44px] overflow-hidden border-y border-[var(--border)] bg-[var(--bg-surface)]">
      <div className="marquee-mask absolute inset-0" />

      <div
        className={cn(
          "marquee-track absolute inset-y-0 left-0 flex w-max items-center will-change-transform",
          direction === "left" ? "marquee-left" : "marquee-right",
        )}
        style={
          {
            "--segment-width": `${segmentWidth || 1}px`,
            "--marquee-duration": `${durationSeconds}s`,
          } as React.CSSProperties
        }
      >
        <div ref={segmentRef} className="flex items-center">
          {items.map((item, index) => (
            <MarqueeItem key={`${rowKey}-base-${item}-${index}`} item={item} index={index} />
          ))}
        </div>

        {tripled.slice(items.length).map((item, index) => (
          <MarqueeItem key={`${rowKey}-dup-${item}-${index}`} item={item} index={index + items.length} />
        ))}
      </div>
    </div>
  );
}

function MarqueeItem({ item, index }: { item: string; index: number }) {
  const outlined = index % 3 === 0 || index % 5 === 0;

  return (
    <div className="flex items-center">
      <span
        className={cn(
          "marquee-item px-4 font-mono text-[clamp(14px,2vw,18px)] tracking-[0.1em] uppercase transition-colors duration-200",
          outlined ? "marquee-outlined" : "text-[var(--text-muted)]",
        )}
      >
        {item}
      </span>
      <span
        aria-hidden
        className="px-2 text-[12px] text-[var(--accent-primary)]/80 sm:text-[13px]"
      >
        ◆
      </span>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="w-full overflow-hidden bg-[var(--bg-surface)] py-2">
      <MarqueeRow items={rowOne} direction="left" speed={40} rowKey="row-1" />
      <div className="h-px bg-[var(--border)]" />
      <MarqueeRow items={rowTwo} direction="right" speed={30} rowKey="row-2" />

      <style jsx>{`
        .marquee-row {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .marquee-track {
          animation-duration: var(--marquee-duration);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }

        .group:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-left {
          animation-name: marquee-left;
        }

        .marquee-right {
          animation-name: marquee-right;
        }

        .marquee-item:hover {
          color: var(--text-primary);
        }

        .marquee-outlined {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          text-stroke: 1px rgba(255, 255, 255, 0.2);
        }

        .marquee-outlined:hover {
          color: transparent;
          -webkit-text-stroke: 1px var(--accent-primary);
          text-stroke: 1px var(--accent-primary);
        }

        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * var(--segment-width)));
          }
        }

        @keyframes marquee-right {
          from {
            transform: translateX(calc(-1 * var(--segment-width)));
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
