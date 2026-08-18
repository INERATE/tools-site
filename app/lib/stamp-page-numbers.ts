import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type NumberPosition = "bottom-center" | "bottom-right" | "top-right";
export type NumberStyle = "n" | "n-of-total";

const MARGIN = 28;
const SIZE = 10;

// ponytail: coordinates assume an upright page — a page with a /Rotate entry
// will show the stamp in the wrong corner. Fine for the common case; revisit
// if rotated-page reports come in.
function place(position: NumberPosition, pw: number, ph: number, textWidth: number) {
  if (position === "bottom-right") return { x: pw - MARGIN - textWidth, y: MARGIN };
  if (position === "top-right") return { x: pw - MARGIN - textWidth, y: ph - MARGIN };
  return { x: pw / 2 - textWidth / 2, y: MARGIN };
}

/** Stamps a running page number onto every page of a PDF. */
export async function stampPageNumbers(
  file: File,
  opts: { position: NumberPosition; style: NumberStyle; startAt: number },
): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  const lastNumber = opts.startAt + pages.length - 1;

  pages.forEach((page, i) => {
    const n = opts.startAt + i;
    const text = opts.style === "n-of-total" ? `${n} / ${lastNumber}` : `${n}`;
    const textWidth = font.widthOfTextAtSize(text, SIZE);
    const { width, height } = page.getSize();
    const { x, y } = place(opts.position, width, height, textWidth);
    page.drawText(text, { x, y, size: SIZE, font, color: rgb(0.4, 0.4, 0.42) });
  });

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
