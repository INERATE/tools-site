"use client";

import type { WatermarkPosition } from "../lib/watermark-image";

const POSITIONS: { value: WatermarkPosition; label: string }[] = [
  { value: "tiled", label: "Tiled" },
  { value: "center", label: "Center" },
  { value: "bottom-right", label: "Bottom right" },
];

export function WatermarkOptions({
  text,
  onText,
  position,
  onPosition,
  opacity,
  onOpacity,
}: {
  text: string;
  onText: (v: string) => void;
  position: WatermarkPosition;
  onPosition: (v: WatermarkPosition) => void;
  opacity: number;
  onOpacity: (v: number) => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => onText(e.target.value)}
        placeholder="Enter watermark text (e.g. CONFIDENTIAL)"
        className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-[13.5px] text-[var(--text)] outline-none focus:border-[var(--accent)]"
      />
      <div className="flex flex-wrap gap-2">
        {POSITIONS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => onPosition(p.value)}
            className={`rounded-xl border px-3 py-2 text-[12.5px] font-semibold transition-colors ${
              p.value === position
                ? "border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--text)]"
                : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1 text-[12.5px] text-[var(--text-dim)]">
        Opacity — {Math.round(opacity * 100)}%
        <input
          type="range"
          min={10}
          max={90}
          value={Math.round(opacity * 100)}
          onChange={(e) => onOpacity(Number(e.target.value) / 100)}
          className="accent-[var(--accent)]"
        />
      </label>
    </div>
  );
}
