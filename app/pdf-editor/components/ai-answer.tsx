"use client";

export function AiAnswer({ text }: { text: string }) {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50/60 p-3">
      <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-slate-700">{text}</p>
      <p className="mt-2 border-t border-slate-200 pt-2 text-[10.5px] text-slate-500">
        AI can be wrong. Check anything that matters against the document.
      </p>
    </div>
  );
}
