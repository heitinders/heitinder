"use client";

import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { type FormEvent, useCallback, useRef, useState } from "react";

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
    <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <div>
        <label htmlFor="contact-name" className="sr-only">Your name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          placeholder="Your name"
          disabled={status === "sending"}
          className="w-full border-b border-[var(--border)] bg-transparent py-3 text-[17px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="sr-only">Your email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          placeholder="Your email"
          disabled={status === "sending"}
          className="w-full border-b border-[var(--border)] bg-transparent py-3 text-[17px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Tell me about your project..."
          disabled={status === "sending"}
          className="w-full resize-none border-b border-[var(--border)] bg-transparent py-3 text-[17px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none disabled:opacity-50"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--accent-glow)] py-4 text-sm font-semibold text-[var(--bg-base)] disabled:opacity-60"
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
    <section id="contact" ref={ref} className="py-20 sm:py-28 lg:py-36">
      <motion.div
        className="mx-auto max-w-2xl px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.p
          variants={itemVariants}
          className="text-[13px] font-mono font-medium uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4"
        >
          06 / CONTACT
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-[clamp(2rem,5vw,3.5rem)] font-[700] leading-[1.07] tracking-[-0.025em] text-[var(--text-primary)]"
        >
          Need a senior engineer who{" "}
          <span className="gradient-text italic">ships?</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-[17px] leading-[1.47] tracking-[-0.01em] text-[var(--text-secondary)]"
        >
          Open to senior frontend engineering contracts, AI product collaborations,
          and technical advisory roles. Based in NYC/NJ, available globally.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 w-full max-w-md mx-auto text-left">
          <ContactForm />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-6">
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
                rel={item.href.startsWith("http") ? "me noopener noreferrer" : undefined}
                aria-label={item.label}
                className="text-[var(--text-muted)] transition duration-200 hover:text-[var(--text-primary)]"
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
