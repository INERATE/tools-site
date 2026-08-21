"use client";

import {
  ArrowUpRight,
  Circle,
  Crop,
  EyeOff,
  FileText,
  Highlighter,
  Image as ImageIcon,
  LayoutGrid,
  Link as LinkIcon,
  Minus,
  MoreHorizontal,
  MousePointer2,
  PenLine,
  PenTool,
  Plus,
  Search,
  ShieldAlert,
  Sparkles,
  Square,
  Type,
  Waves,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

export function ToolRibbon({
  tab,
  onTab,
  tool,
  onTool,
  zoom,
  onZoom,
  onToggleSearch,
  onToggleGrid,
  onOpenWatermark,
}: {
  tab: string;
  onTab: (v: string) => void;
  tool: EditorMode;
  onTool: (v: EditorMode) => void;
  zoom: number;
  onZoom: (v: number) => void;
  onToggleSearch?: () => void;
  onToggleGrid?: () => void;
  onOpenWatermark?: () => void;
}) {
  const [shapesOpen, setShapesOpen] = useState(false);
  const [redactOpen, setRedactOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const shapesRef = useRef<HTMLDivElement>(null);
  const redactRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shapesRef.current && !shapesRef.current.contains(e.target as Node)) {
        setShapesOpen(false);
      }
      if (redactRef.current && !redactRef.current.contains(e.target as Node)) {
        setRedactOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-30 flex shrink-0 flex-col border-b border-slate-200/90 bg-white select-none">
      {/* Category Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-100 px-4 pt-1">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => onTab(t)}
              className={`relative px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                active ? "text-indigo-600 font-semibold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t}
              {active && <div className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-indigo-600" />}
            </button>
          );
        })}
      </div>

      {/* Tool Actions Ribbon */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-slate-50/50">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {/* Select Tool */}
          <button
            onClick={() => onTool("select")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
              tool === "select"
                ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <MousePointer2 className="size-3.5 text-slate-500" />
            Select
          </button>

          {/* Image Tool */}
          <button
            onClick={() => onTool("image")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
              tool === "image"
                ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="size-3.5 text-slate-500" />
            Image
          </button>

          {/* Shapes Dropdown Tool */}
          <div ref={shapesRef} className="relative">
            <button
              onClick={() => {
                setShapesOpen((prev) => !prev);
                setRedactOpen(false);
                setMoreOpen(false);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                tool === "shapes" || tool === "circle" || tool === "line" || tool === "highlight"
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Square className="size-3.5 text-slate-500" />
              Shape
              <span className="text-[10px] text-slate-400">▾</span>
            </button>

            {shapesOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50">
                <button
                  onClick={() => {
                    onTool("shapes");
                    setShapesOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Square className="size-3.5" />
                  Rectangle
                </button>
                <button
                  onClick={() => {
                    onTool("circle");
                    setShapesOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Circle className="size-3.5" />
                  Circle / Oval
                </button>
                <button
                  onClick={() => {
                    onTool("line");
                    setShapesOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <ArrowUpRight className="size-3.5" />
                  Line / Arrow
                </button>
                <button
                  onClick={() => {
                    onTool("highlight");
                    setShapesOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Highlighter className="size-3.5" />
                  Highlighter Box
                </button>
              </div>
            )}
          </div>

          {/* Draw Tool */}
          <button
            onClick={() => onTool("draw")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
              tool === "draw"
                ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <PenLine className="size-3.5 text-slate-500" />
            Draw
          </button>

          {/* eSign Tool */}
          <button
            onClick={() => onTool("esign")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
              tool === "esign"
                ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <PenTool className="size-3.5 text-slate-500" />
            eSign
          </button>

          {/* Redact Dropdown Tool */}
          <div ref={redactRef} className="relative">
            <button
              onClick={() => {
                setRedactOpen((prev) => !prev);
                setShapesOpen(false);
                setMoreOpen(false);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                tool === "redact"
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <ShieldAlert className="size-3.5 text-slate-500" />
              Redact
              <span className="text-[10px] text-slate-400">▾</span>
            </button>

            {redactOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50">
                <button
                  onClick={() => {
                    onTool("redact");
                    setRedactOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <div className="size-3.5 rounded-xs bg-black" />
                  Blackout Redact
                </button>
                <button
                  onClick={() => {
                    onTool("redact");
                    setRedactOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <EyeOff className="size-3.5 text-indigo-600" />
                  Blur / Pixelate
                </button>
                <button
                  onClick={() => {
                    onTool("redact");
                    setRedactOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <div className="size-3.5 rounded-xs border border-slate-300 bg-white" />
                  Whiteout
                </button>
              </div>
            )}
          </div>

          {/* ... More Tools Dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => {
                setMoreOpen((prev) => !prev);
                setShapesOpen(false);
                setRedactOpen(false);
              }}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              title="More tools"
            >
              <MoreHorizontal className="size-3.5 text-slate-500" />
              <span>More</span>
            </button>

            {moreOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50">
                <button
                  onClick={() => {
                    onTool("add-text");
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Type className="size-3.5" />
                  Add New Text Box
                </button>
                <button
                  onClick={() => {
                    onTool("link");
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <LinkIcon className="size-3.5" />
                  Add Link / URL
                </button>
                <button
                  onClick={() => {
                    onOpenWatermark?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Waves className="size-3.5" />
                  Watermark
                </button>
                <button
                  onClick={() => {
                    onTool("shapes");
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Crop className="size-3.5" />
                  Crop Page Area
                </button>
                <button
                  onClick={() => {
                    onTool("highlight");
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <FileText className="size-3.5" />
                  Header & Footer
                </button>
              </div>
            )}
          </div>
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
            <span className="w-12 text-center font-mono text-[11.5px] font-semibold text-slate-700">{zoom}%</span>
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
