"use client";

import { RefreshCw, Shield, Sparkles } from "lucide-react";
import { FileCard } from "./file-card";
import type { ToolMode } from "./types";

const HEADING: Record<ToolMode, string> = {
  merge: "Document Queue (Local Memory)",
  split: "Page Extraction Buffer",
  watermark: "Artifact Removal Canvas",
};

/** Left column: the illustrative file queue, two preference toggles, and the run button. */
export function WorkspacePanel({
  mode,
  preserveBookmarks,
  onPreserveBookmarks,
  compressionMode,
  onCompressionMode,
  processing,
  onRun,
}: {
  mode: ToolMode;
  preserveBookmarks: boolean;
  onPreserveBookmarks: (v: boolean) => void;
  compressionMode: "lossless" | "fast";
  onCompressionMode: (v: "lossless" | "fast") => void;
  processing: boolean;
  onRun: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 p-5 sm:p-6 lg:col-span-7">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-[12px] font-medium text-[var(--text-dim)]">
          <span className="text-[10.5px] font-bold tracking-wider text-[var(--accent)] uppercase">{HEADING[mode]}</span>
          <span className="font-mono text-[11px] text-[var(--text-dim)]">2 files loaded · 2.7 MB</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <FileCard name="Financial_Q3_Statement.pdf" meta="4 pages · 1.8 MB · Ready" pages="p. 1–4" />
          <FileCard name="Executive_Summary_Signed.pdf" meta="2 pages · 0.9 MB · Ready" pages="p. 1–2" />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div
            onClick={() => onPreserveBookmarks(!preserveBookmarks)}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg)]/40 p-2.5 transition-colors hover:bg-[var(--bg)]/80"
          >
            <span className="text-[11.5px] font-medium text-[var(--text-dim)]">Preserve Outlines</span>
            <div
              className={`flex size-4 items-center justify-center rounded-full border transition-colors ${
                preserveBookmarks ? "border-emerald-400 bg-emerald-500 text-black" : "border-[var(--border)]"
              }`}
            >
              {preserveBookmarks && <span className="size-1.5 rounded-full bg-white" />}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg)]/40 p-1 text-[11px]">
            {(["lossless", "fast"] as const).map((v) => (
              <button
                key={v}
                onClick={() => onCompressionMode(v)}
                className={`flex-1 rounded py-1 font-medium capitalize transition-all ${
                  compressionMode === v
                    ? "bg-[var(--glass-bg)] font-semibold text-[var(--text)] shadow-sm"
                    : "text-[var(--text-dim)]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] pt-2">
        <div className="flex items-center gap-2 text-[11.5px] text-[var(--text-dim)]">
          <Shield className="size-3.5 text-emerald-400" />
          <span>Zero server telemetry</span>
        </div>

        <button
          onClick={onRun}
          disabled={processing}
          className="clay flex h-9.5 cursor-pointer items-center gap-2 px-5 text-[13px] font-semibold tracking-wide transition-transform active:scale-95 disabled:opacity-75"
        >
          {processing ? (
            <>
              <RefreshCw className="size-3.5 animate-spin" />
              <span>Running…</span>
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" />
              <span>Run Operation (⌘↵)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
