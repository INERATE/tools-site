"use client";

import { Grid3x3, Hand, Minus, MousePointer2, Plus } from "lucide-react";

const BTN = "grid size-7 place-items-center rounded-lg text-[var(--text-dim)] transition-colors hover:bg-[var(--accent)]/15 hover:text-[var(--text)]";
const DIV = <div className="h-3.5 w-px bg-[var(--border)]" />;

export function FloatingDock({
  page, pages, onPage,
}: {
  page: number; pages: number; onPage: (i: number) => void;
}) {
  return (
    <div className="glass pointer-events-auto absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px]">
      <button className={`${BTN} relative z-2`} title="Pan">
        <Hand aria-hidden className="size-3.5" />
      </button>
      <button className="relative z-2 grid size-7 place-items-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]" title="Select">
        <MousePointer2 aria-hidden className="size-3.5" />
      </button>
      {DIV}
      <button onClick={() => onPage(Math.max(0, page - 1))} className={`${BTN} relative z-2`}>
        <Minus aria-hidden className="size-3" />
      </button>
      <span className="relative z-2 font-mono whitespace-nowrap">
        {page + 1} / {pages}
      </span>
      <button onClick={() => onPage(Math.min(pages - 1, page + 1))} className={`${BTN} relative z-2`}>
        <Plus aria-hidden className="size-3" />
      </button>
      {DIV}
      <button className={`${BTN} relative z-2`} title="Grid view">
        <Grid3x3 aria-hidden className="size-3.5" />
      </button>
    </div>
  );
}
