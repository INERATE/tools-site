"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useThemeHueRotate } from "./use-theme-hue-rotate";

/**
 * Scroll-scrubbed and drag-interactive webp frame sequence.
 * - Plays forward/backward smoothly as you scroll down and up the page.
 * - Supports direct touch/pointer drag horizontally to scrub the 3D glass object.
 */
export function FrameLoop({
  dir,
  count,
  pad = 4,
  className = "",
}: {
  dir: string;
  count: number;
  pad?: number;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const hueRotate = useThemeHueRotate();
  const [, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const currentFrameRef = useRef(0);
  const drawRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.src = `${dir}/frame_${String(i + 1).padStart(pad, "0")}.webp`;
      return img;
    });
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;

    let current = -1;
    const draw = (i: number) => {
      const clamped = Math.min(count - 1, Math.max(0, Math.round(i)));
      const img = imgs[clamped];
      if (!img?.complete || clamped === current || !canvas.current) return;
      current = clamped;
      currentFrameRef.current = clamped;
      canvas.current.width = img.naturalWidth;
      canvas.current.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
    drawRef.current = draw;
    imgs[0].onload = () => draw(0);

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

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !canvas.current) return;
    const rect = canvas.current.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    drawRef.current(progress * (count - 1));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="Drag across to scrub 3D animation"
      className={`group relative flex cursor-grab items-center justify-center select-none active:cursor-grabbing ${className}`}
    >
      {/* Ambient background glow aura matching live theme */}
      <div
        className="pointer-events-none absolute -inset-4 z-0 rounded-3xl opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <canvas
        ref={canvas}
        className="pointer-events-none relative z-10 w-full rounded-2xl transition-all duration-300"
        style={{ filter: hueRotate }}
        aria-hidden="true"
      />
    </div>
  );
}
