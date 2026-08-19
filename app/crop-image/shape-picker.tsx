"use client";

import type { CropShape } from "../lib/crop-shape";

const SEG = "h-9 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition-colors";
const ON = "bg-[var(--accent)] text-[var(--on-accent)]";
const OFF = "text-[var(--text-dim)] hover:text-[var(--text)]";

const KINDS: { kind: CropShape["kind"]; label: string }[] = [
  { kind: "rect", label: "Rectangle" },
  { kind: "circle", label: "Circle" },
  { kind: "rounded", label: "Rounded" },
  { kind: "custom", label: "Custom" },
];

/** Shape mask for the crop — anything but Rectangle exports as PNG so the cutout stays transparent. */
export function ShapePicker({ shape, onShape }: { shape: CropShape; onShape: (s: CropShape) => void }) {
  return (
    <div className="glass mb-6 rounded-2xl p-5">
      <fieldset className="mb-1">
        <legend className="mb-2 text-[13px] font-medium">Shape</legend>
        <div className="inline-flex flex-wrap rounded-full border border-[var(--border)] p-1">
          {KINDS.map((k) => (
            <button
              key={k.kind}
              type="button"
              aria-pressed={shape.kind === k.kind}
              onClick={() =>
                onShape(
                  k.kind === "rounded" ? { kind: "rounded", radius: 0.15 } : k.kind === "custom" ? { kind: "custom", d: "" } : { kind: k.kind },
                )
              }
              className={`${SEG} ${shape.kind === k.kind ? ON : OFF}`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </fieldset>

      {shape.kind === "rounded" && (
        <label className="mt-3 flex items-center gap-3 text-[13px] text-[var(--text-dim)]">
          Corner radius
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.01}
            value={shape.radius}
            onChange={(e) => onShape({ kind: "rounded", radius: Number(e.target.value) })}
            className="flex-1 accent-[var(--accent)]"
          />
        </label>
      )}

      {shape.kind === "custom" && (
        <div className="mt-3">
          <label className="mb-1.5 block text-[13px] text-[var(--text-dim)]">
            SVG path <code className="text-[11.5px]">d</code> — on a 0-100 viewBox
          </label>
          <textarea
            value={shape.d}
            onChange={(e) => onShape({ kind: "custom", d: e.target.value })}
            placeholder="M50 5 L95 95 L5 95 Z"
            rows={3}
            className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 font-mono text-[12.5px] text-[var(--text)]"
          />
          <p className="mt-1.5 text-[11.5px] text-[var(--text-dim)]">
            Paste a path drawn on a 100×100 grid — a star, a blob, a logo outline. It scales to fit whatever you crop.
          </p>
        </div>
      )}
    </div>
  );
}
