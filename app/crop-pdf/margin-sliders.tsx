"use client";

import type { Insets } from "../lib/crop-pdf";

const FIELDS: { key: keyof Insets; label: string }[] = [
  { key: "top", label: "Top" },
  { key: "bottom", label: "Bottom" },
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
];

export function MarginSliders({ insets, onChange }: { insets: Insets; onChange: (next: Insets) => void }) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {FIELDS.map(({ key, label }) => (
        <label key={key} className="flex flex-col gap-1 text-[12px] text-[var(--text-dim)]">
          {label} — {Math.round(insets[key] * 100)}%
          <input
            type="range"
            min={0}
            max={40}
            value={Math.round(insets[key] * 100)}
            onChange={(e) => onChange({ ...insets, [key]: Number(e.target.value) / 100 })}
            className="accent-[var(--accent)]"
          />
        </label>
      ))}
    </div>
  );
}
