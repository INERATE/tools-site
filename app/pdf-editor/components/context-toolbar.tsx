"use client";

import { AlignLeft, Bold, ChevronDown, Italic, MoreHorizontal, Underline } from "lucide-react";

export function ContextToolbar({
  font,
  size,
  color,
}: {
  font: string;
  size: number;
  color: string;
}) {
  return (
    <div
      className="absolute -top-12 left-0 z-30 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium whitespace-nowrap text-slate-700 shadow-lg"
    >
      <span className="font-serif text-[13px] font-bold text-slate-500">Aa</span>
      <div className="flex items-center gap-0.5 text-slate-800 font-semibold px-1">
        <span>{font}</span>
        <ChevronDown className="size-3 text-slate-400" />
      </div>

      <div className="h-3.5 w-px bg-slate-200" />

      <div className="flex items-center gap-0.5 font-mono text-slate-800 px-1">
        <span>{size}</span>
        <ChevronDown className="size-3 text-slate-400" />
      </div>

      <div className="h-3.5 w-px bg-slate-200" />

      <div className="flex items-center gap-0.5 px-0.5">
        <span className="size-3.5 rounded-full ring-1 ring-slate-300" style={{ background: color }} />
        <ChevronDown className="size-2.5 text-slate-400" />
      </div>

      <div className="h-3.5 w-px bg-slate-200" />

      <button className="grid size-6 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Bold">
        <Bold className="size-3.5" />
      </button>
      <button className="grid size-6 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Italic">
        <Italic className="size-3.5" />
      </button>
      <button className="grid size-6 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Underline">
        <Underline className="size-3.5" />
      </button>

      <div className="h-3.5 w-px bg-slate-200" />

      <button className="grid size-6 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Alignment">
        <AlignLeft className="size-3.5" />
      </button>
      <button className="grid size-6 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="More formatting">
        <MoreHorizontal className="size-3.5" />
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
