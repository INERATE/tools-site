import { PDFDocument } from "pdf-lib";
import { renderPages } from "./pdf-to-image";

export type CompressLevel = "light" | "balanced" | "small";

/** Scale ~ resolution, quality ~ JPEG quality. Higher compression trades both down. */
export const LEVELS: Record<CompressLevel, { label: string; scale: number; quality: number }> = {
  light: { label: "Light", scale: 2.2, quality: 0.85 },
  balanced: { label: "Balanced", scale: 1.6, quality: 0.72 },
  small: { label: "Smallest file", scale: 1.15, quality: 0.55 },
};

/**
 * Re-encodes every page as a compressed JPEG and rebuilds the PDF from those
 * images — the same approach every "compress PDF" tool uses for scanned or
 * image-heavy documents. Trade-off, disclosed in the tool's own copy: the
 * result's text is no longer selectable, since each page is now a picture.
 */
export async function compressPdf(
  file: File,
  level: CompressLevel,
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const { scale, quality } = LEVELS[level];
  const pages = await renderPages(file, { format: "jpeg", scale, quality, onProgress });
  const pdf = await PDFDocument.create();
  for (const pg of pages) {
    const bytes = await fetch(pg.url).then((r) => r.arrayBuffer());
    const img = await pdf.embedJpg(bytes);
    const page = pdf.addPage([pg.width, pg.height]);
    page.drawImage(img, { x: 0, y: 0, width: pg.width, height: pg.height });
    URL.revokeObjectURL(pg.url);
  }
  const bytes = await pdf.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
