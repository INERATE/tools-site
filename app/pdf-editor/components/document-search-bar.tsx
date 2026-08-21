"use client";

import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { TextBlock } from "../types";

export function DocumentSearchBar({
  blocks,
  onSelectBlock,
  onClose,
}: {
  blocks: TextBlock[];
  onSelectBlock: (id: string, pageIndex: number) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [matchIndex, setMatchIndex] = useState(0);

  const matches = query.trim()
    ? blocks.filter((b) => b.text.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    setMatchIndex(0);
    if (matches.length > 0) {
      onSelectBlock(matches[0].id, matches[0].pageIndex);
    }
  }, [query]);

  const goNext = () => {
    if (!matches.length) return;
    const next = (matchIndex + 1) % matches.length;
    setMatchIndex(next);
    onSelectBlock(matches[next].id, matches[next].pageIndex);
  };

  const goPrev = () => {
    if (!matches.length) return;
    const prev = (matchIndex - 1 + matches.length) % matches.length;
    setMatchIndex(prev);
    onSelectBlock(matches[prev].id, matches[prev].pageIndex);
  };

  return (
    <div className="absolute top-4 right-6 z-40 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-2 pl-2">
        <Search className="size-3.5 text-slate-400" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in PDF…"
          className="w-44 text-[12px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") goNext();
            if (e.key === "Escape") onClose();
          }}
        />
      </div>

      {query.trim() && (
        <span className="font-mono text-[11px] text-slate-400 px-1">
          {matches.length ? `${matchIndex + 1}/${matches.length}` : "0/0"}
        </span>
      )}

      <div className="h-4 w-px bg-slate-200" />

      <button
        onClick={goPrev}
        disabled={!matches.length}
        className="grid size-6 place-items-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30"
        title="Previous match (Shift+Enter)"
      >
        <ChevronUp className="size-3.5" />
      </button>

      <button
        onClick={goNext}
        disabled={!matches.length}
        className="grid size-6 place-items-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30"
        title="Next match (Enter)"
      >
        <ChevronDown className="size-3.5" />
      </button>

      <button
        onClick={onClose}
        className="grid size-6 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        title="Close search (Esc)"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
