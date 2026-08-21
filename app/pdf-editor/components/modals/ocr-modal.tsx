"use client";

import { CheckCircle2, FileSearch, Loader2, Sparkles, X } from "lucide-react";
import { useState } from "react";

export function OcrModal({
  isOpen,
  onClose,
  pageCount,
  onRunOcr,
}: {
  isOpen: boolean;
  onClose: () => void;
  pageCount: number;
  onRunOcr?: () => Promise<void>;
}) {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const handleStart = async () => {
    setProcessing(true);
    try {
      if (onRunOcr) {
        await onRunOcr();
      } else {
        // Simulated high-speed OCR analysis
        await new Promise((r) => setTimeout(r, 1200));
      }
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setProcessing(false);
        onClose();
      }, 1000);
    } catch {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <FileSearch className="size-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">In-Place OCR Text Recognition</h3>
            <p className="text-[12px] text-slate-500">Scan and extract editable text without leaving the editor.</p>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 mb-5">
          <p className="text-[12px] leading-relaxed text-slate-700">
            Recognizes text across <strong className="font-semibold text-indigo-950">{pageCount} pages</strong> in this document. Scanned images and photos will be converted into selectable, editable text blocks.
          </p>
        </div>

        {processing ? (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            {done ? (
              <div className="flex flex-col items-center gap-2 text-emerald-600">
                <CheckCircle2 className="size-8 animate-in zoom-in" />
                <span className="text-[13px] font-bold">OCR Complete! Updating text...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-indigo-600">
                <Loader2 className="size-8 animate-spin" />
                <span className="text-[13px] font-medium">Scanning glyphs & text coordinates...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2.5">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStart}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-[12.5px] font-semibold text-white shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all"
            >
              <Sparkles className="size-4" />
              Recognize & Convert
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
