"use client";

import { ChevronDown, Download, Redo2, Share2, Undo2 } from "lucide-react";

const ICON_BTN =
  "grid size-8 place-items-center rounded-lg text-[var(--text-dim)] transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--text)]";

export function EditorTopbar({ fileName }: { fileName: string }) {
  return (
    <header className="nav-glass relative z-30 flex h-14 shrink-0 items-center justify-between gap-4 px-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="grid size-8 shrink-0 place-items-center rounded-[10px] text-[11px] font-black tracking-tight text-[var(--on-accent)]"
          style={{ background: "linear-gradient(135deg,var(--accent),var(--accent-2))" }}
        >
          PDF
        </div>
        <div className="h-4 w-px bg-[var(--border)]" />
        <button className="flex min-w-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--accent)]/10">
          <span className="truncate">{fileName}</span>
          <ChevronDown aria-hidden className="size-3.5 shrink-0 text-[var(--text-dim)]" />
        </button>
        <span className="hidden items-center gap-1.5 text-[11.5px] text-[var(--text-dim)] sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Saved locally
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button className={ICON_BTN} title="Undo">
          <Undo2 aria-hidden className="size-4" />
        </button>
        <button className={ICON_BTN} title="Redo">
          <Redo2 aria-hidden className="size-4" />
        </button>
        <div className="mx-1 h-4 w-px bg-[var(--border)]" />
        <button className="glass-btn hidden h-8 items-center gap-1.5 rounded-lg px-3 text-[12.5px] font-semibold sm:flex">
          <Share2 aria-hidden className="size-3.5" />
          Share
        </button>
        <button
          className="shimmer flex h-8 items-center gap-1.5 rounded-lg px-3.5 text-[12.5px] font-bold text-[var(--on-accent)]"
          style={{ background: "linear-gradient(135deg,var(--accent),var(--accent-2))" }}
        >
          <Download aria-hidden className="size-3.5" />
          Export
        </button>
      </div>
    </header>
  );
}
