import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
        404
      </p>
      <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1] tracking-[-0.03em] text-[var(--text-primary)]">
        Page not found
      </h1>
      <p className="mt-4 max-w-[400px] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d28d9] to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(109,40,217,0.25)] transition-shadow hover:shadow-[0_12px_40px_rgba(109,40,217,0.35)]"
      >
        Back to home
      </Link>
    </section>
  );
}
