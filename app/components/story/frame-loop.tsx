"use client";

import { useThemeHueRotate } from "./use-theme-hue-rotate";
import { useFrameLoop } from "./use-frame-loop";

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
  const hueRotate = useThemeHueRotate();
  const { canvas, handlePointerDown, handlePointerMove, handlePointerUp } = useFrameLoop({ dir, count, pad });

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
