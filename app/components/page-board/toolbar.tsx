"use client";

import { Loader2, RotateCw, Undo2 } from "lucide-react";

const CHIP =
  "flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 " +
  "text-[12.5px] font-semibold text-[var(--text-dim)] transition-[color,border-color,transform] " +
  "duration-200 hover:border-[var(--accent)] hover:text-[var(--text)] active:scale-95";

/** Count, bulk actions, and the honest loading state for the board below it. */
export function BoardToolbar({
  count,
  total,
  pending,
  onRotateAll,
  onReset,
}: {
  count: number;
  /** Pages the board started with. Reset has to stay reachable after the
      last tile is deleted, so this — not `count` — decides visibility. */
  total: number;
  pending: number;
  onRotateAll: (dir: 1 | -1) => void;
  onReset: () => void;
}) {
  if (total === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <p className="mr-auto text-[13.5px] text-[var(--text-dim)]">
        <span className="font-semibold text-[var(--text)]">{count}</span> page{count === 1 ? "" : "s"}
        {count > 0 && <span className="hidden sm:inline"> · drag to reorder</span>}
        {count === 0 && " left — press Reset to bring them back"}
      </p>

      {pending > 0 && (
        <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--text-dim)]">
          <Loader2 aria-hidden className="size-3.5 animate-spin" />
          Drawing {pending} more
        </span>
      )}

      <button type="button" className={CHIP} onClick={() => onRotateAll(1)}>
        <RotateCw aria-hidden className="size-3.5" />
        Rotate all
      </button>
      <button type="button" className={CHIP} onClick={onReset}>
        <Undo2 aria-hidden className="size-3.5" />
        Reset
      </button>
    </div>
  );
}
