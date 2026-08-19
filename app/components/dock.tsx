"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Home, LayoutGrid } from "lucide-react";
import { DockSearchIcon } from "./icons/dock-search-icon";
import { ThemeToggle } from "./theme-toggle";
import { useSearchContext } from "./search-context";

const LIFT = { type: "spring", bounce: 0.4, duration: 0.3 } as const;

/** Bottom-floating macOS/iOS app dock with search, quick navigation, and appearance controls. */
export function Dock() {
  const { openSearch } = useSearchContext();
  const [searchHot, setSearchHot] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAllTools = pathname === "/all-tools";

  return (
    <div className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-5 sm:px-4 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="nav-glass flex items-center gap-1 p-1 sm:gap-2 sm:px-2.5 sm:py-1.5 shadow-2xl">
        {/* Mobile Quick Home Link */}
        <Link
          href="/"
          aria-label="Home"
          title="Home"
          className={`grid size-10 place-items-center rounded-full transition-all sm:hidden ${
            isHome
              ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-md"
              : "text-[var(--text-dim)] hover:bg-[var(--glass-hi)] hover:text-[var(--text)] active:scale-95"
          }`}
        >
          <Home className="size-4.5" />
        </Link>

        {/* Search Bar Pill Trigger */}
        <motion.button
          type="button"
          onClick={openSearch}
          onPointerEnter={() => setSearchHot(true)}
          onPointerLeave={() => setSearchHot(false)}
          whileHover={{ scale: 1.015, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={LIFT}
          aria-label="Search tools (⌘K)"
          title="Search tools (⌘K)"
          className="group flex h-10 flex-1 sm:flex-initial sm:w-64 md:w-80 items-center gap-2 rounded-full px-3 sm:px-3.5 text-left transition-all hover:bg-[var(--glass-hi)]/50 active:bg-[var(--glass-hi)]/70"
        >
          <DockSearchIcon
            active={searchHot}
            size={17}
            className="shrink-0 text-[var(--text-dim)] transition-colors group-hover:text-[var(--accent)]"
          />
          <span className="flex-1 truncate text-[12.5px] sm:text-[13px] text-[var(--text-dim)] transition-colors group-hover:text-[var(--text)]">
            <span className="hidden md:inline">Search every tool — merge, compress, sign…</span>
            <span className="inline md:hidden">Search 40+ tools…</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)]/60 px-2 py-0.5 text-[10px] font-semibold text-[var(--text-dim)] transition-colors group-hover:border-[var(--accent)]/40 group-hover:text-[var(--text)]">
            ⌘K
          </kbd>
        </motion.button>

        {/* Mobile All Tools Directory Link */}
        <Link
          href="/all-tools"
          aria-label="All Tools"
          title="All Tools"
          className={`grid size-10 place-items-center rounded-full transition-all sm:hidden ${
            isAllTools
              ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-md"
              : "text-[var(--text-dim)] hover:bg-[var(--glass-hi)] hover:text-[var(--text)] active:scale-95"
          }`}
        >
          <LayoutGrid className="size-4.5" />
        </Link>

        <div className="h-5 w-px bg-[var(--border)] shrink-0" aria-hidden />

        {/* Appearance Theme Toggle */}
        <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.92 }} transition={LIFT}>
          <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
}
