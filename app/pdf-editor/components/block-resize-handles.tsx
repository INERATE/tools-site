"use client";

import { Move } from "lucide-react";
import { useRef } from "react";
import type { TextBlock } from "../types";

type Dir = "e" | "w" | "se" | "sw" | "move";

const HANDLE = "absolute z-40 size-2.5 rounded-full border-2 border-indigo-600 bg-white shadow-xs";

const AT: Record<Exclude<Dir, "move">, string> = {
  w: "-left-1.5 top-1/2 -translate-y-1/2 cursor-ew-resize",
  e: "-right-1.5 top-1/2 -translate-y-1/2 cursor-ew-resize",
  se: "-right-1.5 -bottom-1.5 cursor-nwse-resize",
  sw: "-left-1.5 -bottom-1.5 cursor-nesw-resize",
};

export function BlockResizeHandles({
  block: b,
  onResize,
}: {
  block: TextBlock;
  onResize?: (id: string, patch: { relX?: number; relY?: number; relWidth?: number; relHeight?: number }) => void;
}) {
  const start = useRef<{ x: number; y: number; initX: number; initY: number; initW: number; initH: number; dir: Dir } | null>(null);

  const down = (dir: Dir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = {
      x: e.clientX,
      y: e.clientY,
      initX: b.relX,
      initY: b.relY,
      initW: b.relWidth,
      initH: b.relHeight || 0.04,
      dir,
    };
  };

  const move = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s || !onResize) return;
    const page = (e.currentTarget as HTMLElement).closest("[data-page]") as HTMLElement | null;
    if (!page) return;
    const r = page.getBoundingClientRect();
    const dx = (e.clientX - s.x) / r.width;
    const dy = (e.clientY - s.y) / r.height;

    if (s.dir === "move") {
      const nextX = Math.max(0, Math.min(1 - s.initW, s.initX + dx));
      const nextY = Math.max(0, Math.min(1 - s.initH, s.initY + dy));
      return onResize(b.id, { relX: nextX, relY: nextY });
    }

    const height = Math.max(0.015, s.initH + dy);

    if (s.dir === "e") return onResize(b.id, { relWidth: Math.max(0.04, s.initW + dx) });
    if (s.dir === "se") return onResize(b.id, { relWidth: Math.max(0.04, s.initW + dx), relHeight: height });

    // Dragging a west edge moves the origin as well as the width
    const w = Math.max(0.04, s.initW - dx);
    onResize(b.id, {
      relX: s.initX + (s.initW - w),
      relWidth: w,
      ...(s.dir === "sw" ? { relHeight: height } : {}),
    });
  };

  const up = () => {
    start.current = null;
  };

  return (
    <>
      {/* Move / Drag Position Handle */}
      <div
        onPointerDown={down("move")}
        onPointerMove={move}
        onPointerUp={up}
        title="Drag to reposition text block"
        className="absolute -top-3.5 -left-3.5 z-40 grid size-5.5 place-items-center rounded-full bg-indigo-600 text-white shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform select-none ring-2 ring-white"
      >
        <Move className="size-3" />
      </div>

      {/* Resize corner/edge handles */}
      {((Object.keys(AT) as unknown) as Exclude<Dir, "move">[]).map((dir) => (
        <span
          key={dir}
          onPointerDown={down(dir)}
          onPointerMove={move}
          onPointerUp={up}
          title="Drag to resize"
          className={`${HANDLE} ${AT[dir]}`}
        />
      ))}
    </>
  );
}
