"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { normalize, type Box } from "../lib/cover-box";
import { CoverBoxView, frame } from "./cover-box-view";

/** Drag on the page to draw a cover; every box can be taken off again. */
export function CoverCanvas({
  src,
  boxes,
  dark,
  onAdd,
  onRemove,
}: {
  src: string;
  boxes: Box[];
  dark: boolean;
  onAdd: (box: Omit<Box, "id">) => void;
  onRemove: (id: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [live, setLive] = useState<Omit<Box, "id"> | null>(null);

  /** Pointer position as a 0–1 fraction of the page, clamped to its edges. */
  const at = (e: React.PointerEvent) => {
    const r = host.current!.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
    };
  };

  return (
    <div
      ref={host}
      className="relative touch-none overflow-hidden rounded-xl bg-white select-none"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        start.current = at(e);
        setLive({ ...start.current, w: 0, h: 0 });
      }}
      onPointerMove={(e) => {
        if (!start.current) return;
        const now = at(e);
        setLive(normalize(start.current.x, start.current.y, now.x, now.y));
      }}
      onPointerUp={() => {
        // Ignore a plain click: a box with no area would be invisible and unremovable.
        if (live && live.w > 0.01 && live.h > 0.01) onAdd(live);
        start.current = null;
        setLive(null);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Page being edited" draggable={false} className="pointer-events-none block w-full" />

      <AnimatePresence initial={false}>
        {boxes.map((b) => (
          <CoverBoxView key={b.id} box={b} dark={dark} onRemove={() => onRemove(b.id)} />
        ))}
      </AnimatePresence>

      {live && (
        <div
          className="pointer-events-none absolute border-2 border-dashed border-[var(--accent)] bg-[var(--accent)]/20"
          style={frame(live)}
        />
      )}
    </div>
  );
}
