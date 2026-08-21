"use client";

import { useEffect } from "react";

/**
 * Closes an overlay on Escape. Every modal here trapped the user otherwise —
 * the only way out was hitting the exact X, and a stuck dialog blocks the
 * entire editor behind it.
 */
export function useEscape(onClose: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
}
