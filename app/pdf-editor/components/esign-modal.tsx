"use client";

import { useEscape } from "../hooks/use-escape";

import { useState } from "react";
import { X } from "lucide-react";
import { SignaturePad } from "../../sign-pdf/signature-pad";

/** Draw a signature, then drop it onto the current page. */
export function ESignModal({
  onClose,
  onPlace,
}: {
  onClose: () => void;
  onPlace: (dataUrl: string, ratio: number) => void;
}) {
  useEscape(onClose);
  const [sig, setSig] = useState<{ url: string; w: number; h: number } | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-6 backdrop-blur-xs" onClick={onClose}>
      <div className="w-[min(560px,100%)] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-[15px] font-bold text-slate-900">Add Your Signature</h2>
          <button onClick={onClose} aria-label="Close" className="grid size-7 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="size-4" />
          </button>
        </div>

        <SignaturePad onChange={setSig} />

        <p className="mt-3 mb-4 text-[12px] text-slate-500">
          The signature will be placed onto the current page. You can drag, resize, or reposition it freely.
        </p>

        <button
          disabled={!sig}
          onClick={() => {
            if (!sig) return;
            onPlace(sig.url, sig.h / sig.w);
            onClose();
          }}
          className="flex h-10 w-full items-center justify-center rounded-xl bg-indigo-600 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 text-[13.5px]"
        >
          Place Signature
        </button>
      </div>
    </div>
  );
}
