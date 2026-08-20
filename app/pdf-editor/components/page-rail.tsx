"use client";

import { Bookmark, FileText, Layers, MessageSquare, PenTool, Plus } from "lucide-react";

const RAIL = [
  { icon: FileText, label: "Pages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: MessageSquare, label: "Comments" },
  { icon: Layers, label: "Layers" },
  { icon: PenTool, label: "Signatures" },
];

export function PageRail({
  pages, active, onPick,
}: {
  pages: number; active: number; onPick: (i: number) => void;
}) {
  return (
    <aside className="flex shrink-0 border-r border-[var(--border)]">
      <div className="flex flex-col items-center gap-1.5 border-r border-[var(--border)] px-1.5 py-3">
        {RAIL.map((r, i) => (
          <button
            key={r.label}
            title={r.label}
            className={`grid size-9 place-items-center rounded-xl transition-colors ${
              i === 0
                ? "bg-[var(--accent)]/15 text-[var(--accent)] ring-1 ring-[var(--accent)]/40"
                : "text-[var(--text-dim)] hover:bg-[var(--accent)]/8 hover:text-[var(--text)]"
            }`}
          >
            <r.icon aria-hidden className="size-4" />
          </button>
        ))}
      </div>

      <div className="hidden w-[168px] flex-col gap-2.5 overflow-y-auto p-3 lg:flex">
        <div className="flex items-center justify-between text-[11.5px] font-semibold">
          <span>Pages</span>
          <span className="font-mono text-[10.5px] text-[var(--text-dim)]">
            {active + 1} / {pages}
          </span>
        </div>

        {Array.from({ length: pages }, (_, i) => (
          <button key={i} onClick={() => onPick(i)} className="group text-left">
            <div
              className={`aspect-[3/4] overflow-hidden rounded-lg border transition-all ${
                i === active
                  ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/30"
                  : "border-[var(--border)] group-hover:border-[var(--accent)]/50"
              }`}
              style={{ background: "linear-gradient(160deg,#fff,#eceaf5)" }}
            >
              <div className="flex h-full flex-col gap-[3px] p-2">
                <div className="h-1.5 w-3/4 rounded-full bg-[#3b3654]/70" />
                <div className="h-[3px] w-full rounded-full bg-[#3b3654]/20" />
                <div className="h-[3px] w-full rounded-full bg-[#3b3654]/20" />
                <div className="h-[3px] w-2/3 rounded-full bg-[#3b3654]/20" />
                <div className="mt-1 h-6 w-full rounded bg-[#3b3654]/12" />
                <div className="h-[3px] w-full rounded-full bg-[#3b3654]/20" />
                <div className="h-[3px] w-4/5 rounded-full bg-[#3b3654]/20" />
              </div>
            </div>
            <div className={`mt-1 text-center text-[10.5px] ${i === active ? "font-semibold text-[var(--accent)]" : "text-[var(--text-dim)]"}`}>
              {i + 1}
            </div>
          </button>
        ))}

        <button className="glass-btn flex items-center justify-center gap-1.5 rounded-xl py-2 text-[11.5px] font-semibold">
          <Plus aria-hidden className="size-3.5" />
          Add Page
        </button>
      </div>
    </aside>
  );
}
