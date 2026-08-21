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
        className="flex h-8.5 items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 text-[12.5px] font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors"
      >
        <Download className="size-3.5" />
        Download PDF
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => (risk.total > 0 ? setConfirming(true) : onExport?.())}
        disabled={!canExport || busy}
        className={`flex h-8.5 items-center gap-1.5 rounded-lg px-3.5 text-[12.5px] font-bold transition-all shadow-sm disabled:cursor-not-allowed disabled:opacity-45 ${
          risk.total > 0 && !busy
            ? "bg-amber-50 text-amber-700 border border-amber-300"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        <Download className="size-3.5" />
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
