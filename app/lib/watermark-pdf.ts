import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

export type PdfWatermarkPosition = "tiled" | "center" | "bottom-right";

/** Stamps translucent text onto every page of a PDF, tiled diagonally or placed once. */
export async function watermarkPdf(
  file: File,
  opts: { text: string; position: PdfWatermarkPosition; opacity: number },
): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const color = rgb(0.5, 0.5, 0.5);

  doc.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    const size = Math.max(14, Math.round(width / 18));
    const textWidth = font.widthOfTextAtSize(opts.text, size);

    if (opts.position === "tiled") {
      const stepX = size * 8;
      const stepY = size * 5;
      for (let y = -height; y < height * 2; y += stepY) {
        for (let x = -width; x < width * 2; x += stepX) {
          page.drawText(opts.text, {
            x,
            y,
            size,
            font,
            color,
            opacity: opts.opacity,
            rotate: degrees(30),
          });
        }
      }
      return;
    }

    const x = opts.position === "center" ? width / 2 - textWidth / 2 : width - 28 - textWidth;
    const y = opts.position === "center" ? height / 2 : 28;
    page.drawText(opts.text, { x, y, size, font, color, opacity: opts.opacity });
  });

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
