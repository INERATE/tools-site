import { PDFDocument } from "pdf-lib";

export async function flattenPdfForm(file: File): Promise<{ blob: Blob; fieldCount: number }> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm();
  const fieldCount = form.getFields().length;
  if (!fieldCount) throw new Error("That PDF has no fillable form fields.");
  form.flatten();
  const out = await doc.save();
  return { blob: new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), fieldCount };
}
