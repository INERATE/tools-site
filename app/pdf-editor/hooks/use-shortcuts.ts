"use client";

import { useEffect } from "react";
import type { usePdfEditor } from "./use-pdf-editor";

export function useShortcuts(e: ReturnType<typeof usePdfEditor>) {
  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      const isInput =
        evt.target instanceof HTMLInputElement ||
        evt.target instanceof HTMLTextAreaElement ||
        (evt.target instanceof HTMLElement && evt.target.isContentEditable);

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const mod = isMac ? evt.metaKey : evt.ctrlKey;

      // 1. Undo: Ctrl+Z / Cmd+Z (when not in native text input)
      if (mod && !evt.shiftKey && evt.key.toLowerCase() === "z") {
        if (!isInput) {
          evt.preventDefault();
          e.undo();
        }
        return;
      }

      // 2. Redo: Ctrl+Y / Cmd+Y or Ctrl+Shift+Z / Cmd+Shift+Z
      if (
        (mod && evt.key.toLowerCase() === "y") ||
        (mod && evt.shiftKey && evt.key.toLowerCase() === "z")
      ) {
        if (!isInput) {
          evt.preventDefault();
          e.redo();
        }
        return;
      }

      // 3. Delete / Backspace: Delete selected element if not actively typing inside contentEditable
      if ((evt.key === "Delete" || evt.key === "Backspace") && !isInput) {
        if (e.selected) {
          evt.preventDefault();
          e.deleteBlock(e.selected);
        } else if (e.anno.picked) {
          evt.preventDefault();
          e.anno.remove(e.anno.picked);
        }
        return;
      }

      // 4. Bold: Ctrl+B / Cmd+B on selected block
      if (mod && evt.key.toLowerCase() === "b" && e.selected) {
        evt.preventDefault();
        const b = e.blocks.find((x) => x.id === e.selected);
        if (b) {
          const isBold = b.fontWeight === "bold" || b.fontWeight === "700";
          e.updateFormat(b.id, { fontWeight: isBold ? "normal" : "bold" });
        }
        return;
      }

      // 5. Italic: Ctrl+I / Cmd+I on selected block
      if (mod && evt.key.toLowerCase() === "i" && e.selected) {
        evt.preventDefault();
        const b = e.blocks.find((x) => x.id === e.selected);
        if (b) {
          const isItalic = b.fontStyle === "italic";
          e.updateFormat(b.id, { fontStyle: isItalic ? "normal" : "italic" });
        }
        return;
      }

      // 6. Underline: Ctrl+U / Cmd+U on selected block
      if (mod && evt.key.toLowerCase() === "u" && e.selected) {
        evt.preventDefault();
        const b = e.blocks.find((x) => x.id === e.selected);
        if (b) {
          e.updateFormat(b.id, { underline: !b.underline });
        }
        return;
      }

      // 7. Escape: Deselect
      if (evt.key === "Escape") {
        e.setSelected(null);
        e.anno.setPicked(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [e]);
}
