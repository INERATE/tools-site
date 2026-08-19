"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SearchLauncher } from "./search-launcher";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="nav-glass flex items-center justify-between px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-300">
        {/* Brand Logo with Official Favicon */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative size-8.5 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] shadow-[0_2px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/icon.png"
              alt="Inerate Tools Logo"
              width={34}
              height={34}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[13px] font-bold tracking-[0.14em] text-[var(--text)] uppercase">
              Inerate
              <span className="bg-[linear-gradient(100deg,var(--accent),var(--accent-2)_50%,var(--accent-3))] bg-clip-text text-transparent">
                Tools
              </span>
            </span>
            <span className="text-[9px] font-medium tracking-[0.08em] text-[var(--text-dim)] uppercase">
              100% Client-Side
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/all-tools"
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
          <div className="hidden sm:block">
            <SearchLauncher />
          </div>
          <ThemeToggle />

          <Link
            href="/pdf-merger"
            className="clay flex h-8.5 items-center gap-1 px-3.5 text-[12px] font-semibold tracking-wide transition-all cursor-pointer"
          >
            <span className="whitespace-nowrap">Launch PDF</span>
            <ArrowUpRight className="size-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
