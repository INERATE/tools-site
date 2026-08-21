"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import type { BoxPatch } from "../anno-ops";
import type { BoxLike } from "../annotation-types";
import { AnnotationShape } from "./annotation-shape";

const pct = (n: number) => `${n * 100}%`;

type DragMode = "move" | "nw" | "ne" | "sw" | "se";

/**
 * A placed annotation / signature with 4-corner multi-directional resize handles.
 */
export function PlacedAnnotation({
  a,
  selected,
  onSelect,
  onRemove,
  onUpdate,
}: {
  a: BoxLike;
  selected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: BoxPatch) => void;
}) {
  const start = useRef<{
    px: number;
    py: number;
    a: BoxLike;
    mode: DragMode;
  } | null>(null);

  const frac = (e: React.PointerEvent) => {
    const page = (e.currentTarget as HTMLElement).closest("[data-page]") as HTMLElement | null;
    const r = page?.getBoundingClientRect();
    return r ? { w: r.width, h: r.height } : { w: 1, h: 1 };
  };

  const onDown = (mode: DragMode) => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, a, mode };
    onSelect(a.id);
  };

  const onMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const { w, h } = frac(e);
    const dx = (e.clientX - s.px) / w;
    const dy = (e.clientY - s.py) / h;

    if (s.mode === "move") {
      onUpdate(a.id, {
        relX: Math.max(0, Math.min(1 - s.a.relWidth, s.a.relX + dx)),
        relY: Math.max(0, Math.min(1 - s.a.relHeight, s.a.relY + dy)),
      });
    } else if (s.mode === "se") {
      onUpdate(a.id, {
        relWidth: Math.max(0.04, s.a.relWidth + dx),
        relHeight: Math.max(0.02, s.a.relHeight + dy),
      });
    } else if (s.mode === "sw") {
      const newW = Math.max(0.04, s.a.relWidth - dx);
      onUpdate(a.id, {
        relX: s.a.relX + (s.a.relWidth - newW),
        relWidth: newW,
        relHeight: Math.max(0.02, s.a.relHeight + dy),
      });
    } else if (s.mode === "ne") {
      const newH = Math.max(0.02, s.a.relHeight - dy);
      onUpdate(a.id, {
        relY: s.a.relY + (s.a.relHeight - newH),
        relWidth: Math.max(0.04, s.a.relWidth + dx),
        relHeight: newH,
      });
    } else if (s.mode === "nw") {
      const newW = Math.max(0.04, s.a.relWidth - dx);
      const newH = Math.max(0.02, s.a.relHeight - dy);
      onUpdate(a.id, {
        relX: s.a.relX + (s.a.relWidth - newW),
        relY: s.a.relY + (s.a.relHeight - newH),
        relWidth: newW,
        relHeight: newH,
      });
    }
  };

  const onUp = () => {
    start.current = null;
  };

  return (
    <div
      className={`pointer-events-auto absolute cursor-move ${
        selected ? "z-[45] ring-2 ring-indigo-600 shadow-sm" : "z-[35] hover:ring-1 hover:ring-indigo-300"
      }`}
      style={{
        left: pct(a.relX),
        top: pct(a.relY),
        width: pct(a.relWidth),
        height: pct(a.relHeight),
      }}
      onPointerDown={onDown("move")}
      onPointerMove={onMove}
      onPointerUp={onUp}
    >
      <AnnotationShape a={a} fill />

      {selected && (
        <>
          {/* Delete Button */}
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(a.id);
            }}
            aria-label="Remove annotation"
            className="absolute -top-2.5 -right-2.5 z-20 grid size-5 place-items-center rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
          >
            <X className="size-3" />
          </button>

          {/* 4 Corner Scale Handles */}
          <span
            onPointerDown={onDown("nw")}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className="absolute -top-1.5 -left-1.5 size-3 cursor-nwse-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
            title="Resize"
          />
          <span
            onPointerDown={onDown("ne")}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className="absolute -top-1.5 -right-1.5 size-3 cursor-nesw-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
            title="Resize"
          />
          <span
            onPointerDown={onDown("sw")}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className="absolute -bottom-1.5 -left-1.5 size-3 cursor-nesw-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
            title="Resize"
          />
          <span
            onPointerDown={onDown("se")}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className="absolute -bottom-1.5 -right-1.5 size-3 cursor-nwse-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
            title="Resize"
          />
        </>
      )}
    </div>
  );
}
