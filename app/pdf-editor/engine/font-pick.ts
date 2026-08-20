import { PDFDocument, StandardFonts, type PDFFont } from "pdf-lib";
import type { FontFamily } from "./font-match";
import type { TextBlock } from "../types";

interface Faces {
  regular: PDFFont;
  bold: PDFFont;
  italic: PDFFont;
  boldItalic: PDFFont;
}

export type FontSet = Record<FontFamily, Faces>;

/**
 * All three standard PDF families (Helvetica/Times/Courier) — each built
 * into every PDF reader already, so embedding all of them costs nothing.
 * Real embedded-font-program matching (fontkit + bundled Latin Modern/Nimbus)
 * is a further step past this; this covers the sans/serif/mono distinction
 * that accounts for most of what makes edited text look out of place.
 */
export async function embedFontSet(doc: PDFDocument): Promise<FontSet> {
  const [sans, serif, mono] = await Promise.all([
    embedFour(doc, StandardFonts.Helvetica, StandardFonts.HelveticaBold, StandardFonts.HelveticaOblique, StandardFonts.HelveticaBoldOblique),
    embedFour(doc, StandardFonts.TimesRoman, StandardFonts.TimesRomanBold, StandardFonts.TimesRomanItalic, StandardFonts.TimesRomanBoldItalic),
    embedFour(doc, StandardFonts.Courier, StandardFonts.CourierBold, StandardFonts.CourierOblique, StandardFonts.CourierBoldOblique),
  ]);
  return { sans, serif, mono };
}

async function embedFour(doc: PDFDocument, r: StandardFonts, b: StandardFonts, i: StandardFonts, bi: StandardFonts): Promise<Faces> {
  const [regular, bold, italic, boldItalic] = await Promise.all(
    [r, b, i, bi].map((f) => doc.embedFont(f)),
  );
  return { regular, bold, italic, boldItalic };
}

export function pickFont(block: TextBlock, fonts: FontSet): PDFFont {
  const faces = fonts[block.matchedFamily ?? "sans"];
  const bold = block.fontWeight === "bold" || block.fontWeight === "700";
  const italic = block.fontStyle === "italic";
  if (bold && italic) return faces.boldItalic;
  if (bold) return faces.bold;
  if (italic) return faces.italic;
  return faces.regular;
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
