"use client";

import { CheckSquare, FileSearch, PenTool, Sparkles, Square } from "lucide-react";

const PREMIUM_BTN =
  "flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-2.5 text-[12.5px] font-semibold text-indigo-700 shadow-2xs hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:shadow-xs transition-all";

const NOTE = "text-[12px] leading-relaxed text-slate-600";

export function OcrPanel({ onOpenOcr }: { onOpenOcr?: () => void }) {
  return (
    <div className="flex flex-col gap-3 py-2">
      <p className={NOTE}>
        A scanned page is an image with no text in it. OCR adds a real text layer so it can be edited here.
      </p>
      <button onClick={onOpenOcr} className={PREMIUM_BTN}>
        <FileSearch className="size-4 text-indigo-600" />
        Recognize Text (In-Place OCR)
      </button>
    </div>
  );
}

export function AiPanel({ onOpenAi }: { onOpenAi?: () => void }) {
  return (
    <div className="flex flex-col gap-3 py-2">
      <p className={NOTE}>Summarise this document or ask questions about it.</p>
      <button onClick={onOpenAi} className={PREMIUM_BTN}>
        <Sparkles className="size-4 text-indigo-600" />
        Open AI Assistant & Summary
      </button>
      <p className="text-[11px] text-slate-500">
        Uses Cloudflare Workers AI edge inference or your own custom API key.
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
            <t.icon className="size-3.5 text-indigo-600" /> {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FormPanel({ onOpenForm }: { onOpenForm?: () => void }) {
  return (
    <div className="flex flex-col gap-3 py-2">
      <p className={NOTE}>
        Insert interactive form fields, checkboxes, or signature blocks directly on this document.
      </p>
      <button onClick={onOpenForm} className={PREMIUM_BTN}>
        <CheckSquare className="size-4 text-indigo-600" />
        Insert Form Fields
      </button>
    </div>
  );
}
