"use client";

import { useRef } from "react";
import type { TextBlock } from "../types";

type Dir = "e" | "w" | "se" | "sw";

const HANDLE = "absolute z-40 size-2.5 rounded-full border-2 border-indigo-600 bg-white shadow-xs";

const AT: Record<Dir, string> = {
  w: "-left-1 top-1/2 -translate-y-1/2 cursor-ew-resize",
  e: "-right-1 top-1/2 -translate-y-1/2 cursor-ew-resize",
  se: "-right-1 -bottom-1 cursor-nwse-resize",
  sw: "-left-1 -bottom-1 cursor-nesw-resize",
};

export function BlockResizeHandles({
  block: b, onResize,
}: {
  block: TextBlock;
  onResize?: (id: string, patch: { relX?: number; relWidth?: number; relHeight?: number }) => void;
}) {
  const start = useRef<{ x: number; y: number; initX: number; initW: number; initH: number; dir: Dir } | null>(null);

  const down = (dir: Dir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, initX: b.relX, initW: b.relWidth, initH: b.relHeight, dir };
  };

  const move = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s || !onResize) return;
    const page = (e.currentTarget as HTMLElement).closest("[data-page]") as HTMLElement | null;
    if (!page) return;
    const r = page.getBoundingClientRect();
    const dx = (e.clientX - s.x) / r.width;
    const dy = (e.clientY - s.y) / r.height;
    const height = Math.max(0.015, s.initH + dy);

    if (s.dir === "e") return onResize(b.id, { relWidth: Math.max(0.04, s.initW + dx) });
    if (s.dir === "se") return onResize(b.id, { relWidth: Math.max(0.04, s.initW + dx), relHeight: height });

    // Dragging a west edge moves the origin as well as the width, or the box
    // would grow to the right instead of following the pointer.
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
      {(Object.keys(AT) as Dir[]).map((dir) => (
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
