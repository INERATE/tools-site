"use client";

import { LEVELS, type CompressLevel } from "../lib/compress-pdf";

const fmt = (n: number) => (n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export function LevelSelect({
  level,
  onLevel,
  inSize,
  outSize,
}: {
  level: CompressLevel;
  onLevel: (l: CompressLevel) => void;
  inSize: number;
  outSize: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex gap-2">
        {(Object.keys(LEVELS) as CompressLevel[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => onLevel(l)}
            className={`flex-1 rounded-xl border px-3 py-2 text-[12.5px] font-semibold transition-colors ${
              l === level
                ? "border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--text)]"
                : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {LEVELS[l].label}
          </button>
        ))}
      </div>

      {outSize > 0 && (
        <p className="mt-3 text-[12.5px] text-[var(--text-dim)]">
          {fmt(inSize)} →{" "}
          <span className={`font-semibold ${outSize < inSize ? "text-emerald-500" : "text-amber-500"}`}>
            {fmt(outSize)}
          </span>
          {outSize < inSize
            ? ` (${Math.round(100 - (outSize / inSize) * 100)}% smaller)`
            : " — already small; text-only PDFs may not shrink further"}
        </p>
      )}
    </div>
  );
}
