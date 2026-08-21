"use client";

import { useCallback, useState } from "react";
import type { SignatureElement, WatermarkConfig } from "../element-types";

export const NO_WATERMARK: WatermarkConfig = {
  enabled: false, text: "CONFIDENTIAL", type: "text", opacity: 0.3, rotation: 30,
  fontSize: 0, fontFamily: "Helvetica", color: "#808080",
  layout: "diagonal", layer: "above", pages: "all",
};

/** Watermark + signature state, kept out of the text-editing history — they are
 * document-wide settings, not per-block edits, so undo should not toggle them. */
export function useOverlays(onChange: () => void) {
  const [watermark, setWatermark] = useState<WatermarkConfig>(NO_WATERMARK);
  const [signatures, setSignatures] = useState<SignatureElement[]>([]);

  const editWatermark = useCallback((patch: Partial<WatermarkConfig>) => {
    onChange();
    setWatermark((w) => ({ ...w, ...patch }));
  }, [onChange]);

  const addSignature = useCallback((sig: SignatureElement) => {
    onChange();
    setSignatures((s) => [...s, sig]);
  }, [onChange]);

  const removeSignature = useCallback((id: string) => {
    onChange();
    setSignatures((s) => s.filter((x) => x.id !== id));
  }, [onChange]);

  /** `keep` re-installs a restored watermark instead of clearing to default. */
  const resetOverlays = useCallback((keep?: WatermarkConfig) => {
    setWatermark(keep ?? NO_WATERMARK);
    setSignatures([]);
  }, []);

  return { watermark, signatures, editWatermark, addSignature, removeSignature, resetOverlays };
}
