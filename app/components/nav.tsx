import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <header className="glass sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase">
          Inerate <span className="text-[var(--accent)]">Tools</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[var(--text-dim)]">
          <a href="https://forge.inerate.com" className="hover:text-[var(--text)] transition-colors">
            Forge
          </a>
          <a
            href="https://github.com/inerate"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
