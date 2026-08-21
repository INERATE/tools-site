import { StandardFonts, degrees, rgb, type PDFDocument, type PDFPage } from "pdf-lib";
import type { SignatureElement, WatermarkConfig } from "../element-types";

/** Stamps the watermark across the chosen pages. Same append-only path as text edits. */
export async function drawWatermark(doc: PDFDocument, pages: PDFPage[], w: WatermarkConfig) {
  if (!w.enabled || !w.text.trim()) return;
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const targets = w.pages === "first" ? pages.slice(0, 1) : pages;

  for (const page of targets) {
    const { width, height } = page.getSize();
    const size = w.fontSize || Math.max(14, Math.round(width / 18));
    const textWidth = font.widthOfTextAtSize(w.text, size);
    const opts = { size, font, color: rgb(0.5, 0.5, 0.5), opacity: w.opacity, rotate: degrees(w.rotation) };

    if (w.layout === "grid" || w.layout === "diagonal") {
      const stepX = size * 8;
      const stepY = size * 5;
      for (let y = -height; y < height * 2; y += stepY) {
        for (let x = -width; x < width * 2; x += stepX) {
          page.drawText(w.text, { x, y, ...opts });
        }
      }
      continue;
    }

    const x = w.layout === "footer" ? width / 2 - textWidth / 2 : width / 2 - textWidth / 2;
    const y = w.layout === "footer" ? 28 : height / 2;
    page.drawText(w.text, { x, y, ...opts });
  }
}

/** Bakes drawn/typed signatures onto their pages. rel* is top-left; PDF y is bottom-left, so it flips. */
export async function drawSignatures(doc: PDFDocument, pages: PDFPage[], sigs: SignatureElement[]) {
  for (const s of sigs) {
    const page = pages[s.pageIndex];
    if (!page) continue;
    const { width, height } = page.getSize();
    const png = await doc.embedPng(await (await fetch(s.dataUrl)).arrayBuffer());
    const w = s.relWidth * width;
    const h = s.relHeight * height;
    page.drawImage(png, { x: s.relX * width, y: height - s.relY * height - h, width: w, height: h });
  }
}
