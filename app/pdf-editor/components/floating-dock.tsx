"use client";

import { Grid3x3, Hand, Maximize2, Minus, MousePointer2, Plus } from "lucide-react";
import type { EditorMode } from "../types";

export function FloatingDock({
  page,
  pages,
  onPage,
  tool = "select",
  onTool,
  onToggleGrid,
  onFit,
}: {
  page: number;
  pages: number;
  onPage: (i: number) => void;
  tool?: EditorMode;
  onTool?: (t: EditorMode) => void;
  onToggleGrid?: () => void;
  onFit?: () => void;
}) {
  return (
    <div className="pointer-events-auto absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-3 py-1.5 text-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.06)] backdrop-blur-md">
      {/* Pan button */}
      <button
        onClick={() => onTool?.("pan")}
        className={`grid size-7 place-items-center rounded-full transition-colors ${
          tool === "pan"
            ? "bg-indigo-50 text-indigo-600 shadow-2xs font-bold ring-1 ring-indigo-200"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
        title="Pan tool (Drag to scroll)"
      >
        <Hand className="size-3.5" />
      </button>

      {/* Select button */}
      <button
        onClick={() => onTool?.("select")}
        className={`grid size-7 place-items-center rounded-full transition-colors ${
          tool === "select"
            ? "bg-indigo-50 text-indigo-600 shadow-2xs font-bold ring-1 ring-indigo-200"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
        title="Select tool"
      >
        <MousePointer2 className="size-3.5" />
      </button>

      <div className="h-4 w-px bg-slate-200" />

      {/* Prev Page */}
      <button
        onClick={() => onPage(Math.max(0, page - 1))}
        disabled={page <= 0}
        className="grid size-7 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        title="Previous page"
      >
        <Minus className="size-3" />
      </button>

      {/* Page input / counter */}
      <div className="flex items-center gap-1 px-1 font-mono text-[12px] text-slate-600">
        <span className="font-bold text-slate-900">{page + 1}</span>
        <span className="text-slate-400">/</span>
        <span>{pages}</span>
      </div>

      {/* Next Page */}
      <button
        onClick={() => onPage(Math.min(pages - 1, page + 1))}
        disabled={page >= pages - 1}
        className="grid size-7 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        title="Next page"
      >
        <Plus className="size-3" />
      </button>

      <div className="h-4 w-px bg-slate-200" />

      {/* Fit to View */}
      <button
        onClick={onFit}
        className="grid size-7 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        title="Fit page to width / 100%"
      >
        <Maximize2 className="size-3.5" />
      </button>

      {/* Grid view button */}
      <button
        onClick={onToggleGrid}
        className="grid size-7 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        title="Grid view"
      >
        <Grid3x3 className="size-3.5" />
      </button>
    </div>
  );
}
