"use client";

import { History, X } from "lucide-react";

const ago = (ts: number) => {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return "moments ago";
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  return `${h} hour${h === 1 ? "" : "s"} ago`;
};

/**
 * Offers the previous session back after a refresh. Deliberately explicit
 * rather than silently reopening: the document is on this device's disk now,
 * which the user should know and be able to undo in one click.
 */
export function RestoreBanner({
  savedAt, onRestore, onDiscard,
}: {
  savedAt: number;
  onRestore: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="absolute inset-x-0 top-4 z-40 mx-auto w-[min(560px,92%)]">
      <div className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-white px-4 py-3 shadow-lg">
        <History aria-hidden className="size-4 shrink-0 text-indigo-600" />
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-semibold text-slate-900">Unfinished document from {ago(savedAt)}</p>
          <p className="text-[11.5px] text-slate-500">Saved on this device only. It was never uploaded.</p>
        </div>
        <button
          onClick={onRestore}
          className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-indigo-700"
        >
          Restore
        </button>
        <button
          onClick={onDiscard}
          aria-label="Discard saved document"
          title="Discard saved document"
          className="grid size-7 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X aria-hidden className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
