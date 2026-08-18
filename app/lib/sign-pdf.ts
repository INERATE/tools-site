import { PDFDocument } from "pdf-lib";

/** Bakes a signature PNG onto one page. Fractions are top-left/screen-space; PDF points are bottom-left, so y flips. */
export async function embedSignature(
  file: File,
  opts: { pageIndex: number; signaturePng: string; xFrac: number; yFrac: number; widthFrac: number; sigRatio: number },
): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const page = doc.getPages()[opts.pageIndex];
  if (!page) throw new Error("That page no longer exists.");

  const { width, height } = page.getSize();
  const pngBytes = await fetch(opts.signaturePng).then((r) => r.arrayBuffer());
  const png = await doc.embedPng(pngBytes);

  const w = opts.widthFrac * width;
  const h = w * opts.sigRatio;
  const x = opts.xFrac * width;
  const y = height - opts.yFrac * height - h;

  page.drawImage(png, { x, y, width: w, height: h });

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
