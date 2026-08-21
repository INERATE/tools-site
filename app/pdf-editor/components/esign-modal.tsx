"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SignaturePad } from "../../sign-pdf/signature-pad";

/** Draw a signature, then drop it onto the current page. Reuses the Sign PDF pad verbatim. */
export function ESignModal({
  onClose, onPlace,
}: {
  onClose: () => void;
  onPlace: (dataUrl: string, ratio: number) => void;
}) {
  const [sig, setSig] = useState<{ url: string; w: number; h: number } | null>(null);

  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-black/50 p-6" onClick={onClose}>
      <div className="liquid-card w-[min(560px,100%)] p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold">Add your signature</h2>
          <button onClick={onClose} aria-label="Close" className="grid size-7 place-items-center rounded-lg text-[var(--text-dim)] hover:text-[var(--text)]">
            <X aria-hidden className="size-4" />
          </button>
        </div>

        <SignaturePad onChange={setSig} />

        <p className="mb-3 text-[12px] text-[var(--text-dim)]">
          It is placed on the page you are viewing. Drag the corner handle to remove it.
        </p>

        <button
          disabled={!sig}
          onClick={() => {
            if (!sig) return;
            onPlace(sig.url, sig.h / sig.w);
            onClose();
          }}
          className="clay shimmer h-10 w-full text-[13.5px] font-semibold disabled:cursor-not-allowed disabled:opacity-45"
        >
          Place signature
        </button>
      </div>
    </div>
  );
}
