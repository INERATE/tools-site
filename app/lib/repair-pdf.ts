import { PDFDocument } from "pdf-lib";

/**
 * Re-serializes a PDF from scratch — pdf-lib parses as much of the object
 * graph as it can and writes a clean file, which drops most structural
 * corruption (broken xref tables, dangling references, duplicate objects).
 * It cannot fix a truncated/missing content stream — that data is just gone.
 */
export async function repairPdf(file: File): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer(), { throwOnInvalidObject: false });
  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
