import { PDFDocument } from "pdf-lib";

/** Page count without keeping the parsed document around. */
export async function countPages(file: File): Promise<number> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  return doc.getPageCount();
}

/** Copies the given zero-based pages into a new PDF, preserving their order. */
export async function extractPages(file: File, pages: number[]): Promise<Blob> {
  const src = await PDFDocument.load(await file.arrayBuffer());
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, pages);
  copied.forEach((p) => out.addPage(p));
  const bytes = await out.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
