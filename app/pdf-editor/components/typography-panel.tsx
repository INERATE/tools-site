"use client";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useRef } from "react";
import type { FontFamily, TextBlock } from "../types";

const FIELD =
  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs cursor-pointer";
const LABEL = "mb-1 block text-[11px] font-semibold text-slate-700";

const FAMILIES: { value: FontFamily; label: string }[] = [
  { value: "sans", label: "Poppins / Sans-serif" },
  { value: "sans", label: "Helvetica / Inter" },
  { value: "serif", label: "Times New Roman / Serif" },
  { value: "mono", label: "Courier / Monospace" },
];

export function TypographyPanel({
  block,
  onFamily,
  onFormat,
}: {
  block?: TextBlock | null;
  onFamily?: (id: string, family: FontFamily) => void;
  onFormat?: (id: string, patch: Partial<TextBlock>) => void;
}) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const isBold = block?.fontWeight === "bold" || block?.fontWeight === "700";
  const isItalic = block?.fontStyle === "italic";
  const currentSize = block?.fontSize ? Math.round(block.fontSize) : 14;
  const currentColor = block?.color || "#111827";

  return (
    <div className="flex flex-col gap-4">
      {/* Font Section */}
      <div>
        <label className={LABEL}>Font Family</label>
        <select
          className={FIELD}
          value={block?.matchedFamily ?? "sans"}
          disabled={!block}
          onChange={(e) => {
            if (!block) return;
            const fam = e.target.value as FontFamily;
            onFamily?.(block.id, fam);
            onFormat?.(block.id, { matchedFamily: fam, fontFamily: fam === "serif" ? "Times New Roman" : fam === "mono" ? "Courier" : "Helvetica" });
          }}
        >
          {FAMILIES.map((f, i) => (
            <option key={i} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {/* Weight */}
          <select
            className={FIELD}
            value={isBold ? "bold" : "normal"}
            disabled={!block}
            aria-label="Font weight"
            onChange={(e) => {
              if (!block) return;
              onFormat?.(block.id, { fontWeight: e.target.value === "bold" ? "bold" : "normal" });
            }}
          >
            <option value="normal">Regular</option>
            <option value="bold">Bold</option>
          </select>

          {/* Size */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-2xs">
            <input
              type="number"
              min={6}
              max={120}
              aria-label="Font size"
              className="w-full text-center font-mono text-[12px] font-semibold text-slate-800 outline-none"
              value={currentSize}
              disabled={!block}
              onChange={(e) => {
                if (!block) return;
                const sz = Number(e.target.value);
                if (sz > 0) onFormat?.(block.id, { fontSize: sz });
              }}
            />
            <span className="text-[10px] text-slate-400">px</span>
          </div>
        </div>

        {/* Color swatch & Format toggles */}
        <div className="mt-2.5 flex items-center justify-between gap-1.5 rounded-lg border border-slate-200 bg-slate-50/50 p-1">
          {/* Native Color Picker Trigger */}
          <div className="relative">
            <button
              onClick={() => colorInputRef.current?.click()}
              disabled={!block}
              className="flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-white transition-colors"
              title="Change text color"
            >
              <span className="size-4 rounded-full ring-1 ring-slate-300 shadow-2xs" style={{ background: currentColor }} />
              <ChevronDown className="size-2.5 text-slate-400" />
            </button>
            <input
              ref={colorInputRef}
              type="color"
              value={currentColor}
              className="invisible absolute top-0 left-0 size-0"
              onChange={(e) => {
                if (!block) return;
                onFormat?.(block.id, { color: e.target.value });
              }}
            />
          </div>

          <div className="h-4 w-px bg-slate-200" />

          {/* Bold Toggle */}
          <button
            onClick={() => {
              if (!block) return;
              onFormat?.(block.id, { fontWeight: isBold ? "normal" : "bold" });
            }}
            disabled={!block}
            className={`grid size-7 place-items-center rounded-md transition-all ${
              isBold
                ? "bg-indigo-50 font-bold text-indigo-700 shadow-2xs ring-1 ring-indigo-200"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
            title="Toggle Bold"
          >
            <Bold className="size-3.5" />
          </button>

          {/* Italic Toggle */}
          <button
            onClick={() => {
              if (!block) return;
              onFormat?.(block.id, { fontStyle: isItalic ? "normal" : "italic" });
            }}
            disabled={!block}
            className={`grid size-7 place-items-center rounded-md transition-all ${
              isItalic
                ? "bg-indigo-50 font-bold text-indigo-700 shadow-2xs ring-1 ring-indigo-200"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
            title="Toggle Italic"
          >
            <Italic className="size-3.5" />
          </button>

          {/* Underline Toggle */}
          <button
            onClick={() => {
              if (!block) return;
              onFormat?.(block.id, { fontStyle: isItalic ? "normal" : "italic" });
            }}
            disabled={!block}
            className="grid size-7 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900"
            title="Underline"
          >
            <Underline className="size-3.5" />
          </button>

          <button
            disabled={!block}
            className="grid size-7 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900"
            title="Strikethrough"
          >
            <Strikethrough className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Alignment Section */}
      <div>
        <label className={LABEL}>Alignment</label>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50/50 p-1">
          {[
            { icon: AlignLeft, id: "left" },
            { icon: AlignCenter, id: "center" },
            { icon: AlignRight, id: "right" },
            { icon: AlignJustify, id: "justify" },
          ].map((item) => {
            const active = (block?.align || "left") === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (!block) return;
                  onFormat?.(block.id, { align: item.id as TextBlock["align"] });
                }}
                disabled={!block}
                className={`grid flex-1 place-items-center rounded-md py-1.5 transition-all ${
                  active
                    ? "bg-indigo-50 font-bold text-indigo-700 shadow-2xs ring-1 ring-indigo-200"
                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                }`}
              >
                <item.icon className="size-3.5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacing Section */}
      <div>
        <label className={LABEL}>Spacing</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="mb-1 block text-[10px] text-slate-500">Line Height</span>
            <div className="flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-2xs">
              <input
                type="number"
                step={0.1}
                min={0.8}
                max={3}
                className="w-full text-center font-mono text-[12px] font-medium text-slate-800 outline-none"
                value={block?.lineHeight ?? 1.2}
                disabled={!block}
                onChange={(e) => {
                  if (!block) return;
                  onFormat?.(block.id, { lineHeight: Number(e.target.value) });
                }}
              />
            </div>
          </div>
          <div>
            <span className="mb-1 block text-[10px] text-slate-500">Letter Spacing</span>
            <div className="flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-2xs">
              <input
                type="number"
                step={0.5}
                min={-2}
                max={10}
                className="w-full text-center font-mono text-[12px] font-medium text-slate-800 outline-none"
                value={block?.letterSpacing ?? 0}
                disabled={!block}
                onChange={(e) => {
                  if (!block) return;
                  onFormat?.(block.id, { letterSpacing: Number(e.target.value) });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
