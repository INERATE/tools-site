"use client";

import {
  Image as ImageIcon,
  LayoutGrid,
  Minus,
  MoreHorizontal,
  MousePointer2,
  PenLine,
  PenTool,
  Plus,
  Search,
  ShieldAlert,
  Square,
  Type,
} from "lucide-react";
import type { EditorMode } from "../types";

const TABS = [
  "Home",
  "Edit",
  "Annotate",
  "Page",
  "Convert",
  "Organize",
  "Tools",
  "Form",
  "Protect",
] as const;

/**
 * Labels must name what the button actually does. Shape/Draw/eSign were
 * briefly relabelled Crop/Header & Footer/Bates Number to match a mockup,
 * which left the signature pad opening from a button reading "Bates Number".
 * Only list a tool here once it is wired.
 */
export const TOOLS: { id: EditorMode; icon: typeof Type; label: string }[] = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "image", icon: ImageIcon, label: "Image" },
  { id: "shapes", icon: Square, label: "Shape" },
  { id: "draw", icon: PenLine, label: "Draw" },
  { id: "esign", icon: PenTool, label: "eSign" },
  { id: "redact", icon: ShieldAlert, label: "Redact" },
];

export function ToolRibbon({
  tab,
  onTab,
  tool,
  onTool,
  zoom,
  onZoom,
  onToggleSearch,
  onToggleGrid,
}: {
  tab: string;
  onTab: (v: string) => void;
  tool: EditorMode;
  onTool: (v: EditorMode) => void;
  zoom: number;
  onZoom: (v: number) => void;
  onToggleSearch?: () => void;
  onToggleGrid?: () => void;
}) {
  return (
    <div className="relative z-20 flex shrink-0 flex-col border-b border-slate-200/90 bg-white">
      {/* Category Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-100 px-4 pt-1">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => onTab(t)}
              className={`relative px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                active
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t}
              {active && (
                <div className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-indigo-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tool Actions Ribbon */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-slate-50/50">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {TOOLS.map((t) => {
            const active = tool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTool(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                  active
                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <t.icon className={`size-3.5 ${active ? "text-indigo-600" : "text-slate-500"}`} />
                {t.label}
              </button>
            );
          })}

          <button
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            title="More tools"
          >
            <MoreHorizontal className="size-3.5 text-slate-500" />
            <span>More</span>
          </button>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex shrink-0 items-center gap-1.5 text-[12px] text-slate-600">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white shadow-sm">
            <button
              onClick={() => onZoom(Math.max(50, zoom - 25))}
              className="grid size-7 place-items-center text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              title="Zoom out"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-12 text-center font-mono text-[11.5px] font-semibold text-slate-700">
              {zoom}%
            </span>
            <button
              onClick={() => onZoom(Math.min(200, zoom + 25))}
              className="grid size-7 place-items-center text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              title="Zoom in"
            >
              <Plus className="size-3" />
            </button>
          </div>

          <button
            onClick={onToggleSearch}
            className="grid size-7.5 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-colors"
            title="Search text in document"
          >
            <Search className="size-3.5" />
          </button>
          <button
            onClick={onToggleGrid}
            className="grid size-7.5 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-colors"
            title="View page grid"
          >
            <LayoutGrid className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
