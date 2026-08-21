"use client";

import { History, X } from "lucide-react";

const ago = (ts: number) => {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return "a moment ago";
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  return `${h} hour${h === 1 ? "" : "s"} ago`;
};

/**
 * Confirms work was brought back, after the fact. It does not ask permission
 * first — being dropped to an empty screen to approve reopening your own
 * document defeats the point of saving it. Dismissible, and "New" in the
 * toolbar is the way to start clean.
 */
export function RestoreNotice({ savedAt, onDismiss }: { savedAt: number; onDismiss: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-lg">
        <History aria-hidden className="size-3.5 shrink-0 text-indigo-600" />
        <span className="text-[12px] text-slate-700">
          Picked up where you left off — saved on this device {ago(savedAt)}, never uploaded.
        </span>
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="grid size-5 shrink-0 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <X aria-hidden className="size-3" />
        </button>
      </div>
    </div>
  );
}
