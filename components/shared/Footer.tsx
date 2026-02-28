const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "AI", href: "#ai" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-base)] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
        <a
          href="#top"
         
          className="font-mono text-[18px] font-medium tracking-tight"
        >
          <span className="gradient-text">Heitinder Singh</span>
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
             
              className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-[var(--text-muted)]">
          © 2026 Heitinder Singh · Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
