"use client";

import { RotateCw, Trash2, Undo2 } from "lucide-react";
import type { PageOp } from "../hooks/use-page-ops";

const CTL =
  "pointer-events-auto grid size-5 place-items-center rounded-md bg-[var(--bg-raised)] text-[var(--text-dim)] " +
  "shadow-sm transition-colors hover:text-[var(--text)]";

export function PageThumb({
  index, active, op, url, onPick, onRotate, onToggleDelete,
}: {
  index: number;
  active: boolean;
  op: PageOp;
  url?: string;
  onPick: (i: number) => void;
  onRotate: (i: number) => void;
  onToggleDelete: (i: number) => void;
}) {
  return (
    <div className="group relative">
      <button onClick={() => onPick(index)} className="w-full text-left">
        <div
          className={`aspect-[3/4] overflow-hidden rounded-lg border transition-all ${
            op.deleted
              ? "border-[#ff8fa3]/50 opacity-35"
              : active
                ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/30"
                : "border-[var(--border)] group-hover:border-[var(--accent)]/50"
          }`}
          style={{ background: "linear-gradient(160deg,#fff,#eceaf5)" }}
        >
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt={`Page ${index + 1}`}
              className="size-full object-cover object-top transition-transform"
              style={{ transform: `rotate(${op.rotate}deg)` }}
            />
          ) : (
            <div className="flex h-full flex-col gap-[3px] p-2">
              <div className="h-1.5 w-3/4 rounded-full bg-[#3b3654]/70" />
              <div className="h-[3px] w-full rounded-full bg-[#3b3654]/20" />
              <div className="mt-1 h-6 w-full rounded bg-[#3b3654]/12" />
            </div>
          )}
        </div>
        <div className={`mt-1 text-center text-[10.5px] ${active ? "font-semibold text-[var(--accent)]" : "text-[var(--text-dim)]"}`}>
          {index + 1}
        </div>
      </button>

      <div className="pointer-events-none absolute top-1 right-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button className={CTL} title="Rotate 90°" onClick={() => onRotate(index)}>
          <RotateCw aria-hidden className="size-3" />
        </button>
        <button
          className={CTL}
          title={op.deleted ? "Keep this page" : "Delete this page"}
          onClick={() => onToggleDelete(index)}
        >
          {op.deleted ? <Undo2 aria-hidden className="size-3" /> : <Trash2 aria-hidden className="size-3" />}
        </button>
      </div>
    </div>
  );
}
