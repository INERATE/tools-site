"use client";

import { Cloud, ChevronDown, Redo2, Share2, Undo2 } from "lucide-react";
import type { ExportRisk } from "../engine/risk";
import { ExportButton } from "./export-button";

const ICON_BTN =
  "grid size-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 " +
  "hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

const ZERO_RISK: ExportRisk = { overflow: 0, seam: 0, math: 0, total: 0 };

export function EditorTopbar({
  fileName,
  edited = 0,
  busy = false,
  outUrl = null,
  onExport,
  canExport = false,
  risk = ZERO_RISK,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: {
  fileName: string;
  edited?: number;
  busy?: boolean;
  outUrl?: string | null;
  onExport?: () => void;
  canExport?: boolean;
  risk?: ExportRisk;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}) {
  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200/90 bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Brand & Document info */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Brand Icon */}
        <div className="flex items-center gap-2">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 font-bold text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="size-4.5 fill-current" stroke="none">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v-4h2c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-.5v1h.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-2v-4h2zm6.5 0h-2v-4h2c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5zm-6.5-2.5h-1v-2h1c.28 0 .5.22.5.5s-.22.5-.5.5zm6.5 1.5h-1v-2h1c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5z" />
            </svg>
          </div>
          <span className="text-[14px] font-bold tracking-tight text-slate-900">PDF Editor</span>
        </div>

        {/* Filename Dropdown */}
        <button className="flex min-w-0 items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50/60 px-2.5 py-1 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-100/80">
          <span className="max-w-[200px] truncate">{fileName || "Untitled Document.pdf"}</span>
          <ChevronDown className="size-3.5 shrink-0 text-slate-400" />
        </button>

        {/* Saved Status */}
        <span className="hidden items-center gap-1.5 rounded-full bg-slate-100/70 px-2.5 py-0.5 text-[11.5px] font-medium text-slate-500 sm:flex">
          <Cloud className="size-3.5 text-slate-400" />
          {edited > 0 ? (
            <span className="flex items-center gap-1 text-amber-600">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              {edited} {edited === 1 ? "edit" : "edits"} pending
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Saved
            </span>
          )}
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex shrink-0 items-center gap-2">
        <button onClick={onUndo} disabled={!canUndo} className={ICON_BTN} title="Undo (Ctrl+Z)">
          <Undo2 className="size-4" />
        </button>
        <button onClick={onRedo} disabled={!canRedo} className={ICON_BTN} title="Redo (Ctrl+Y)">
          <Redo2 className="size-4" />
        </button>

        <div className="mx-1 h-4 w-px bg-slate-200" />

        <button className="hidden h-8.5 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 text-[12.5px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 sm:flex">
          <Share2 className="size-3.5 text-slate-500" />
          Share
        </button>

        <ExportButton
          fileName={fileName}
          busy={busy}
          outUrl={outUrl}
          onExport={onExport}
          canExport={canExport}
          risk={risk}
        />

        {/* User Profile Avatar */}
        <div
          className="grid size-8.5 place-items-center rounded-full bg-gradient-to-tr from-indigo-900 to-indigo-700 text-[11.5px] font-bold text-white shadow-sm ring-2 ring-indigo-100"
          title="Piyush Sharma"
        >
          PS
        </div>
      </div>
    </header>
  );
}
