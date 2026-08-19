import { PDFDocument } from "pdf-lib";
import { detectFormFields } from "./detect-form-fields";

/**
 * Replaces every detected blank-line/checkbox pattern with a real, fillable
 * AcroForm field at that position. Everything else about the page is
 * untouched — this only adds fields, it never removes or edits text.
 */
export async function makeSmartForm(file: File): Promise<{ blob: Blob; fieldCount: number }> {
  const matches = await detectFormFields(file);
  if (matches.length === 0) throw new Error("No blank lines (___) or checkboxes ([ ]) were found in that PDF.");

  const doc = await PDFDocument.load(await file.arrayBuffer());
  const form = doc.getForm();
  const pages = doc.getPages();

  matches.forEach((m, i) => {
    const page = pages[m.pageIndex];
    if (!page) return;
    if (m.kind === "text") {
      const field = form.createTextField(`field_${i}`);
      field.addToPage(page, { x: m.x, y: m.y - 2, width: m.w, height: m.h + 4 });
    } else {
      const field = form.createCheckBox(`check_${i}`);
      field.addToPage(page, { x: m.x, y: m.y - 2, width: m.h, height: m.h });
    }
  });

  const bytes = await doc.save();
  return { blob: new Blob([bytes.slice().buffer], { type: "application/pdf" }), fieldCount: matches.length };
}
