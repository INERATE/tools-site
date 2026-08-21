"use client";

import { Image as ImageIcon, PenTool, Square, Stamp, Trash2, Type } from "lucide-react";
import type { Annotation } from "../annotation-types";
import type { Bookmark } from "../engine/load-document";

const EMPTY = "px-2 py-6 text-center text-[11.5px] leading-relaxed text-slate-400";

const ICON = { signature: PenTool, image: ImageIcon, redact: Stamp, draw: Type } as const;
const LABEL: Record<string, string> = {
  signature: "Signature",
  image: "Image",
  redact: "Redaction",
  draw: "Drawing",
  rect: "Rectangle",
  circle: "Ellipse",
  highlight: "Highlight",
};

export function BookmarksPanel({ items, onGo }: { items: Bookmark[]; onGo: (i: number) => void }) {
  if (!items.length) {
    return (
      <p className={EMPTY}>
        This PDF has no bookmarks embedded in its metadata.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      {items.map((b, i) => (
        <button
          key={`${b.title}-${i}`}
          onClick={() => onGo(b.pageIndex)}
          className="truncate rounded-lg px-2.5 py-1.5 text-left text-[12px] font-medium text-slate-600 hover:bg-indigo-50/60 hover:text-indigo-700 transition-colors"
          style={{ paddingLeft: 8 + b.depth * 10 }}
          title={b.title}
        >
          {b.title}
          <span className="ml-1.5 font-mono text-[10.5px] text-slate-400">p{b.pageIndex + 1}</span>
        </button>
      ))}
    </div>
  );
}

/** Every placed annotation in a clean manageable list. */
export function LayersPanel({
  items,
  picked,
  onPick,
  onRemove,
}: {
  items: Annotation[];
  picked: string | null;
  onPick: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  if (!items.length) {
    return (
      <p className={EMPTY}>
        No annotations placed yet. Shapes, signatures, images, and redactions appear here.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      {items.map((a) => {
        const Icon = ICON[a.kind as keyof typeof ICON] ?? Square;
        const active = picked === a.id;
        return (
          <div
            key={a.id}
            className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12px] transition-colors ${
              active
                ? "bg-indigo-50 font-semibold text-indigo-900 border border-indigo-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <button onClick={() => onPick(a.id)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
              <Icon className="size-3.5 shrink-0 text-slate-500" />
              <span className="truncate">{LABEL[a.kind] ?? a.kind}</span>
              <span className="font-mono text-[10.5px] text-slate-400">p{a.pageIndex + 1}</span>
            </button>
            <button
              onClick={() => onRemove(a.id)}
              aria-label="Remove annotation"
              className="text-slate-400 transition-colors hover:text-rose-500"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
