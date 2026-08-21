"use client";

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSearchContext } from "./search-context";
import { useLockBodyScroll } from "../lib/use-lock-body-scroll";
import { SearchResults } from "./search-results";
import { TOOLS } from "./tool-list";

/**
 * The full-screen command-palette: type to live-filter every tool by
 * name/description, arrow keys + Enter to jump, Esc or a backdrop click to
 * close. Mounted once (in SearchProvider's tree); any trigger opens it via
 * useSearchContext().
 */
export function SearchOverlay() {
  const { open, setOpen } = useSearchContext();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  
  // 1. Deduplicate TOOLS by href so no tool ever repeats
  const uniqueTools = Array.from(new Map(TOOLS.map((t) => [t.href, t])).values());

  // 2. Score relevance so exact/title matches (e.g. "PDF Editor") rank highest
  const matches = !q
    ? uniqueTools
    : uniqueTools
        .map((t) => {
          const title = t.title.toLowerCase();
          const desc = t.description.toLowerCase();
          const cat = t.category.toLowerCase();
          const href = t.href.toLowerCase();
          const kw = ((t as { keywords?: string }).keywords || "").toLowerCase();

          let score = 0;
          if (title === q) score += 300;
          else if (title.startsWith(q)) score += 150;
          else if (title.includes(q)) score += 100;
          else if (href.includes(q)) score += 70;
          else if (cat.includes(q)) score += 40;
          else if (desc.includes(q)) score += 25;
          else if (kw.includes(q)) score += 15;

          return { tool: t, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.tool);

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-3 pt-6 sm:px-4 sm:pt-[10vh] backdrop-blur-md"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.32 }}
            onClick={(e) => e.stopPropagation()}
            className="glass flex max-h-[85vh] sm:max-h-[78vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex shrink-0 items-center gap-2.5 border-b border-[var(--border)] px-4 py-3 sm:py-3.5">
              <Search className="size-4 shrink-0 text-[var(--text-dim)]" />
              <input
                ref={inputRef}
                type="search"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
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
                className="w-full bg-transparent text-[15px] sm:text-[14.5px] text-[var(--text)] outline-none placeholder:text-[var(--text-dim)]"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-full text-[var(--text-dim)] transition-colors hover:bg-[var(--glass-hi)] hover:text-[var(--text)]"
              >
                <X className="size-4" />
              </button>
            </div>

            <SearchResults matches={matches} active={active} setActive={setActive} query={query} onPick={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
