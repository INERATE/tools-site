"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { NavLinks } from "./nav-links";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  // position:fixed, not sticky — guaranteed pinned to the viewport regardless
  // of any scroll/overflow context a given page wraps it in. Wide rounded
  // bar at the top of the page, morphs into a narrower pill once scrolled —
  // same two-state pattern as the GrowthCharters marketing nav.
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(scrollY > 80);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4">
      <motion.div
        initial={false}
        animate={condensed ? "pill" : "bar"}
        variants={{
          bar: { marginTop: 12, maxWidth: 880, borderRadius: 999 },
          pill: { marginTop: 12, maxWidth: 210, borderRadius: 999 },
        }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        style={{ willChange: "max-width, border-radius, margin-top" }}
        data-condensed={condensed}
        className="nav-glass flex w-full items-center justify-between px-4 py-2.5 sm:px-5"
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] shadow-[0_2px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105">
            <Image src="/icon.png" alt="Inerate Tools Logo" width={36} height={36} className="h-full w-full object-cover" priority />
          </div>
          <motion.div
            animate={{ opacity: condensed ? 0 : 1, width: condensed ? 0 : "auto" }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="flex flex-col overflow-hidden whitespace-nowrap"
          >
            <span className="flex items-center gap-1 text-[13px] font-bold tracking-[0.14em] text-[var(--text)] uppercase">
              Inerate
              <span className="bg-[linear-gradient(100deg,var(--accent),var(--accent-2)_50%,var(--accent-3))] bg-clip-text text-transparent">
                Tools
              </span>
            </span>
            <span className="text-[9px] font-medium tracking-[0.08em] text-[var(--text-dim)] uppercase">100% Client-Side</span>
          </motion.div>
        </Link>

        <NavLinks condensed={condensed} />
      </motion.div>
    </header>
  );
}
