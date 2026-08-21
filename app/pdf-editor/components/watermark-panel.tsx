"use client";

import type { WatermarkConfig } from "../element-types";

const FIELD =
  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs";
const LABEL = "mb-1 block text-[11px] font-semibold text-slate-700";

const LAYOUTS: WatermarkConfig["layout"][] = ["diagonal", "grid", "horizontal", "footer"];

export function WatermarkPanel({
  value,
  onChange,
  disabled,
}: {
  value: WatermarkConfig;
  onChange: (patch: Partial<WatermarkConfig>) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wide text-slate-800">Watermark</span>
        <button
          type="button"
          role="switch"
          aria-checked={value.enabled}
          aria-label="Enable watermark"
          disabled={disabled}
          onClick={() => onChange({ enabled: !value.enabled })}
          className={`h-5 w-9 rounded-full transition-colors p-0.5 disabled:opacity-40 ${
            value.enabled ? "bg-indigo-600" : "bg-slate-200"
          }`}
        >
          <span
            className={`block size-4 rounded-full bg-white shadow-xs transition-transform ${
              value.enabled ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <input
        type="text"
        aria-label="Watermark text"
        className={FIELD}
        value={value.text}
        disabled={disabled || !value.enabled}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="CONFIDENTIAL"
      />

      <div>
        <label className={LABEL}>Layout</label>
        <select
          className={FIELD}
          value={value.layout}
          disabled={disabled || !value.enabled}
          onChange={(e) => onChange({ layout: e.target.value as WatermarkConfig["layout"] })}
        >
          {LAYOUTS.map((l) => (
            <option key={l} value={l}>
              {l[0].toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex justify-between text-[11px] font-semibold text-slate-700">
          <span>Angle</span>
          <span className="font-mono text-slate-500">{value.rotation}°</span>
        </div>
        <input
          type="range"
          min={-90}
          max={90}
          value={value.rotation}
          disabled={disabled || !value.enabled}
          onChange={(e) => onChange({ rotation: Number(e.target.value) })}
          className="w-full accent-indigo-600 disabled:opacity-40"
        />
      </div>

      <div>
        <div className="flex justify-between text-[11px] font-semibold text-slate-700">
          <span>Opacity</span>
          <span className="font-mono text-slate-500">{Math.round(value.opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min={5}
          max={90}
          value={Math.round(value.opacity * 100)}
          disabled={disabled || !value.enabled}
          onChange={(e) => onChange({ opacity: Number(e.target.value) / 100 })}
          className="w-full accent-indigo-600 disabled:opacity-40"
        />
      </div>

      <div>
        <label className={LABEL}>Pages</label>
        <select
          className={FIELD}
          value={value.pages}
          disabled={disabled || !value.enabled}
          onChange={(e) => onChange({ pages: e.target.value as WatermarkConfig["pages"] })}
        >
          <option value="all">Every page</option>
          <option value="first">First page only</option>
        </select>
      </div>
    </div>
  );
}
