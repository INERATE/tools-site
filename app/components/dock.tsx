"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DockSearchIcon } from "./icons/dock-search-icon";
import { ThemeToggle } from "./theme-toggle";
import { useSearchContext } from "./search-context";

const LIFT = { type: "spring", bounce: 0.4, duration: 0.3 } as const;

/** Bottom-floating macOS-dock-style search pill + appearance controls. */
export function Dock() {
  const { openSearch } = useSearchContext();
  const [searchHot, setSearchHot] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-5 sm:px-4 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="nav-glass flex items-center gap-1.5 p-1.5 sm:gap-2 sm:px-2.5 sm:py-1.5">
        <motion.button
          type="button"
          onClick={openSearch}
          onPointerEnter={() => setSearchHot(true)}
          onPointerLeave={() => setSearchHot(false)}
          whileHover={{ scale: 1.015, y: -2 }}
          whileTap={{ scale: 0.985 }}
          transition={LIFT}
          aria-label="Search tools (⌘K)"
          title="Search tools (⌘K)"
          className="group flex h-10 w-52 sm:w-64 md:w-80 items-center gap-2.5 rounded-full px-3.5 text-left transition-all hover:bg-[var(--glass-hi)]/40"
        >
          <DockSearchIcon
            active={searchHot}
            size={18}
            className="shrink-0 text-[var(--text-dim)] transition-colors group-hover:text-[var(--accent)]"
          />
          <span className="flex-1 truncate text-[13px] text-[var(--text-dim)] transition-colors group-hover:text-[var(--text)]">
            <span className="hidden sm:inline">Search every tool — merge, compress, sign…</span>
            <span className="inline sm:hidden">Search tools…</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)]/60 px-2 py-0.5 text-[10px] font-semibold text-[var(--text-dim)] transition-colors group-hover:border-[var(--accent)]/40 group-hover:text-[var(--text)]">
            ⌘K
          </kbd>
        </motion.button>

        <div className="h-5 w-px bg-[var(--border)]" aria-hidden />

        <motion.div whileHover={{ scale: 1.1, y: -2 }} transition={LIFT}>
          <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
}
