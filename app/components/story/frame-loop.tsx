"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed webp frame sequence — the Veo/Omni-generated,
 * background-matted clips for the storytelling section. Frame index tracks
 * how far this element has scrolled through the viewport, not a timer: it
 * plays forward as you scroll down into it, reverses if you scroll back up.
 * Pins to frame 1 under prefers-reduced-motion. Not a video file: no element
 * to download, save-as, or extract — same "cannot be downloaded" property as SVG.
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

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.src = `${dir}/frame_${String(i + 1).padStart(pad, "0")}.webp`;
      return img;
    });
    const ctx = canvas.current!.getContext("2d")!;
    let current = -1;
    const draw = (i: number) => {
      const img = imgs[i];
      if (!img?.complete || i === current) return;
      current = i;
      canvas.current!.width = img.naturalWidth;
      canvas.current!.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
    imgs[0].onload = () => draw(0);
    if (reduced) return;

    // Progress 0 as the canvas enters from the bottom of the viewport, 1 once
    // its center has scrolled to roughly a third down from the top.
    const onScroll = () => {
      const rect = canvas.current!.getBoundingClientRect();
      const start = innerHeight * 0.92;
      const end = innerHeight * 0.3;
      const p = (start - rect.top) / (start - end);
      draw(Math.min(count - 1, Math.max(0, Math.round(p * (count - 1)))));
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, [dir, count, pad]);

  return <canvas ref={canvas} className={className} aria-hidden="true" />;
}
