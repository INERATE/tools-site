"use client";

import type { NumberPosition, NumberStyle } from "../lib/stamp-page-numbers";

const POSITIONS: { value: NumberPosition; label: string }[] = [
  { value: "bottom-center", label: "Bottom centre" },
  { value: "bottom-right", label: "Bottom right" },
  { value: "top-right", label: "Top right" },
];

const BTN = (on: boolean) =>
  `rounded-xl border px-3 py-2 text-[12.5px] font-semibold transition-colors ${
    on
      ? "border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--text)]"
      : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]"
  }`;

export function NumberOptions({
  position,
  onPosition,
  style,
  onStyle,
  startAt,
  onStartAt,
}: {
  position: NumberPosition;
  onPosition: (p: NumberPosition) => void;
  style: NumberStyle;
  onStyle: (s: NumberStyle) => void;
  startAt: number;
  onStartAt: (n: number) => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {POSITIONS.map((p) => (
          <button key={p.value} type="button" onClick={() => onPosition(p.value)} className={BTN(p.value === position)}>
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => onStyle("n")} className={BTN(style === "n")}>
          1, 2, 3…
        </button>
        <button type="button" onClick={() => onStyle("n-of-total")} className={BTN(style === "n-of-total")}>
          1 / N
        </button>
        <label className="ml-auto flex items-center gap-1.5 text-[12.5px] text-[var(--text-dim)]">
          Start at
          <input
            type="number"
            min={0}
            value={startAt}
            onChange={(e) => onStartAt(Number(e.target.value) || 1)}
            className="w-14 rounded-lg border border-[var(--border)] bg-transparent px-2 py-1 text-center text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
        </label>
      </div>
    </div>
  );
}
