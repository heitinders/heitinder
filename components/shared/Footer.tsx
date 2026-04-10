const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "AI", href: "#ai" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-base)] py-8 sm:py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <a
          href="#top"
          className="text-[15px] font-medium text-[var(--text-primary)]"
          aria-label="Go to top"
        >
          Heitinder Singh
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="mt-4 text-[12px] text-[var(--text-muted)] sm:mt-0">
          &copy; 2026 Heitinder Singh
        </p>
      </div>
    </footer>
  );
}
