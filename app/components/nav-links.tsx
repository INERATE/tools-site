"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const LINK = "rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-dim)] transition-all hover:bg-[var(--glass-bg)] hover:text-[var(--text)]";

/** Search and appearance moved to the bottom Dock — this keeps brand wayfinding + links only. */
export function NavLinks() {
  return (
    <>
      <nav className="hidden items-center gap-1 md:flex">
        <Link href="/all-tools" className={LINK}>
          All Tools
        </Link>
        <Link href="#demo-stage" className={`flex items-center gap-1 ${LINK}`}>
          <Sparkles className="size-3.5 text-[var(--accent)]" />
          Live Simulator
        </Link>
        <a href="https://forge.inerate.com" target="_blank" rel="noopener noreferrer" className={LINK}>
          Forge
        </a>
        <a href="https://github.com/inerate" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 ${LINK}`}>
          GitHub
          <ArrowUpRight className="size-3 opacity-60" />
        </a>
      </nav>

      <Link href="/pdf-merger" className="clay flex h-8.5 items-center gap-1 px-3.5 text-[12px] font-semibold tracking-wide transition-all cursor-pointer">
        <span className="whitespace-nowrap">Launch PDF</span>
        <ArrowUpRight className="size-3.5 stroke-[2.5]" />
      </Link>
    </>
  );
}
