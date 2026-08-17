"use client";

import { ChevronLeft, ChevronRight, Eraser } from "lucide-react";

const NAV =
  "grid size-9 cursor-pointer place-items-center rounded-full border border-[var(--border)] " +
  "text-[var(--text-dim)] transition-[color,border-color,transform] duration-200 " +
  "hover:border-[var(--accent)] hover:text-[var(--text)] active:scale-95 disabled:opacity-30";
const SEG = "h-8 cursor-pointer rounded-full px-3.5 text-[12.5px] font-semibold transition-colors";

/** Page stepper, cover scope, cover colour. */
export function CleanControls({
  index,
  pages,
  everyPage,
  dark,
  boxes,
  onIndex,
  onEveryPage,
  onDark,
  onClear,
}: {
  index: number;
  pages: number;
  everyPage: boolean;
  dark: boolean;
  boxes: number;
  onIndex: (i: number) => void;
  onEveryPage: (v: boolean) => void;
  onDark: (v: boolean) => void;
  onClear: () => void;
}) {
  const seg = (on: boolean) =>
    `${SEG} ${on ? "bg-[var(--accent)] text-[var(--on-accent)]" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2.5">
      <div className="flex items-center gap-2">
        <button type="button" className={NAV} disabled={index === 0} onClick={() => onIndex(index - 1)} aria-label="Previous page">
          <ChevronLeft aria-hidden className="size-4" />
        </button>
        <span className="min-w-[5.5rem] text-center text-[13px] font-medium tabular-nums">
          Page {index + 1} of {pages}
        </span>
        <button type="button" className={NAV} disabled={index >= pages - 1} onClick={() => onIndex(index + 1)} aria-label="Next page">
          <ChevronRight aria-hidden className="size-4" />
        </button>
      </div>

      <div className="ml-auto inline-flex rounded-full border border-[var(--border)] p-1">
        <button type="button" aria-pressed={everyPage} className={seg(everyPage)} onClick={() => onEveryPage(true)}>
          Every page
        </button>
        <button type="button" aria-pressed={!everyPage} className={seg(!everyPage)} onClick={() => onEveryPage(false)}>
          This page
        </button>
      </div>

      <div className="inline-flex rounded-full border border-[var(--border)] p-1">
        <button type="button" aria-pressed={!dark} className={seg(!dark)} onClick={() => onDark(false)}>
          White
        </button>
        <button type="button" aria-pressed={dark} className={seg(dark)} onClick={() => onDark(true)}>
          Black
        </button>
      </div>

      {boxes > 0 && (
        <button type="button" onClick={onClear} className={`${SEG} flex items-center gap-1.5 border border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]`}>
          <Eraser aria-hidden className="size-3.5" />
          Clear {boxes}
        </button>
      )}
    </div>
  );
}
