"use client";

import type { QrOptions } from "../lib/qr-code";

const ERROR_LEVELS = [
  { value: "L", label: "L · 7%" },
  { value: "M", label: "M · 15%" },
  { value: "Q", label: "Q · 25%" },
  { value: "H", label: "H · 30%" },
] as const;

const FIELD = "flex flex-col gap-1.5 text-[12.5px] font-semibold text-[var(--text-dim)]";
const SELECT = "rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-[13px] text-[var(--text)]";

export function QrOptionsGrid({ opts, setOpts }: { opts: QrOptions; setOpts: (o: QrOptions) => void }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <label className={FIELD}>
        Size
        <select
          value={opts.size}
          onChange={(e) => setOpts({ ...opts, size: Number(e.target.value) })}
          className={SELECT}
        >
          {[256, 512, 1024].map((n) => (
            <option key={n} value={n}>
              {n}px
            </option>
          ))}
        </select>
      </label>
      <label className={FIELD}>
        Error correction
        <select
          value={opts.errorCorrection}
          onChange={(e) => setOpts({ ...opts, errorCorrection: e.target.value as QrOptions["errorCorrection"] })}
          className={SELECT}
        >
          {ERROR_LEVELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </label>
      <label className={FIELD}>
        Foreground
        <input
          type="color"
          value={opts.fg}
          onChange={(e) => setOpts({ ...opts, fg: e.target.value })}
          className="h-8 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        />
      </label>
      <label className={FIELD}>
        Background
        <input
          type="color"
          value={opts.bg}
          onChange={(e) => setOpts({ ...opts, bg: e.target.value })}
          className="h-8 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        />
      </label>
    </div>
  );
}
