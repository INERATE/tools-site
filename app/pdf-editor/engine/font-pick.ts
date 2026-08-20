import { PDFDocument, StandardFonts, type PDFFont } from "pdf-lib";
import type { TextBlock } from "../types";

export interface FontSet {
  regular: PDFFont;
  bold: PDFFont;
  italic: PDFFont;
  boldItalic: PDFFont;
}

/**
 * Phase 1 uses the four standard Helvetica faces only. Real family matching
 * (bundled Latin Modern / Nimbus / STIX, subset-tag stripping, a confidence
 * score) is Phase 2 — it changes which font is embedded, not how the page is
 * written, so it slots in here without touching the append-only exporter.
 */
export async function embedFontSet(doc: PDFDocument): Promise<FontSet> {
  return {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    italic: await doc.embedFont(StandardFonts.HelveticaOblique),
    boldItalic: await doc.embedFont(StandardFonts.HelveticaBoldOblique),
  };
}

export function pickFont(block: TextBlock, fonts: FontSet): PDFFont {
  const bold = block.fontWeight === "bold" || block.fontWeight === "700";
  const italic = block.fontStyle === "italic";
  if (bold && italic) return fonts.boldItalic;
  if (bold) return fonts.bold;
  if (italic) return fonts.italic;
  return fonts.regular;
}

export function hexToRgb(hex: string) {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16) / 255,
    g: parseInt(m[2], 16) / 255,
    b: parseInt(m[3], 16) / 255,
  };
}

/** True when the replacement text is wider than the space it has to fit. */
export function overflows(block: TextBlock, font: PDFFont): boolean {
  return font.widthOfTextAtSize(block.text, block.fontSize) > block.pdfWidth * 1.02;
}
