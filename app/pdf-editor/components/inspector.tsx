"use client";

import {
  ChevronRight,
  Copy,
  Edit3,
  Eye,
  FileCheck,
  FileSearch,
  FlipHorizontal,
  Image as ImageIcon,
  Layers,
  RotateCw,
  Sparkles,
  Square,
  Trash2,
  Type,
  X,
} from "lucide-react";
import type { WatermarkConfig } from "../element-types";
import type { FontFamily, TextBlock } from "../types";
import { TypographyPanel } from "./typography-panel";
import { WatermarkPanel } from "./watermark-panel";

const LAYERS = [
  { icon: Type, name: "Text", on: true },
  { icon: ImageIcon, name: "Image", on: true },
  { icon: Square, name: "Shape", on: true },
  { icon: Layers, name: "Background", on: true },
];

const MODES = [
  { id: "edit", icon: Edit3, label: "Edit" },
  { id: "annotate", icon: FileCheck, label: "Annotate" },
  { id: "form", icon: Square, label: "Form" },
  { id: "ocr", icon: FileSearch, label: "OCR" },
  { id: "ai", icon: Sparkles, label: "AI Tools" },
];

export function Inspector({
  block,
  onFamily,
  match,
  watermark,
  onWatermark,
  hasDoc = false,
}: {
  block?: TextBlock | null;
  onFamily?: (id: string, family: FontFamily) => void;
  match: string;
  watermark?: WatermarkConfig;
  onWatermark?: (patch: Partial<WatermarkConfig>) => void;
  hasDoc?: boolean;
}) {
  const confidence = block?.fontMatchConfidence;
  const low = confidence !== undefined && confidence < 60;

  return (
    <aside className="hidden shrink-0 border-l border-slate-200/90 bg-white lg:flex">
      {/* Properties Drawer */}
      <div className="flex w-[260px] flex-col overflow-y-auto p-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-slate-200/70 pb-3">
          <h2 className="text-[13px] font-bold text-slate-900">Edit Text</h2>
          <button className="grid size-6 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="size-3.5" />
          </button>
        </div>

        {/* Matched font status */}
        <div
          className={`mb-4 rounded-xl border px-3 py-2.5 ${
            low
              ? "border-amber-200 bg-amber-50"
              : "border-indigo-100 bg-indigo-50/50"
          }`}
        >
          <p className={`text-[11px] font-bold ${low ? "text-amber-800" : "text-indigo-900"}`}>
            {block ? "Font Matched" : "Selection Ready"}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {block ? `${block.matchedFontName} · ${confidence}% confidence` : match}
          </p>
        </div>

        {/* Typography Controls */}
        <TypographyPanel block={block} onFamily={onFamily} />

        {/* Content Quick Actions */}
        <div className="mt-5 border-t border-slate-200/70 pt-4">
          <h3 className="mb-2 text-[11px] font-bold tracking-wide text-slate-800">Content</h3>
          <div className="flex flex-col gap-1">
            {[
              { icon: Type, label: "Edit Text" },
              { icon: ImageIcon, label: "Edit Image" },
              { icon: Square, label: "Add Link" },
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center justify-between rounded-lg p-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <item.icon className="size-3.5 text-slate-500" />
                  {item.label}
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Page Tools */}
        <div className="mt-5 border-t border-slate-200/70 pt-4">
          <h3 className="mb-2 text-[11px] font-bold tracking-wide text-slate-800">Page</h3>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { icon: RotateCw, label: "Rotate" },
              { icon: FlipHorizontal, label: "Flip" },
              { icon: Copy, label: "Duplicate" },
              { icon: Trash2, label: "Delete" },
            ].map((tool, i) => (
              <button
                key={i}
                title={tool.label}
                className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all"
              >
                <tool.icon className="size-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Watermark Section */}
        {watermark && onWatermark && (
          <div className="mt-5 border-t border-slate-200/70 pt-4">
            <WatermarkPanel value={watermark} onChange={onWatermark} disabled={!hasDoc} />
          </div>
        )}

        {/* Layers Section */}
        <div className="mt-5 border-t border-slate-200/70 pt-4 pb-2">
          <h3 className="mb-2 text-[11px] font-bold tracking-wide text-slate-800">Layers</h3>
          <div className="flex flex-col gap-1">
            {LAYERS.map((l, i) => (
              <div
                key={l.name}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12px] ${
                  i === 0
                    ? "bg-indigo-50 font-semibold text-indigo-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <l.icon className={`size-3.5 ${i === 0 ? "text-indigo-600" : "text-slate-400"}`} />
                  {l.name}
                </span>
                <Eye className="size-3.5 text-slate-400 hover:text-slate-700 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Far Right Mode Strip */}
      <div className="flex w-14 flex-col items-center gap-2 border-l border-slate-200/80 px-1 py-3 bg-slate-50/60">
        {MODES.map((m, i) => {
          const active = i === 0;
          return (
            <button
              key={m.id}
              title={m.label}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all w-12 ${
                active
                  ? "bg-indigo-50 text-indigo-600 shadow-2xs border border-indigo-200/80"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              <m.icon className="size-4" />
              <span className="text-[9px] font-medium tracking-tight">{m.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
