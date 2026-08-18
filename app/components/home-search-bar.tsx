"use client";

import { Search } from "lucide-react";
import { useSearchContext } from "./search-context";

/** The homepage's large "search every tool" bar — a premium, unmissable entry point below the hero. */
export function HomeSearchBar() {
  const { openSearch } = useSearchContext();
  return (
    <button
      type="button"
      onClick={openSearch}
      className="glass mx-auto flex h-14 w-full max-w-xl items-center gap-3 rounded-full px-6 text-left transition-all hover:border-[var(--accent)]/40 hover:shadow-[0_8px_30px_-8px_var(--glow)]"
    >
      <Search className="size-4.5 shrink-0 text-[var(--text-dim)]" />
      <span className="flex-1 text-[14.5px] text-[var(--text-dim)]">Search every tool — merge, compress, sign…</span>
      <kbd className="hidden rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-dim)] sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}
