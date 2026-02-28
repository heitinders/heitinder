"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function MagneticLink() {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);

      if (distance > 80) {
        gsap.to(node, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
        return;
      }

      gsap.to(node, {
        x: dx * 0.16,
        y: dy * 0.16,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const reset = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    node.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", reset);
    };
  }, [prefersReducedMotion]);

  return (
    <a
      ref={ref}
      href="mailto:heitinder.js@gmail.com"

      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-10 py-5 text-base font-semibold text-white shadow-[0_16px_36px_rgba(109,40,217,0.26)]"
    >
      Send a Message <span aria-hidden>→</span>
    </a>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/heitinder.js@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: new FormData(e.currentTarget).get("name"),
          email: new FormData(e.currentTarget).get("email"),
          message: new FormData(e.currentTarget).get("message"),
          _subject: `Portfolio Inquiry from ${new FormData(e.currentTarget).get("name")}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }, []);

  if (status === "success") {
    return (
      <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/5 px-6 py-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
          <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-[var(--text-primary)]">Message sent!</p>
        <p className="text-sm text-[var(--text-secondary)]">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-[var(--accent-glow)] transition-colors hover:text-[var(--accent-secondary)]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-4">
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          disabled={status === "sending"}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none disabled:opacity-50"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          disabled={status === "sending"}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none disabled:opacity-50"
        />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Tell me about your project..."
        disabled={status === "sending"}
        className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none disabled:opacity-50"
      />
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(109,40,217,0.25)] transition-shadow hover:shadow-[0_10px_36px_rgba(109,40,217,0.35)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section id="contact" ref={ref} className="relative flex min-h-screen items-center py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(109,40,217,0.06) 0%, rgba(109,40,217,0.03) 40%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-[1] mx-auto flex w-full max-w-[800px] flex-col items-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase"
        >
          06 / CONTACT
        </motion.p>

        <motion.div variants={itemVariants} className="mt-6">
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-[var(--text-primary)]">
            Need a senior
          </h2>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-[var(--text-primary)]">
            engineer who
          </h2>
          <h2 className="gradient-text text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] italic">
            ships?
          </h2>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-[520px] text-[16px] leading-[1.7] text-[var(--text-secondary)]"
        >
          Open to senior frontend engineering contracts, AI product collaborations,
          and technical advisory roles. Based in NYC/NJ, available globally.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7"
        >
          <a
            href="mailto:heitinder.js@gmail.com"

            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <Mail size={16} />
            <span>heitinder.js@gmail.com</span>
          </a>
          <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <MapPin size={16} />
            <span>NYC / NJ Area</span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 h-px w-full max-w-[620px] bg-gradient-to-r from-transparent via-[var(--accent-glow)] to-transparent"
        />

        <motion.div variants={itemVariants} className="mt-8 w-full max-w-[520px]">
          <ContactForm />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <span className="text-sm text-[var(--text-muted)]">or reach out directly</span>
          <div className="flex items-center gap-3">
            <MagneticLink />
            <a
              href="https://www.linkedin.com/in/heitinder-singh-23107718a/"
              target="_blank"
              rel="noopener noreferrer"

              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-7 py-4 text-sm font-medium text-[var(--text-primary)]",
                "transition-colors hover:border-[var(--accent-glow)]",
              )}
            >
              LinkedIn <span aria-hidden>↗</span>
            </a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-6">
          {[
            {
              label: "GitHub",
              href: "https://github.com/heitinders",
              icon: Github,
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/heitinder-singh-23107718a/",
              icon: Linkedin,
            },
            {
              label: "Email",
              href: "mailto:heitinder.js@gmail.com",
              icon: Mail,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={item.label}

                className="text-[var(--text-muted)] transition duration-200 hover:scale-110 hover:text-[var(--text-primary)]"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
