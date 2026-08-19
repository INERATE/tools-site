"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

/**
 * Owns the canvas ref: scroll-scrub, pointer-drag scrub, webp frame loader.
 * Every frame retries its draw once loaded — a scroll/drag can request a
 * frame before its image arrives, else the canvas sticks on a stale frame.
 */
export function useFrameLoop({ dir, count, pad }: { dir: string; count: number; pad: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<(i: number) => void>(() => {});
  const [, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;

    let current = -1;
    let requested = 0;
    const draw = (i: number) => {
      const clamped = Math.min(count - 1, Math.max(0, Math.round(i)));
      requested = clamped;
      const img = imgs[clamped];
      if (!img?.complete || clamped === current || !canvas.current) return;
      current = clamped;
      canvas.current.width = img.naturalWidth;
      canvas.current.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
    drawRef.current = draw;

    const imgs = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.onload = () => {
        if (i === requested) draw(i);
      };
      img.src = `${dir}/frame_${String(i + 1).padStart(pad, "0")}.webp`;
      return img;
    });
    draw(0);

    if (reduced) return;

    const onScroll = () => {
      if (isDraggingRef.current || !canvas.current) return;
      const rect = canvas.current.getBoundingClientRect();
      const start = innerHeight * 0.95;
      const end = innerHeight * 0.25;
      const p = (start - rect.top) / (start - end);
      draw(p * (count - 1));
    };

    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, [dir, count, pad]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !canvas.current) return;
    const rect = canvas.current.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    drawRef.current(progress * (count - 1));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return { canvas, handlePointerDown, handlePointerMove, handlePointerUp };
}
