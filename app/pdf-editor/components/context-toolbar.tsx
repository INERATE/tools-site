"use client";

import { AlignLeft, Bold, ChevronDown, Italic, Underline } from "lucide-react";
import { useRef } from "react";
import type { TextBlock } from "../types";

export function ContextToolbar({
  block,
  font,
  size,
  color,
  onFormat,
}: {
  block?: TextBlock;
  font: string;
  size: number;
  color: string;
  onFormat?: (patch: Partial<TextBlock>) => void;
}) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const isBold = block?.fontWeight === "bold" || block?.fontWeight === "700";
  const isItalic = block?.fontStyle === "italic";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute -top-12 left-0 z-50 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-slate-700 shadow-xl select-none"
    >
      <span className="font-serif text-[13px] font-bold text-slate-500">Aa</span>
      <div className="flex items-center gap-0.5 text-slate-800 font-semibold px-1">
        <span>{font}</span>
      </div>

      <div className="h-3.5 w-px bg-slate-200" />

      {/* Font Size Increaser / Decreaser */}
      <div className="flex items-center gap-1 font-mono text-slate-800 px-1">
        <button
          onClick={() => onFormat?.({ fontSize: Math.max(6, size - 1) })}
          className="grid size-5 place-items-center rounded hover:bg-slate-100 font-bold"
          title="Decrease font size"
        >
          -
        </button>
        <span className="w-5 text-center">{size}</span>
        <button
          onClick={() => onFormat?.({ fontSize: Math.min(120, size + 1) })}
          className="grid size-5 place-items-center rounded hover:bg-slate-100 font-bold"
          title="Increase font size"
        >
          +
        </button>
      </div>

      <div className="h-3.5 w-px bg-slate-200" />

      {/* Text Color Picker */}
      <div className="relative flex items-center">
        <button
          onClick={() => colorInputRef.current?.click()}
          className="flex items-center gap-0.5 p-1 rounded hover:bg-slate-100"
          title="Change text color"
        >
          <span className="size-3.5 rounded-full ring-1 ring-slate-300 shadow-2xs" style={{ background: color }} />
          <ChevronDown className="size-2.5 text-slate-400" />
        </button>
        <input
          ref={colorInputRef}
          type="color"
          value={color}
          className="invisible absolute top-0 left-0 size-0"
          onChange={(e) => onFormat?.({ color: e.target.value })}
        />
      </div>

      <div className="h-3.5 w-px bg-slate-200" />

      {/* Bold */}
      <button
        onClick={() => onFormat?.({ fontWeight: isBold ? "normal" : "bold" })}
        className={`grid size-6 place-items-center rounded-md transition-all ${
          isBold ? "bg-indigo-50 font-bold text-indigo-700 ring-1 ring-indigo-200" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
        title="Toggle Bold"
      >
        <Bold className="size-3.5" />
      </button>

      {/* Italic */}
      <button
        onClick={() => onFormat?.({ fontStyle: isItalic ? "normal" : "italic" })}
        className={`grid size-6 place-items-center rounded-md transition-all ${
          isItalic ? "bg-indigo-50 font-bold text-indigo-700 ring-1 ring-indigo-200" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
        title="Toggle Italic"
      >
        <Italic className="size-3.5" />
      </button>

      {/* Underline */}
      <button
        onClick={() => onFormat?.({ fontStyle: isItalic ? "normal" : "italic" })}
        className="grid size-6 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        title="Underline"
      >
        <Underline className="size-3.5" />
      </button>

      <div className="h-3.5 w-px bg-slate-200" />

      {/* Align Left */}
      <button
        onClick={() => onFormat?.({ align: "left" })}
        className="grid size-6 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        title="Align left"
      >
        <AlignLeft className="size-3.5" />
      </button>
    </div>
  );
}

/** Scale & selection handles for active bounding box */
export function SelectionHandles() {
  const at = [
    "-top-1.5 -left-1.5",
    "-top-1.5 -right-1.5",
    "-bottom-1.5 -left-1.5",
    "-bottom-1.5 -right-1.5",
  ];
  return (
    <>
      {at.map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} size-2.5 rounded-full border-2 border-indigo-600 bg-white shadow-2xs`}
        />
      ))}
    </>
  );
}
