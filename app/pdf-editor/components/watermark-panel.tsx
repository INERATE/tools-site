"use client";

import type { WatermarkConfig } from "../element-types";

const FIELD =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)]/50 px-2.5 py-1.5 text-[12px] text-[var(--text)] outline-none focus:border-[var(--accent)]";
const HEAD = "text-[10.5px] font-bold tracking-[0.09em] text-[var(--text-dim)] uppercase";
const LABEL = "mb-1 block text-[10.5px] text-[var(--text-dim)]";

const LAYOUTS: WatermarkConfig["layout"][] = ["diagonal", "grid", "horizontal", "footer"];

export function WatermarkPanel({
  value, onChange, disabled,
}: {
  value: WatermarkConfig;
  onChange: (patch: Partial<WatermarkConfig>) => void;
  disabled: boolean;
}) {
  return (
    <section className="mb-5 border-t border-[var(--border)] pt-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h3 className={HEAD}>Watermark</h3>
        <button
          type="button"
          role="switch"
          aria-checked={value.enabled}
          aria-label="Enable watermark"
          disabled={disabled}
          onClick={() => onChange({ enabled: !value.enabled })}
          className={`h-4 w-7 rounded-full transition-colors disabled:opacity-40 ${
            value.enabled ? "bg-[var(--accent)]" : "bg-[var(--border)]"
          }`}
        >
          <span className={`block size-3 rounded-full bg-white transition-transform ${value.enabled ? "translate-x-3.5" : "translate-x-0.5"}`} />
        </button>
      </div>

      <input
        type="text"
        aria-label="Watermark text"
        className={FIELD}
        value={value.text}
        disabled={disabled || !value.enabled}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Watermark text"
      />

      <label className={`${LABEL} mt-2`}>Layout</label>
      <select
        className={FIELD}
        value={value.layout}
        disabled={disabled || !value.enabled}
        onChange={(e) => onChange({ layout: e.target.value as WatermarkConfig["layout"] })}
      >
        {LAYOUTS.map((l) => (
          <option key={l} value={l}>{l[0].toUpperCase() + l.slice(1)}</option>
        ))}
      </select>

      <label className={`${LABEL} mt-2`}>Angle — {value.rotation}°</label>
      <input
        type="range" min={-90} max={90} value={value.rotation}
        disabled={disabled || !value.enabled}
        onChange={(e) => onChange({ rotation: Number(e.target.value) })}
        className="w-full accent-[var(--accent)] disabled:opacity-40"
      />

      <label className={`${LABEL} mt-1`}>Opacity — {Math.round(value.opacity * 100)}%</label>
      <input
        type="range" min={5} max={90} value={Math.round(value.opacity * 100)}
        disabled={disabled || !value.enabled}
        onChange={(e) => onChange({ opacity: Number(e.target.value) / 100 })}
        className="w-full accent-[var(--accent)] disabled:opacity-40"
      />

      <label className={`${LABEL} mt-2`}>Pages</label>
      <select
        className={FIELD}
        value={value.pages}
        disabled={disabled || !value.enabled}
        onChange={(e) => onChange({ pages: e.target.value as WatermarkConfig["pages"] })}
      >
        <option value="all">Every page</option>
        <option value="first">First page only</option>
      </select>
    </section>
  );
}
