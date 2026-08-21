"use client";

import { useRef, useState } from "react";

export function CompareSlider({
  beforeUrl,
  afterUrl,
  className = "",
}: {
  beforeUrl: string;
  afterUrl: string;
  className?: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updatePos(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePos(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative select-none overflow-hidden rounded-2xl shadow-xl cursor-ew-resize touch-none ${className}`}
    >
      {/* After Image (Full width background) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterUrl} alt="After AI Erasure" className="block max-h-[70vh] w-auto max-w-full object-contain mx-auto" />

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeUrl}
          alt="Before Original"
          className="absolute top-0 left-0 max-h-[70vh] w-auto max-w-none object-contain h-full"
          style={{ width: containerRef.current?.offsetWidth }}
        />
      </div>

      {/* Split Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 flex size-7 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md ring-2 ring-indigo-500/20">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Badges */}
      <span className="absolute top-3 left-3 z-10 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white tracking-wide shadow-sm">
        Original
      </span>
      <span className="absolute top-3 right-3 z-10 rounded-lg bg-indigo-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white tracking-wide shadow-sm">
        AI Erased ✨
      </span>
    </div>
  );
}
