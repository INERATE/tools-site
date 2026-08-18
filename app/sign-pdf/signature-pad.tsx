"use client";

import { Eraser } from "lucide-react";
import { useRef, useState } from "react";
import { trimCanvas } from "../lib/trim-canvas";

/** A draw-your-signature pad. Reports the trimmed PNG the moment a stroke lifts, so the caller always has the latest signature. */
export function SignaturePad({ onChange }: { onChange: (sig: { url: string; w: number; h: number } | null) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [empty, setEmpty] = useState(true);

  function point(e: React.PointerEvent) {
    const canvas = ref.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: ((e.clientX - rect.left) / rect.width) * canvas.width, y: ((e.clientY - rect.top) / rect.height) * canvas.height };
  }

  function start(e: React.PointerEvent) {
    drawing.current = true;
    setEmpty(false);
    const ctx = ref.current!.getContext("2d")!;
    const { x, y } = point(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = ref.current!.getContext("2d")!;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1a1a2e";
    const { x, y } = point(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    onChange(ref.current ? trimCanvas(ref.current) : null);
  }

  function clear() {
    const canvas = ref.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setEmpty(true);
    onChange(null);
  }

  return (
    <div className="glass mb-4 rounded-2xl p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">Draw your signature</p>
        {!empty && (
          <button
            type="button"
            onClick={clear}
            className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] font-semibold text-[var(--text-dim)] hover:text-[var(--text)]"
          >
            <Eraser className="size-3" /> Clear
          </button>
        )}
      </div>
      <canvas
        ref={ref}
        width={600}
        height={180}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="h-[110px] w-full touch-none rounded-xl bg-white"
      />
    </div>
  );
}
