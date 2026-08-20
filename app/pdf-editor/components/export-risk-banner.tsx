"use client";

import { AlertTriangle } from "lucide-react";
import type { ExportRisk } from "../engine/risk";

/** Shown once, before export, when an edit might not come out clean — never hidden, never auto-dismissed by a timer. */
export function ExportRiskBanner({
  risk, onCancel, onExportAnyway,
}: {
  risk: ExportRisk;
  onCancel: () => void;
  onExportAnyway: () => void;
}) {
  const lines: string[] = [];
  if (risk.overflow) lines.push(`${risk.overflow} edit${risk.overflow === 1 ? "" : "s"} may not fit the space it had`);
  if (risk.seam) lines.push(`${risk.seam} edit${risk.seam === 1 ? "" : "s"} sit on a busy background — a faint edge may show`);
  if (risk.math) lines.push(`${risk.math} edit${risk.math === 1 ? "" : "s"} touched what looks like a math symbol`);

  return (
    <div className="absolute top-full right-0 z-40 mt-2 w-80 rounded-2xl border border-amber-500/30 bg-[var(--bg-raised)] p-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
      <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold text-amber-400">
        <AlertTriangle aria-hidden className="size-3.5" />
        Before you export
      </div>
      <ul className="mb-3 flex flex-col gap-1 text-[12px] text-[var(--text-dim)]">
        {lines.map((l) => (
          <li key={l}>• {l}</li>
        ))}
      </ul>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg border border-[var(--border)] py-1.5 text-[12px] font-semibold text-[var(--text-dim)] hover:text-[var(--text)]"
        >
          Go back
        </button>
        <button
          onClick={onExportAnyway}
          className="flex-1 rounded-lg bg-amber-500/15 py-1.5 text-[12px] font-semibold text-amber-400 hover:bg-amber-500/25"
        >
          Export anyway
        </button>
      </div>
    </div>
  );
}
