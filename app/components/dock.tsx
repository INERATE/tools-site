"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DockSearchIcon } from "./icons/dock-search-icon";
import { ThemeToggle } from "./theme-toggle";
import { useSearchContext } from "./search-context";

const LIFT = { type: "spring", bounce: 0.4, duration: 0.3 } as const;

/** Bottom-floating macOS-dock-style search + appearance controls, split out of the top nav. */
export function Dock() {
  const { openSearch } = useSearchContext();
  const [searchHot, setSearchHot] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <div className="nav-glass flex items-center gap-1.5 px-2.5 py-2">
        <motion.button
          type="button"
          onClick={openSearch}
          onPointerEnter={() => setSearchHot(true)}
          onPointerLeave={() => setSearchHot(false)}
          whileHover={{ scale: 1.15, y: -4 }}
          transition={LIFT}
          aria-label="Search tools"
          title="Search tools (⌘K)"
          className="grid size-11 place-items-center rounded-full text-[var(--text-dim)] transition-colors hover:text-[var(--accent)]"
        >
          <DockSearchIcon active={searchHot} size={20} />
        </motion.button>

        <div className="h-6 w-px bg-[var(--border)]" aria-hidden />

        <motion.div whileHover={{ scale: 1.15, y: -4 }} transition={LIFT}>
          <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
}
