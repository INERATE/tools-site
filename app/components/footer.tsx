import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TOOLS } from "./tool-list";

const PRODUCT = TOOLS.filter((t) => t.live).slice(0, 6);
const COMPANY = [
  { label: "All tools", href: "/all-tools" },
  { label: "Forge (open source)", href: "https://forge.inerate.com", external: true },
  { label: "GitHub", href: "https://github.com/inerate", external: true },
];
const LEGAL = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

/** Site-wide footer — the page had nothing after the storytelling section, reading as unfinished. */
export function Footer() {
  return (
    <footer className="glass mt-24 rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
      <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <span className="text-[15px] font-bold tracking-[0.1em] text-[var(--text)] uppercase">
            Inerate <span className="text-[var(--accent)]">Tools</span>
          </span>
          <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-[var(--text-dim)]">
            {TOOLS.length}+ document and image tools, every one running entirely in your browser. Nothing is ever
            uploaded, no server queue, no telemetry.
          </p>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-[var(--text-dim)] uppercase">Tools</p>
          <ul className="flex flex-col gap-2">
            {PRODUCT.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="text-[13.5px] text-[var(--text-dim)] transition-colors hover:text-[var(--text)]">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-[var(--text-dim)] uppercase">Company</p>
          <ul className="flex flex-col gap-2">
            {COMPANY.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1 text-[13.5px] text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
                >
                  {c.label}
                  {c.external && <ArrowUpRight className="size-3 opacity-60" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-[var(--text-dim)] uppercase">Legal</p>
          <ul className="flex flex-col gap-2">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13.5px] text-[var(--text-dim)] transition-colors hover:text-[var(--text)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-[12px] text-[var(--text-dim)] sm:flex-row">
        <span>&copy; {new Date().getFullYear()} Inerate Tools. All processing happens on your device.</span>
        <span>Built by Inerate</span>
      </div>
    </footer>
  );
}
