"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const LINK = "rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-dim)] transition-all hover:bg-[var(--glass-bg)] hover:text-[var(--text)]";

/**
 * Search and appearance moved to the bottom Dock — this keeps brand wayfinding + links only.
 * The link row collapses away when the pill condenses (matches the GrowthCharters reference:
 * only logo + one CTA survive the shrink) — at the condensed 680px width, all four links plus
 * Launch PDF genuinely do not fit, and previously overflowed the pill onto the page below it.
 */
export function NavLinks({ condensed }: { condensed: boolean }) {
  return (
    <>
      <motion.nav
        animate={{ opacity: condensed ? 0 : 1, width: condensed ? 0 : "auto" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden items-center gap-1 overflow-hidden md:flex"
      >
        <Link href="/all-tools" className={`${LINK} whitespace-nowrap`}>
          All Tools
        </Link>
        <Link href="/#demo-stage" className={`flex items-center gap-1 whitespace-nowrap ${LINK}`}>
          <Sparkles className="size-3.5 text-[var(--accent)]" />
          Live Simulator
        </Link>
        <a href="https://forge.inerate.com" target="_blank" rel="noopener noreferrer" className={`${LINK} whitespace-nowrap`}>
          Forge
        </a>
        <a href="https://github.com/inerate" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 whitespace-nowrap ${LINK}`}>
          GitHub
          <ArrowUpRight className="size-3 opacity-60" />
        </a>
      </motion.nav>

      <Link
        href="/pdf-merger"
        className="clay shimmer flex h-8.5 items-center gap-1 px-3.5 text-[12px] font-semibold tracking-wide transition-all cursor-pointer"
      >
        <span className="whitespace-nowrap">Launch PDF</span>
        <ArrowUpRight className="size-3.5 stroke-[2.5]" />
      </Link>
    </>
  );
}
