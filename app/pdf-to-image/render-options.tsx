"use client";

import type { Format } from "../lib/pdf-to-image";

const SEG =
  "h-9 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition-colors";
const ON = "bg-[var(--accent)] text-[var(--on-accent)]";
const OFF = "text-[var(--text-dim)] hover:text-[var(--text)]";

const QUALITY = [
  { label: "Screen", scale: 1.5 },
  { label: "Standard", scale: 2 },
  { label: "Print", scale: 3 },
];

export function RenderOptions({
  name,
  format,
  scale,
  onFormat,
  onScale,
}: {
  name: string;
  format: Format;
  scale: number;
  onFormat: (f: Format) => void;
  onScale: (s: number) => void;
}) {
  return (
    <div className="glass mb-6 rounded-2xl p-5">
      <p className="mb-4 truncate text-[13.5px] font-medium text-[var(--text)]">{name}</p>

      <fieldset className="mb-4">
        <legend className="mb-2 text-[13px] font-medium">Format</legend>
        <div className="inline-flex rounded-full border border-[var(--border)] p-1">
          {(["png", "jpeg"] as Format[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={format === f}
              onClick={() => onFormat(f)}
              className={`${SEG} ${format === f ? ON : OFF}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-[13px] font-medium">Quality</legend>
        <div className="inline-flex rounded-full border border-[var(--border)] p-1">
          {QUALITY.map((q) => (
            <button
              key={q.label}
              type="button"
              aria-pressed={scale === q.scale}
              onClick={() => onScale(q.scale)}
              className={`${SEG} ${scale === q.scale ? ON : OFF}`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
