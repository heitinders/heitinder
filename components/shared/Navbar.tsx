"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  targetId: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about", targetId: "about" },
  { label: "Experience", href: "#experience", targetId: "experience" },
  { label: "Work", href: "#work", targetId: "work" },
  { label: "AI", href: "#ai", targetId: "ai" },
  { label: "Contact", href: "#contact", targetId: "contact" },
];

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("projects");
  const prevScrollY = useRef(0);
  const drawerPanelRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 22,
    mass: 0.2,
  });

  useEffect(() => {
    let frame = 0;
    frame = window.requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 50);
      prevScrollY.current = window.scrollY;
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);

    const previous = prevScrollY.current;
    const delta = latest - previous;
    if (Math.abs(delta) < 2) return;

    if (latest <= 24) {
      setIsHidden(false);
    } else if (delta > 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    prevScrollY.current = latest;
  });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.targetId)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;
        const id = visibleEntries[0].target.id;
        setActiveSection(id);
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDrawerOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen]);

  const containerAnimate = useMemo(
    () =>
      isScrolled
        ? {
            backgroundColor: "rgba(4,4,10,0.92)",
            borderBottomColor: "rgba(255,255,255,0.06)",
          }
        : {
            backgroundColor: "rgba(4,4,10,0.5)",
            borderBottomColor: "rgba(255,255,255,0)",
          },
    [isScrolled],
  );

  return (
    <>
      <motion.div
        layout={false}
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[101] h-px origin-left bg-[var(--accent-primary)]"
        style={{ scaleX: progressScaleX }}
      />

      <motion.header
        layout={false}
        className="fixed inset-x-0 top-0 z-[100]"
        initial={false}
        animate={prefersReducedMotion ? { y: 0 } : { y: isHidden && !isDrawerOpen ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.25 }}
      >
        <motion.div
          layout={false}
          className="border-b"
          initial={false}
          animate={containerAnimate}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderBottomWidth: 1 }}
        >
          <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <a
              href="#top"
             
              className="cursor-pointer font-mono text-[18px] font-medium tracking-tight"
              aria-label="Go to top"
            >
              <span
                className="bg-gradient-to-r from-[#6d28d9] to-[#22d3ee] bg-clip-text text-transparent"
              >
                Heitinder Singh
              </span>
            </a>

            <nav className="hidden items-center justify-center gap-1 md:flex" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.targetId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                   
                    className={cn(
                      "relative px-3 py-2 text-[14px] tracking-[0.05em] uppercase",
                      "text-white/60 transition-colors",
                      "after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:origin-left after:bg-[var(--text-primary)] after:content-['']",
                      "after:scale-x-0 hover:text-[var(--text-primary)] hover:after:scale-x-100 after:transition-transform after:duration-200",
                      isActive && "text-[var(--text-primary)] after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 px-3 py-1.5 text-xs text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="tracking-[0.04em]">Open to work</span>
              </div>

              <a
                href="#contact"

                className="rounded-full bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(109,40,217,0.25)] transition-shadow hover:shadow-[0_8px_28px_rgba(109,40,217,0.35)]"
              >
                Let&apos;s Talk
              </a>
            </div>

            <button
              type="button"
             
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
              className="relative inline-flex h-11 w-11 items-center justify-center md:hidden"
              onClick={() => setIsDrawerOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <motion.span
                layout={false}
                className="absolute h-px w-6 bg-white"
                animate={isDrawerOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.span
                layout={false}
                className="absolute h-px w-6 bg-white"
                animate={isDrawerOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                layout={false}
                className="absolute h-px w-6 bg-white"
                animate={isDrawerOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isDrawerOpen ? (
          <motion.div
            layout={false}
            className="fixed inset-0 z-[99] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div
              layout={false}
              id="mobile-nav-drawer"
              ref={drawerPanelRef}
              className="absolute inset-0 grid place-items-center bg-[#0d0d1a]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    layout={false}
                    key={item.href}
                    href={item.href}
                   
                    className="text-center text-3xl font-light tracking-[0.08em] text-[var(--text-primary)] uppercase"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.04 * index }}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                 
                  className="mt-4 rounded-full border border-emerald-400/30 px-4 py-2 text-sm text-emerald-300"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Open to work
                </a>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
