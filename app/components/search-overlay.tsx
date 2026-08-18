"use client";

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSearchShortcut } from "../lib/use-search-shortcut";
import { SearchResults } from "./search-results";
import { TOOLS } from "./tool-list";

/**
 * The Nav's search pill + the full-screen command-palette it opens: type to
 * live-filter every tool by name/description, arrow keys + Enter to jump,
 * Esc or a backdrop click to close. Cmd/Ctrl+K opens it from anywhere.
 */
export function SearchLauncher() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = TOOLS.filter((t) =>
    `${t.title} ${t.description} ${t.category}`.toLowerCase().includes(query.toLowerCase()),
  );

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  useSearchShortcut(setOpen, close);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass-btn flex h-8.5 items-center gap-2 px-3 text-[12px] font-medium text-[var(--text-dim)] transition-all hover:text-[var(--text)]"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Search tools</span>
        <kbd className="hidden rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] sm:inline">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-[14vh] backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", bounce: 0, duration: 0.32 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-lg overflow-hidden rounded-2xl"
            >
              <div className="flex items-center gap-2.5 border-b border-[var(--border)] px-4 py-3">
                <Search className="size-4 shrink-0 text-[var(--text-dim)]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, matches.length - 1));
                    if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
                  }}
                  placeholder="Search every tool…"
                  className="w-full bg-transparent text-[14.5px] text-[var(--text)] outline-none placeholder:text-[var(--text-dim)]"
                />
                <button type="button" onClick={close} aria-label="Close">
                  <X className="size-4 text-[var(--text-dim)]" />
                </button>
              </div>

              <SearchResults matches={matches} active={active} setActive={setActive} query={query} onPick={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
