"use client";

import { RotateCw, Trash2, Undo2 } from "lucide-react";
import type { PageOp } from "../hooks/use-page-ops";

const CTL =
  "pointer-events-auto grid size-6 place-items-center rounded-md bg-white text-slate-600 " +
  "shadow-md border border-slate-200/80 transition-colors hover:bg-slate-50 hover:text-slate-900";

export function PageThumb({
  index,
  active,
  op,
  url,
  onPick,
  onRotate,
  onToggleDelete,
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
          className={`aspect-[3/4] overflow-hidden rounded-lg bg-white shadow-2xs transition-all ${
            op.deleted
              ? "border border-rose-300 opacity-40"
              : active
                ? "border-2 border-indigo-600 ring-3 ring-indigo-100 shadow-sm"
                : "border border-slate-200 hover:border-indigo-400 hover:shadow-xs"
          }`}
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
            <div className="flex h-full flex-col gap-1.5 p-2.5 bg-slate-50">
              <div className="h-2 w-3/4 rounded-full bg-slate-300" />
              <div className="h-1.5 w-full rounded-full bg-slate-200" />
              <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
              <div className="mt-2 h-10 w-full rounded-md bg-slate-200/80" />
            </div>
          )}
        </div>
        <div
          className={`mt-1.5 text-center text-[11px] ${
            active ? "font-bold text-indigo-600" : "font-medium text-slate-500"
          }`}
        >
          {index + 1}
        </div>
      </button>

      {/* Hover action controls */}
      <div className="pointer-events-none absolute top-1.5 right-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button className={CTL} title="Rotate 90°" onClick={() => onRotate(index)}>
          <RotateCw className="size-3" />
        </button>
        <button
          className={CTL}
          title={op.deleted ? "Keep this page" : "Delete this page"}
          onClick={() => onToggleDelete(index)}
        >
          {op.deleted ? <Undo2 className="size-3" /> : <Trash2 className="size-3" />}
        </button>
      </div>
    </div>
  );
}
