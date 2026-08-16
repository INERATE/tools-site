"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="nav-glass flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-300">
        {/* Brand Logo with Clay Jewel */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="clay relative grid size-9 shrink-0 place-items-center rounded-xl text-[var(--on-accent)] transition-transform duration-300 group-hover:scale-105">
            <Layers className="size-4.5 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-3)] opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[var(--accent-3)]" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-[13px] font-bold tracking-[0.16em] text-[var(--text)] uppercase">
              Inerate
              <span className="bg-[linear-gradient(100deg,var(--accent),var(--accent-2)_50%,var(--accent-3))] bg-clip-text text-transparent">
                Tools
              </span>
            </span>
            <span className="text-[9.5px] font-medium tracking-[0.08em] text-[var(--text-dim)] uppercase">
              100% Client-Side
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="#tools"
            className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-dim)] transition-all hover:bg-[var(--glass-bg)] hover:text-[var(--text)]"
          >
            All Tools
          </Link>
          <Link
            href="#demo-stage"
            className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-dim)] transition-all hover:bg-[var(--glass-bg)] hover:text-[var(--text)]"
          >
            <Sparkles className="size-3.5 text-[var(--accent)]" />
            Live Simulator
          </Link>
          <a
            href="https://forge.inerate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-dim)] transition-all hover:bg-[var(--glass-bg)] hover:text-[var(--text)]"
          >
            Forge
          </a>
          <a
            href="https://github.com/inerate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-dim)] transition-all hover:bg-[var(--glass-bg)] hover:text-[var(--text)]"
          >
            GitHub
            <ArrowUpRight className="size-3 opacity-60" />
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            href="/pdf-merger"
            className="clay flex h-9 items-center gap-1.5 px-4 text-[12.5px] font-semibold tracking-wide transition-all cursor-pointer"
          >
            <span>Launch PDF</span>
            <ArrowUpRight className="size-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
