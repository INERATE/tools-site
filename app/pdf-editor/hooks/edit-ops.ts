import { measureWidth } from "../engine/measure-text";
import type { TextBlock } from "../types";

/** Applies new text to one block and re-checks whether it still fits. */
export function withText(blocks: TextBlock[], id: string, text: string): TextBlock[] {
  return blocks.map((b) => {
    if (b.id !== id) return b;
    const bold = b.fontWeight === "bold" || b.fontWeight === "700";
    const isOverflowing = measureWidth(text, b.fontSize, b.matchedFamily ?? "sans", bold) > b.pdfWidth * 1.02;
    return { ...b, text, isEdited: text !== b.originalText, isOverflowing };
  });
}

/** A manual family override always counts as certain — 100, not the detected score. */
export function withFamily(blocks: TextBlock[], id: string, matchedFamily: TextBlock["matchedFamily"]): TextBlock[] {
  return blocks.map((b) => (b.id === id ? { ...b, matchedFamily, fontMatchConfidence: 100 } : b));
}
