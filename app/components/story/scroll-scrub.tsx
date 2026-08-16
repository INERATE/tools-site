"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed frame sequence with High-DPI / Retina canvas upscaling
 * and bicubic high-quality image smoothing.
 */
export function ScrollScrub({
  dir,
  count,
  pad = 3,
  className = "",
  children,
}: {
  dir: string;
  count: number;
  pad?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const imgs = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.src = `${dir}/frame_${String(i + 1).padStart(pad, "0")}.webp`;
      return img;
    });

    const cvs = canvas.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: false });
    if (!ctx) return;

    let current = -1;
    let queued = false;

    const resizeAndDraw = (i: number) => {
      const img = imgs[i];
      if (!img?.complete) return;
      current = i;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (cvs.width !== w * dpr || cvs.height !== h * dpr) {
        cvs.width = w * dpr;
        cvs.height = h * dpr;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Scale & center image with cover sizing
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const screenAspect = w / h;
      let drawW, drawH, drawX, drawY;

      if (screenAspect > imgAspect) {
        drawW = cvs.width;
        drawH = cvs.width / imgAspect;
        drawX = 0;
        drawY = (cvs.height - drawH) / 2;
      } else {
        drawH = cvs.height;
        drawW = cvs.height * imgAspect;
        drawX = (cvs.width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const el = wrap.current;
        if (!el) return;
        const span = el.scrollHeight - window.innerHeight;
        const p = span > 0 ? -el.getBoundingClientRect().top / span : 0;
        const targetFrame = Math.min(count - 1, Math.max(0, Math.round(p * (count - 1))));
        resizeAndDraw(targetFrame);
      });
    };

    const onResize = () => {
      if (current >= 0) resizeAndDraw(current);
    };

    imgs[0].onload = () => resizeAndDraw(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [dir, count, pad]);

  return (
    <div ref={wrap} className={className}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvas}
          className="h-full w-full object-cover"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
        />
        {children}
      </div>
    </div>
  );
}
