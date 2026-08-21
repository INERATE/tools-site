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
import type { FontFamily, TextBlock } from "../types";

const FIELD =
  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs";
const LABEL = "mb-1 block text-[11px] font-semibold text-slate-700";

const FAMILIES: { value: FontFamily; label: string }[] = [
  { value: "sans", label: "Poppins" },
  { value: "sans", label: "Inter" },
  { value: "sans", label: "Helvetica" },
  { value: "serif", label: "Times New Roman" },
  { value: "mono", label: "Courier" },
];

export function TypographyPanel({
  block,
  onFamily,
}: {
  block?: TextBlock | null;
  onFamily?: (id: string, family: FontFamily) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Font Section */}
      <div>
        <label className={LABEL}>Font</label>
        <select
          className={FIELD}
          value={block?.matchedFamily ?? "sans"}
          disabled={!block}
          onChange={(e) => block && onFamily?.(block.id, e.target.value as FontFamily)}
        >
          {FAMILIES.map((f, i) => (
            <option key={i} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <select className={FIELD} defaultValue="Bold" disabled={!block} aria-label="Font weight">
            <option>Bold</option>
            <option>SemiBold</option>
            <option>Medium</option>
            <option>Regular</option>
          </select>
          <div className="flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-2xs">
            <input
              type="number"
              min={1}
              aria-label="Font size"
              className="w-full text-center font-mono text-[12px] font-semibold text-slate-800 outline-none"
              defaultValue={block?.fontSize ? Math.round(block.fontSize) : 32}
              disabled={!block}
            />
            <ChevronDown className="size-3 text-slate-400" />
          </div>
        </div>

        {/* Color swatch & Format toggles */}
        <div className="mt-2.5 flex items-center justify-between gap-1.5 rounded-lg border border-slate-200 bg-slate-50/50 p-1">
          <button className="flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-white transition-colors" title="Text color">
            <span className="size-4 rounded-full bg-indigo-600 ring-1 ring-slate-300 shadow-2xs" />
            <ChevronDown className="size-2.5 text-slate-400" />
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <button className="grid size-7 place-items-center rounded-md bg-indigo-50 font-bold text-indigo-700 shadow-2xs" title="Bold">
            <Bold className="size-3.5" />
          </button>
          <button className="grid size-7 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900" title="Italic">
            <Italic className="size-3.5" />
          </button>
          <button className="grid size-7 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900" title="Underline">
            <Underline className="size-3.5" />
          </button>
          <button className="grid size-7 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900" title="Strikethrough">
            <Strikethrough className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Alignment Section */}
      <div>
        <label className={LABEL}>Alignment</label>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50/50 p-1">
          {[AlignLeft, AlignCenter, AlignRight, AlignJustify].map((Icon, i) => (
            <button
              key={i}
              className={`grid flex-1 place-items-center rounded-md py-1.5 transition-all ${
                i === 1
                  ? "bg-indigo-50 font-bold text-indigo-700 shadow-2xs ring-1 ring-indigo-200"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              <Icon className="size-3.5" />
            </button>
          ))}
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
                className="w-full text-center font-mono text-[12px] font-medium text-slate-800 outline-none"
                defaultValue="1.4"
              />
              <ChevronDown className="size-3 text-slate-400" />
            </div>
          </div>
          <div>
            <span className="mb-1 block text-[10px] text-slate-500">Paragraph Spacing</span>
            <div className="flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-2xs">
              <input
                className="w-full text-center font-mono text-[12px] font-medium text-slate-800 outline-none"
                defaultValue="12"
              />
              <ChevronDown className="size-3 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
