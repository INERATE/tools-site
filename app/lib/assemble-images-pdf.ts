import { PDFDocument } from "pdf-lib";
import type { ImageItem } from "./image-item";

export type { ImageItem } from "./image-item";

/** One PDF page per image, sized to the image itself so nothing is cropped or stretched. */
export async function assembleImagesToPdf(images: ImageItem[]): Promise<Blob> {
  const pdf = await PDFDocument.create();
  for (const img of images) {
    const bytes = await img.file.arrayBuffer();
    const embedded = img.file.type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    const page = pdf.addPage([embedded.width, embedded.height]);
    page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
  }
  const bytes = await pdf.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
