import { PDFDocument } from "pdf-lib";

export type Insets = { top: number; bottom: number; left: number; right: number };

/**
 * Sets every page's CropBox to trim the given margins (as fractions 0-1 of
 * that page's own width/height) — non-destructive, the same approach
 * Acrobat's own crop tool uses: content outside the box is hidden, not
 * deleted, so nothing is lost if the crop is too aggressive.
 */
export async function cropPdf(file: File, insets: Insets): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  for (const page of doc.getPages()) {
    const { width, height } = page.getSize();
    const x = width * insets.left;
    const y = height * insets.bottom;
    const w = width * (1 - insets.left - insets.right);
    const h = height * (1 - insets.top - insets.bottom);
    page.setCropBox(x, y, Math.max(1, w), Math.max(1, h));
  }
  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
