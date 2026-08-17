"use client";

import { useEffect, type RefObject } from "react";
import { H, paint } from "./hero-waves";
import { newPointer, readColors, trackPointer } from "./hero-pointer";

/**
 * Drives the hero aurora canvas: rAF loop, DPR sizing, cursor push.
 * Pauses off-screen, re-reads tokens on theme change, and paints one static
 * frame (no loop at all) under prefers-reduced-motion.
 */
export function useAuroraCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  boxRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const cvs = canvasRef.current;
    const box = boxRef.current;
    const ctx = cvs?.getContext("2d", { alpha: true });
    if (!cvs || !box || !ctx) return;

    const m = newPointer();
    let colors = readColors(); // cached: a per-frame style read is wasteful
    let time = 0;
    let id = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      cvs.width = innerWidth * dpr; // resets ctx state, including transform
      cvs.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    addEventListener("resize", resize, { passive: true });

    const themes = new MutationObserver(() => void (colors = readColors()));
    themes.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    const off = [() => removeEventListener("resize", resize), () => themes.disconnect()];
    const stop = () => off.forEach((f) => f());

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(ctx, innerWidth, 0, m, colors);
      return stop;
    }

    const draw = () => {
      if (!visible) return void (id = 0);
      time += 0.008;
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;
      m.speed *= 0.92;
      paint(ctx, innerWidth, time, m, colors);
      id = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !id) id = requestAnimationFrame(draw);
      },
      { threshold: 0.05 },
    );
    io.observe(box);
    const untrack = trackPointer(cvs, m);
    id = requestAnimationFrame(draw);

    off.push(() => id && cancelAnimationFrame(id), () => io.disconnect(), untrack);
    return stop;
  }, [canvasRef, boxRef]);
}
