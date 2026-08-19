"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { NavLinks } from "./nav-links";

export function Nav() {
  // position:fixed, not sticky — guaranteed pinned to the viewport regardless
  // of any scroll/overflow context a given page wraps it in. Compacts and
  // gains a stronger shadow as the page scrolls, so it reads as "in control"
  // rather than a static bar that just happens to stay put.
  const { scrollY } = useScroll();
  const pad = useTransform(scrollY, [0, 120], [10, 6]);
  const shadow = useTransform(
    scrollY,
    [0, 120],
    ["0 20px 50px -15px rgba(0,0,0,0.25), 0 6px 18px -4px rgba(0,0,0,0.12)", "0 24px 60px -12px rgba(0,0,0,0.35), 0 8px 22px -4px rgba(0,0,0,0.2)"],
  );

  return (
    <header className="fixed inset-x-0 top-4 z-40 mx-auto w-full max-w-5xl px-4 sm:px-6">
      <motion.div
        style={{ paddingTop: pad, paddingBottom: pad, boxShadow: shadow }}
        className="nav-glass flex items-center justify-between px-4 sm:px-5"
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative size-8.5 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] shadow-[0_2px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105">
            <Image src="/icon.png" alt="Inerate Tools Logo" width={34} height={34} className="h-full w-full object-cover" priority />
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[13px] font-bold tracking-[0.14em] text-[var(--text)] uppercase">
              Inerate
              <span className="bg-[linear-gradient(100deg,var(--accent),var(--accent-2)_50%,var(--accent-3))] bg-clip-text text-transparent">
                Tools
              </span>
            </span>
            <span className="text-[9px] font-medium tracking-[0.08em] text-[var(--text-dim)] uppercase">100% Client-Side</span>
          </div>
        </Link>

        <NavLinks />
      </motion.div>
    </header>
  );
}
