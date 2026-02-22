import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-16 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="glass-card p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[0.22em] text-[var(--accent-secondary)] uppercase">
            Get In Touch
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Let&apos;s build something remarkable.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
            Open to select frontend engineering contracts, product collaborations, and
            advisory opportunities across SaaS, AI, and enterprise product teams.
          </p>

          <div className="mt-6 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <a href="mailto:heitinder.js@gmail.com" className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
              <Mail size={16} className="text-[var(--accent-secondary)]" />
              heitinder.js@gmail.com
            </a>
            <a href="tel:+13469787475" className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
              <Phone size={16} className="text-[var(--accent-secondary)]" />
              346-978-7475
            </a>
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
              <MapPin size={16} className="text-[var(--accent-secondary)]" />
              NYC / NJ / Houston
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
              <a href="https://github.com/heitindersingh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <Github size={16} /> GitHub
              </a>
              <span className="text-white/20">|</span>
              <a href="https://linkedin.com/in/heitindersingh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
