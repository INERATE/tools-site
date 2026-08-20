"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import type { ExportRisk } from "../engine/risk";
import { ExportRiskBanner } from "./export-risk-banner";

export function ExportButton({
  fileName, busy, outUrl, onExport, canExport, risk,
}: {
  fileName: string;
  busy: boolean;
  outUrl: string | null;
  onExport?: () => void;
  canExport: boolean;
  risk: ExportRisk;
}) {
  const [confirming, setConfirming] = useState(false);
  useEffect(() => setConfirming(false), [risk.total]);

  if (outUrl) {
    return (
      <a
        href={outUrl}
        download={fileName.replace(/\.pdf$/i, "") + "-edited.pdf"}
        className="shimmer flex h-8 items-center gap-1.5 rounded-lg px-3.5 text-[12.5px] font-bold text-[var(--on-accent)]"
        style={{ background: "linear-gradient(135deg,var(--accent-3),var(--accent))" }}
      >
        <Download aria-hidden className="size-3.5" />
        Download
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => (risk.total > 0 ? setConfirming(true) : onExport?.())}
        disabled={!canExport || busy}
        className={`flex h-8 items-center gap-1.5 rounded-lg px-3.5 text-[12.5px] font-bold disabled:cursor-not-allowed disabled:opacity-45 ${
          risk.total > 0 && !busy ? "bg-amber-500/15 text-amber-400" : "shimmer text-[var(--on-accent)]"
        }`}
        style={risk.total > 0 && !busy ? undefined : { background: "linear-gradient(135deg,var(--accent),var(--accent-2))" }}
      >
        <Download aria-hidden className="size-3.5" />
        {busy ? "Working…" : risk.total > 0 ? `${risk.total} to review` : "Export"}
      </button>
      {confirming && (
        <ExportRiskBanner
          risk={risk}
          onCancel={() => setConfirming(false)}
          onExportAnyway={() => {
            setConfirming(false);
            onExport?.();
          }}
        />
      )}
    </div>
  );
}
