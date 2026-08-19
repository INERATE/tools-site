"use client";

import { Search } from "lucide-react";
import { useSearchContext } from "./search-context";

/** The nav's compact search trigger. */
export function SearchLauncher() {
  const { openSearch } = useSearchContext();
  return (
    <button
      type="button"
      onClick={openSearch}
      className="glass-btn flex h-8.5 items-center gap-2 px-3 text-[12px] font-medium text-[var(--text-dim)] transition-all hover:text-[var(--text)]"
    >
      <Search className="size-3.5" />
      <span className="hidden sm:inline">Search tools</span>
      <kbd className="hidden rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] sm:inline">⌘K</kbd>
    </button>
  );
}
