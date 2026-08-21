import { rgb, type PDFDocument, type PDFPage } from "pdf-lib";
import { isBox, isStroke, type Annotation } from "../annotation-types";
import { isFormField } from "./draw-form-fields";
import { hexToRgb } from "./font-pick";

/** Draws every non-redact annotation onto its page. Redactions are handled by the rasterizing path. */
export async function drawAnnotations(doc: PDFDocument, pages: PDFPage[], items: Annotation[]) {
  for (const a of items) {
    // Redactions are burned in by the rasterizer; form fields become real
    // widgets, so painting either here would double-draw them.
    if (a.kind === "redact" || isFormField(a)) continue;
    const page = pages[a.pageIndex];
    if (!page) continue;
    const { width, height } = page.getSize();

    if (isStroke(a)) {
      const c = hexToRgb(a.color);
      // pdf-lib has no polyline primitive; a stroke is a chain of segments.
      for (let i = 1; i < a.points.length; i++) {
        const p0 = a.points[i - 1];
        const p1 = a.points[i];
        page.drawLine({
          start: { x: p0.x * width, y: height - p0.y * height },
          end: { x: p1.x * width, y: height - p1.y * height },
          thickness: a.size,
          color: rgb(c.r, c.g, c.b),
          opacity: a.kind === "draw" ? 1 : 0.4,
        });
      }
      continue;
    }

    if (!isBox(a)) continue;

    const x = a.relX * width;
    const w = a.relWidth * width;
    const h = a.relHeight * height;
    const y = height - a.relY * height - h;

    if ((a.kind === "signature" || a.kind === "image") && a.dataUrl) {
      const bytes = await (await fetch(a.dataUrl)).arrayBuffer();
      const img = a.dataUrl.startsWith("data:image/jpeg")
        ? await doc.embedJpg(bytes)
        : await doc.embedPng(bytes);
      page.drawImage(img, { x, y, width: w, height: h });
      continue;
    }

    const c = hexToRgb(a.color ?? "#e11d48");
    if (a.kind === "circle") {
      page.drawEllipse({
        x: x + w / 2, y: y + h / 2, xScale: w / 2, yScale: h / 2,
        borderColor: rgb(c.r, c.g, c.b), borderWidth: 1.5,
      });
    } else if (a.kind === "highlight") {
      page.drawRectangle({ x, y, width: w, height: h, color: rgb(c.r, c.g, c.b), opacity: 0.35 });
    } else {
      page.drawRectangle({ x, y, width: w, height: h, borderColor: rgb(c.r, c.g, c.b), borderWidth: 1.5 });
    }
  }
}
