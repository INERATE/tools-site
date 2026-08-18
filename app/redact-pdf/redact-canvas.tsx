"use client";

import { useRef, useState } from "react";
import type { Box } from "../lib/redact-page";

/** Click-drag on the page to draw a solid redaction box; each drag commits one box for the current page. */
export function RedactCanvas({
  pageUrl,
  pageRatio,
  boxes,
  onAddBox,
}: {
  pageUrl: string;
  pageRatio: number;
  boxes: Box[];
  onAddBox: (box: Box) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [draft, setDraft] = useState<Box | null>(null);

  function frac(clientX: number, clientY: number) {
    const rect = containerRef.current!.getBoundingClientRect();
    return {
      x: Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1),
      y: Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1),
    };
  }

  function toBox(a: { x: number; y: number }, b: { x: number; y: number }): Box {
    return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y) };
  }

  return (
    <div
      ref={containerRef}
      className="relative touch-none overflow-hidden rounded-xl bg-white"
      style={{ aspectRatio: pageRatio }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        start.current = frac(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (!start.current) return;
        setDraft(toBox(start.current, frac(e.clientX, e.clientY)));
      }}
      onPointerUp={(e) => {
        if (!start.current) return;
        const box = toBox(start.current, frac(e.clientX, e.clientY));
        start.current = null;
        setDraft(null);
        if (box.w > 0.01 && box.h > 0.01) onAddBox(box);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pageUrl} alt="Page to redact" draggable={false} className="pointer-events-none block h-full w-full object-contain" />
      {boxes.map((b, i) => (
        <div
          key={i}
          className="absolute bg-black"
          style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%`, width: `${b.w * 100}%`, height: `${b.h * 100}%` }}
        />
      ))}
      {draft && (
        <div
          className="absolute bg-black/60"
          style={{ left: `${draft.x * 100}%`, top: `${draft.y * 100}%`, width: `${draft.w * 100}%`, height: `${draft.h * 100}%` }}
        />
      )}
    </div>
  );
}
