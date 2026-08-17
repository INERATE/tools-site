"use client";

import { useRef } from "react";
import { useAuroraCanvas } from "./use-aurora-canvas";

const MASK = "radial-gradient(ellipse 95% 82% at 50% 32%, #000 65%, transparent 100%)";

/** Generative fluid-wave aurora behind the hero. Logic: use-aurora-canvas.ts */
export function HeroAuroraMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  useAuroraCanvas(canvasRef, boxRef);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="pointer-events-none absolute top-[-120px] left-1/2 -z-10 h-[1000px] w-screen -translate-x-1/2 overflow-hidden will-change-transform"
    >
      <div className="animate-hero-aurora absolute top-[26%] left-1/2 h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--blob-b)_0%,var(--blob-a)_45%,var(--blob-c)_80%,transparent_100%)] opacity-70 blur-[130px] motion-reduce:animate-none sm:h-[750px] sm:w-[1250px]" />
      <canvas
        ref={canvasRef}
        className="h-full w-full transform-gpu opacity-90"
        style={{ maskImage: MASK, WebkitMaskImage: MASK }}
      />
    </div>
  );
}
