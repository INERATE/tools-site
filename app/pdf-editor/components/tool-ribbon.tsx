"use client";

import {
  ArrowDownUp,
  ArrowUpRight,
  CheckSquare,
  Circle,
  Crop,
  EyeOff,
  FileCheck,
  FileDown,
  FileImage,
  FileSearch,
  FileSpreadsheet,
  FileText,
  Highlighter,
  Image as ImageIcon,
  Key,
  LayoutGrid,
  Link as LinkIcon,
  Lock,
  MessageSquare,
  Minus,
  MoreHorizontal,
  MousePointer2,
  PenLine,
  PenTool,
  Plus,
  RotateCcw,
  RotateCw,
  Search,
  ShieldAlert,
  Sparkles,
  Split,
  Square,
  Strikethrough,
  Trash2,
  Type,
  Underline,
  Unlock,
  Waves,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { EditorMode } from "../types";

export const TABS = [
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

export type RibbonTab = (typeof TABS)[number];

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
  onRotatePage,
  onDeletePage,
  onOpenAi,
  onAddText,
  onOpenOcr,
  onOpenForm,
  onOpenWatermarkEraser,
  redactStyle = "blackout",
  onRedactStyle,
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
  onRotatePage?: () => void;
  onDeletePage?: () => void;
  onOpenAi?: () => void;
  onAddText?: () => void;
  onOpenOcr?: () => void;
  onOpenForm?: () => void;
  onOpenWatermarkEraser?: () => void;
  redactStyle?: "blackout" | "blur" | "whiteout";
  onRedactStyle?: (s: "blackout" | "blur" | "whiteout") => void;
}) {
  const [shapesOpen, setShapesOpen] = useState(false);
  const [redactOpen, setRedactOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const shapesRef = useRef<HTMLDivElement>(null);
  const redactRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

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
      <div className="flex items-center gap-1 border-b border-slate-100 px-2 sm:px-4 pt-1 overflow-x-auto no-scrollbar">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => onTab(t)}
              className={`relative shrink-0 px-3 sm:px-3.5 py-2 text-[12px] sm:text-[12.5px] font-medium transition-colors ${
                active ? "text-indigo-600 font-semibold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t}
              {active && <div className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-indigo-600" />}
            </button>
          );
        })}
      </div>

      {/* Dynamic Actions Ribbon per Tab */}
      <div className="relative flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-50/50 overflow-visible">
        <div className="flex min-w-0 flex-wrap items-center gap-1 sm:gap-1.5">
          {/* TAB: Home or Edit */}
          {(tab === "Home" || tab === "Edit") && (
            <>
              <button
                onClick={() => onTool("select")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                  tool === "select"
                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <MousePointer2 className="size-3.5 text-slate-500" />
                Select
              </button>

              <button
                onClick={() => onTool("edit-text")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                  tool === "edit-text"
                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Type className="size-3.5 text-slate-500" />
                Edit Text
              </button>

              <button
                onClick={() => onTool("image")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <ImageIcon className="size-3.5 text-slate-500" />
                Add Image
              </button>

              <button
                onClick={() => onTool("draw")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                  tool === "draw"
                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <PenLine className="size-3.5 text-slate-500" />
                Draw
              </button>

              <button
                onClick={() => onTool("esign")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <PenTool className="size-3.5 text-slate-500" />
                eSign
              </button>

              {/* Shapes Dropdown */}
              <div ref={shapesRef} className="relative">
                <button
                  onClick={() => {
                    setShapesOpen((prev) => !prev);
                    setRedactOpen(false);
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                    tool === "shapes" || tool === "circle" || tool === "line" || tool === "highlight"
                      ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Square className="size-3.5 text-slate-500" />
                  Shape ▾
                </button>
                {shapesOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-44 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl p-1.5 shadow-2xl z-[100]">
                    <button
                      onClick={() => {
                        onTool("shapes");
                        setShapesOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Square className="size-3.5" /> Rectangle
                    </button>
                    <button
                      onClick={() => {
                        onTool("circle");
                        setShapesOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Circle className="size-3.5" /> Circle / Oval
                    </button>
                    <button
                      onClick={() => {
                        onTool("line");
                        setShapesOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <ArrowUpRight className="size-3.5" /> Line / Arrow
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB: Annotate */}
          {tab === "Annotate" && (
            <>
              <button
                onClick={() => onTool("highlight")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                  tool === "highlight"
                    ? "bg-amber-50 text-amber-800 ring-1 ring-amber-300 shadow-sm font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Highlighter className="size-3.5 text-amber-500" />
                Highlight
              </button>

              <button
                onClick={() => onTool("draw")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                  tool === "draw"
                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <PenLine className="size-3.5 text-slate-500" />
                Pen Drawing
              </button>

              <button
                onClick={() => onTool("shapes")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Square className="size-3.5 text-slate-500" />
                Rectangle Box
              </button>

              <button
                onClick={() => onTool("circle")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Circle className="size-3.5 text-slate-500" />
                Circle Stamp
              </button>

              <button
                onClick={() => onTool("esign")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <PenTool className="size-3.5 text-slate-500" />
                Signature
              </button>
            </>
          )}

          {/* TAB: Page */}
          {tab === "Page" && (
            <>
              <button
                onClick={onRotatePage}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                title="Rotate page 90 degrees"
              >
                <RotateCw className="size-3.5 text-indigo-600" />
                Rotate 90°
              </button>
              <button
                onClick={onRotatePage}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                title="Rotate page counter-clockwise"
              >
                <RotateCcw className="size-3.5 text-indigo-600" />
                Rotate Left
              </button>
              <button
                onClick={onDeletePage}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-rose-600 hover:bg-rose-50"
                title="Mark page for deletion"
              >
                <Trash2 className="size-3.5" />
                Delete Page
              </button>
              <button
                onClick={onToggleGrid}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <LayoutGrid className="size-3.5 text-slate-500" />
                Page Overview
              </button>
            </>
          )}

          {/* TAB: Convert */}
          {tab === "Convert" && (
            <>
              <a
                href="/pdf-to-word"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <FileText className="size-3.5 text-blue-600" />
                PDF to Word
              </a>
              <a
                href="/pdf-to-jpg"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <FileImage className="size-3.5 text-emerald-600" />
                PDF to JPG
              </a>
              <a
                href="/ocr-pdf"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <FileSearch className="size-3.5 text-amber-600" />
                OCR Scanned Text
              </a>
            </>
          )}

          {/* TAB: Organize */}
          {tab === "Organize" && (
            <>
              <button
                onClick={onToggleGrid}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-[12.5px] font-semibold text-indigo-700 ring-1 ring-indigo-300"
              >
                <LayoutGrid className="size-3.5" />
                Reorder Pages Grid
              </button>
              <a
                href="/merge-pdf"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Plus className="size-3.5 text-indigo-600" />
                Merge PDFs
              </a>
              <a
                href="/split-pdf"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Split className="size-3.5 text-indigo-600" />
                Split Pages
              </a>
              <a
                href="/compress-pdf"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Zap className="size-3.5 text-amber-600" />
                Compress PDF
              </a>
            </>
          )}

          {/* TAB: Tools */}
          {tab === "Tools" && (
            <>
              <button
                onClick={onOpenAi}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 px-3 py-1.5 text-[12.5px] font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:from-indigo-100 hover:to-violet-100 transition-colors"
              >
                <Sparkles className="size-3.5 text-indigo-600" />
                AI Assistant & Summary
              </button>
              <button
                onClick={onOpenWatermark}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Waves className="size-3.5 text-indigo-600" />
                Watermark Settings
              </button>
              <button
                onClick={onToggleSearch}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Search className="size-3.5 text-slate-500" />
                Keyword Search
              </button>
            </>
          )}

          {/* TAB: Form */}
          {tab === "Form" && (
            <>
              {/* These were wired to add-text, shapes and esign, so Checkbox
                  drew a rectangle and Signature Field opened the drawing pad.
                  They now place real AcroForm widgets. */}
              {([
                ["text-field", Type, "Text Input Field"],
                ["checkbox", Square, "Checkbox Field"],
                ["sig-field", PenTool, "Signature Field"],
              ] as const).map(([id, Icon, label]) => (
                <button
                  key={id}
                  onClick={() => onTool(id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                    tool === id
                      ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="size-3.5 text-indigo-600" />
                  {label}
                </button>
              ))}
            </>
          )}

          {/* TAB: Protect */}
          {tab === "Protect" && (
            <>
              <div ref={redactRef} className="relative">
                <button
                  onClick={() => {
                    setRedactOpen((prev) => !prev);
                    setShapesOpen(false);
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                    tool === "redact"
                      ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 shadow-sm font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <ShieldAlert className="size-3.5 text-rose-600" />
                  Redact Sensitive Data ▾
                </button>
                {redactOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-52 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl p-1.5 shadow-2xl z-[100]">
                    <button
                      onClick={() => {
                        onTool("redact");
                        onRedactStyle?.("blackout");
                        setRedactOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <div className="size-3.5 rounded-xs bg-black" />
                      Blackout Mask (Permanent)
                    </button>
                    <button
                      onClick={() => {
                        onTool("redact");
                        onRedactStyle?.("blur");
                        setRedactOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <EyeOff className="size-3.5 text-indigo-600" />
                      Blur Filter / Frosted Glass
                    </button>
                    <button
                      onClick={() => {
                        onTool("redact");
                        onRedactStyle?.("whiteout");
                        setRedactOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <div className="size-3.5 rounded-xs border border-slate-300 bg-white" />
                      Whiteout Mask
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onOpenWatermark}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Waves className="size-3.5 text-indigo-600" />
                Confidential Watermark
              </button>
              <a
                href="/protect-pdf"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Lock className="size-3.5 text-emerald-600" />
                Password Protect
              </a>
              <a
                href="/unlock-pdf"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-100"
              >
                <Unlock className="size-3.5 text-amber-600" />
                Unlock PDF
              </a>
            </>
          )}

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
              <div className="absolute top-full left-0 mt-1.5 w-52 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl p-1.5 shadow-2xl z-[100]">
                <button
                  onClick={() => {
                    onAddText?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Type className="size-3.5 text-indigo-600" />
                  Add New Text Box
                </button>
                <button
                  onClick={() => {
                    onOpenOcr?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <FileSearch className="size-3.5 text-indigo-600" />
                  OCR Scanned Text
                </button>
                <button
                  onClick={() => {
                    onOpenForm?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <CheckSquare className="size-3.5 text-indigo-600" />
                  Interactive Form Fields
                </button>
                <button
                  onClick={() => {
                    onOpenWatermark?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Waves className="size-3.5 text-indigo-600" />
                  Watermark Settings
                </button>
                <button
                  onClick={() => {
                    onToggleGrid?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <LayoutGrid className="size-3.5 text-indigo-600" />
                  Page Grid / Reorder
                </button>
                <button
                  onClick={() => {
                    onOpenWatermarkEraser?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Sparkles className="size-3.5 text-rose-500" />
                  AI Watermark & Object Eraser
                </button>
                <button
                  onClick={() => {
                    onOpenAi?.();
                    setMoreOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Sparkles className="size-3.5 text-indigo-600" />
                  AI Summarizer & Q&A
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
