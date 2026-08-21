"use client";

import { useRef } from "react";

/**
 * The target page with a draggable and resizable signature overlay.
 */
export function PageCanvas({
  pageUrl,
  pageRatio,
  sig,
  xFrac,
  yFrac,
  widthFrac,
  onMove,
  onResize,
}: {
  pageUrl: string;
  pageRatio: number;
  sig: { url: string; w: number; h: number };
  xFrac: number;
  yFrac: number;
  widthFrac: number;
  onMove: (xFrac: number, yFrac: number) => void;
  onResize?: (widthFrac: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<{ clientX: number; clientY: number; initX: number; initY: number; initW: number; mode: "move" | "resize" } | null>(null);
  const sigRatio = sig.h / sig.w;

  const handlePointerDown = (mode: "move" | "resize") => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      initX: xFrac,
      initY: yFrac,
      initW: widthFrac,
      mode,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const s = startRef.current;
    if (!s || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const heightFrac = (widthFrac * rect.width * sigRatio) / rect.height;

    if (s.mode === "move") {
      const dx = (e.clientX - s.clientX) / rect.width;
      const dy = (e.clientY - s.clientY) / rect.height;
      const newX = Math.min(Math.max(s.initX + dx, 0), 1 - widthFrac);
      const newY = Math.min(Math.max(s.initY + dy, 0), 1 - heightFrac);
      onMove(newX, newY);
    } else if (s.mode === "resize" && onResize) {
      const dx = (e.clientX - s.clientX) / rect.width;
      const newW = Math.max(0.08, Math.min(0.9, s.initW + dx));
      onResize(newW);
    }
  };

  const handlePointerUp = () => {
    startRef.current = null;
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" style={{ aspectRatio: pageRatio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pageUrl} alt="Page to sign" className="pointer-events-none block h-full w-full object-contain" />
      <div
        onPointerDown={handlePointerDown("move")}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="group absolute cursor-move touch-none rounded-md outline-dashed outline-2 outline-indigo-500 bg-indigo-50/15 select-none"
        style={{ left: `${xFrac * 100}%`, top: `${yFrac * 100}%`, width: `${widthFrac * 100}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sig.url} alt="Your signature" draggable={false} className="pointer-events-none block w-full select-none" />

        {/* 4 Corner Resize Handles */}
        <span
          onPointerDown={handlePointerDown("resize")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="absolute -top-1.5 -left-1.5 size-3 cursor-nwse-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
          title="Drag to resize"
        />
        <span
          onPointerDown={handlePointerDown("resize")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="absolute -top-1.5 -right-1.5 size-3 cursor-nesw-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
          title="Drag to resize"
        />
        <span
          onPointerDown={handlePointerDown("resize")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="absolute -bottom-1.5 -left-1.5 size-3 cursor-nesw-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
          title="Drag to resize"
        />
        <span
          onPointerDown={handlePointerDown("resize")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="absolute -bottom-1.5 -right-1.5 size-3 cursor-nwse-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs"
          title="Drag to resize"
        />
      </div>
    </div>
  );
}
