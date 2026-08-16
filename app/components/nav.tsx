import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

/* Underline wipes in from the left on hover — transform only, no layout. */
const LINK =
  "relative flex h-11 items-center transition-colors hover:text-[var(--text)] " +
  "after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 " +
  "after:bg-[linear-gradient(90deg,var(--accent),var(--accent-3))] after:transition-transform " +
  "after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none";

export function Nav() {
  // Same material as .glass, minus its rounded ring — a bar has no corners.
  return (
    <header className="sticky top-0 z-20 bg-[var(--glass-bg)] backdrop-blur-[24px] backdrop-saturate-[180%]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex h-11 items-center text-sm font-semibold tracking-[0.2em] uppercase">
          Inerate{" "}
          <span className="ml-[0.4em] bg-[linear-gradient(100deg,var(--accent),var(--accent-2)_50%,var(--accent-3))] bg-clip-text text-transparent">
            Tools
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--text-dim)]">
          <a href="https://forge.inerate.com" className={LINK}>
            Forge
          </a>
          <a href="https://github.com/inerate" target="_blank" rel="noopener noreferrer" className={LINK}>
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
      {/* Iridescent hairline: the only thing separating the bar from the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-70 bg-[linear-gradient(90deg,transparent,var(--accent),var(--accent-2),var(--accent-3),transparent)]"
      />
    </header>
  );
}
