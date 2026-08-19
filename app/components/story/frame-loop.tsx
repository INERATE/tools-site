"use client";

import { useEffect, useRef } from "react";

/**
 * Auto-looping webp frame sequence — the Veo/Omni-generated, background-matted
 * clips for the storytelling section. Plays only while in view (IntersectionObserver),
 * pins to frame 1 under prefers-reduced-motion. Not a video file: no element to
 * download, save-as, or extract — same "cannot be downloaded" property as SVG.
 */
export function FrameLoop({
  dir,
  count,
  pad = 4,
  fps = 15,
  className = "",
}: {
  dir: string;
  count: number;
  pad?: number;
  fps?: number;
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
    const draw = (i: number) => {
      const img = imgs[i];
      if (!img.complete) return;
      canvas.current!.width = img.naturalWidth;
      canvas.current!.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
    imgs[0].onload = () => draw(0);
    if (reduced) return;

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    io.observe(canvas.current!);

    let frame = 0;
    let last = 0;
    let raf = 0;
    const interval = 1000 / fps;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || t - last < interval) return;
      last = t;
      frame = (frame + 1) % count;
      draw(frame);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [dir, count, pad, fps]);

  return <canvas ref={canvas} className={className} aria-hidden="true" />;
}
