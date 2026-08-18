"use client";

import { useRef } from "react";

/** The target page with a draggable signature overlay. Position/size are fractions of the page box, so they survive any render scale. */
export function PageCanvas({
  pageUrl,
  pageRatio,
  sig,
  xFrac,
  yFrac,
  widthFrac,
  onMove,
}: {
  pageUrl: string;
  pageRatio: number;
  sig: { url: string; w: number; h: number };
  xFrac: number;
  yFrac: number;
  widthFrac: number;
  onMove: (xFrac: number, yFrac: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const sigRatio = sig.h / sig.w;

  function clientToFrac(clientX: number, clientY: number) {
    const rect = containerRef.current!.getBoundingClientRect();
    const heightFrac = (widthFrac * rect.width * sigRatio) / rect.height;
    const x = Math.min(Math.max((clientX - rect.left) / rect.width - widthFrac / 2, 0), 1 - widthFrac);
    const y = Math.min(Math.max((clientY - rect.top) / rect.height - heightFrac / 2, 0), 1 - heightFrac);
    return { x, y };
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-xl bg-white" style={{ aspectRatio: pageRatio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pageUrl} alt="Page to sign" className="pointer-events-none block h-full w-full object-contain" />
      <div
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragging.current = true;
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          const { x, y } = clientToFrac(e.clientX, e.clientY);
          onMove(x, y);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        className="absolute cursor-grab touch-none rounded-md outline-dashed outline-2 outline-[var(--accent)]/50 active:cursor-grabbing"
        style={{ left: `${xFrac * 100}%`, top: `${yFrac * 100}%`, width: `${widthFrac * 100}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sig.url} alt="Your signature" draggable={false} className="pointer-events-none block w-full" />
      </div>
    </div>
  );
}
