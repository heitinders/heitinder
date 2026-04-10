"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
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
  const { scrollY } = useScroll();

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
            backgroundColor: "color-mix(in srgb, var(--bg-base) 92%, transparent)",
            borderBottomColor: "var(--border)",
          }
        : {
            backgroundColor: "color-mix(in srgb, var(--bg-base) 50%, transparent)",
            borderBottomColor: "rgba(255,255,255,0)",
          },
    [isScrolled],
  );

  return (
    <>
      <motion.header
        layout={false}
        className="fixed inset-x-0 top-0 z-[100]"
        initial={false}
        animate={prefersReducedMotion ? { y: 0 } : { y: isHidden && !isDrawerOpen ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.25 }}
      >
        <motion.div
          layout={false}
          className="border-b backdrop-blur-md"
          initial={false}
          animate={containerAnimate}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderBottomWidth: 1 }}
        >
          <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
            <a
              href="#top"
              className="cursor-pointer text-[15px] font-medium text-[var(--text-primary)]"
              aria-label="Go to top"
            >
              Heitinder Singh
            </a>

            <nav className="hidden items-center justify-center gap-1 md:flex" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.targetId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 text-[13px] transition-colors",
                      "text-[var(--text-secondary)]",
                      "hover:text-[var(--text-primary)]",
                      isActive && "text-[var(--text-primary)]",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-px bg-[var(--text-primary)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="#contact"
                className="rounded-full bg-[var(--accent-glow)] px-4 py-1.5 text-[13px] font-medium text-[var(--bg-base)] transition-opacity hover:opacity-90"
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
                className="absolute h-px w-5 bg-white"
                animate={isDrawerOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.span
                layout={false}
                className="absolute h-px w-5 bg-white"
                animate={isDrawerOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                layout={false}
                className="absolute h-px w-5 bg-white"
                animate={isDrawerOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
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
              className="absolute inset-0 grid place-items-center bg-[var(--bg-base)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              <nav className="flex flex-col items-center gap-2" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    layout={false}
                    key={item.href}
                    href={item.href}
                    className="py-4 text-center text-[17px] font-normal tracking-wide text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
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
                  className="mt-6 rounded-full bg-[var(--accent-glow)] px-5 py-2 text-[13px] font-medium text-[var(--bg-base)]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Let&apos;s Talk
                </a>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
