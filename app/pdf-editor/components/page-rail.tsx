"use client";

import { Bookmark, FileText, Layers, MessageSquare, PenTool } from "lucide-react";
import type { PageOp } from "../hooks/use-page-ops";
import { PageThumb } from "./page-thumb";

const RAIL = [
  { icon: FileText, label: "Pages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: MessageSquare, label: "Comments" },
  { icon: Layers, label: "Layers" },
  { icon: PenTool, label: "Signatures" },
];

const BLANK: PageOp = { rotate: 0, deleted: false };

export function PageRail({
  pages, active, onPick, thumbs = [], opFor, onRotate, onToggleDelete, deleted = 0,
}: {
  pages: number;
  active: number;
  onPick: (i: number) => void;
  thumbs?: { index: number; url: string }[];
  opFor?: (i: number) => PageOp;
  onRotate?: (i: number) => void;
  onToggleDelete?: (i: number) => void;
  deleted?: number;
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

        {deleted > 0 && (
          <p className="rounded-lg bg-[#ff8fa3]/10 px-2 py-1 text-[10.5px] text-[#ff8fa3]">
            {deleted} page{deleted === 1 ? "" : "s"} will be removed on export.
          </p>
        )}

        {Array.from({ length: pages }, (_, i) => (
          <PageThumb
            key={i}
            index={i}
            active={i === active}
            op={opFor?.(i) ?? BLANK}
            url={thumbs[i]?.url}
            onPick={onPick}
            onRotate={onRotate ?? (() => {})}
            onToggleDelete={onToggleDelete ?? (() => {})}
          />
        ))}
      </div>
    </aside>
  );
}
