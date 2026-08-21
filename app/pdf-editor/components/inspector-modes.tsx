"use client";

import { FileSearch, PenTool, Sparkles, Square } from "lucide-react";

const LINK =
  "flex items-center justify-center gap-2 rounded-xl py-2.5 text-[12.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95";
const NOTE = "text-[12px] leading-relaxed text-slate-600";

export function OcrPanel() {
  return (
    <div className="flex flex-col gap-3 py-2">
      <p className={NOTE}>
        A scanned page is an image with no text in it. OCR adds a real text layer so it can be edited here.
      </p>
      <a href="/ocr-pdf" className={`${LINK} bg-indigo-600 hover:bg-indigo-700`}>
        <FileSearch className="size-4" />
        Open OCR tool
      </a>
    </div>
  );
}

export function AiPanel({ onOpenAi }: { onOpenAi?: () => void }) {
  return (
    <div className="flex flex-col gap-3 py-2">
      <p className={NOTE}>Summarise this document or ask questions about it.</p>
      <button onClick={onOpenAi} className={`${LINK} bg-gradient-to-r from-indigo-600 to-violet-600`}>
        <Sparkles className="size-4" />
        Open AI assistant
      </button>
      <p className="text-[11px] text-slate-500">
        Uses a shared free allowance, or your own API key. The free option sends the text to our server.
      </p>
    </div>
  );
}

export function AnnotatePanel({ onToolSelect }: { onToolSelect?: (t: string) => void }) {
  return (
    <div className="flex flex-col gap-2 py-2">
      <p className={NOTE}>Pick a tool, then drag on the page to place it.</p>
      <div className="mt-1 grid grid-cols-2 gap-2">
        {[
          { tool: "shapes", icon: Square, label: "Shape" },
          { tool: "esign", icon: PenTool, label: "eSign" },
        ].map((t) => (
          <button
            key={t.tool}
            onClick={() => onToolSelect?.(t.tool)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 p-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
          >
            <t.icon className="size-3.5" /> {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FormPanel() {
  return (
    <div className="py-2">
      <p className={NOTE}>
        Form field editing is not built yet. Filling an existing form works in the Smart PDF Forms tool.
      </p>
      <a href="/smart-forms" className={`${LINK} mt-3 bg-indigo-600 hover:bg-indigo-700`}>
        Open form filler
      </a>
    </div>
  );
}
