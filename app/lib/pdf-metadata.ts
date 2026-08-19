import { PDFDocument } from "pdf-lib";

export type PdfMeta = { title: string; author: string; subject: string; keywords: string };

export async function readPdfMeta(file: File): Promise<PdfMeta> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  return {
    title: doc.getTitle() ?? "",
    author: doc.getAuthor() ?? "",
    subject: doc.getSubject() ?? "",
    keywords: doc.getKeywords() ?? "",
  };
}

export async function writePdfMeta(file: File, meta: PdfMeta): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  doc.setTitle(meta.title);
  doc.setAuthor(meta.author);
  doc.setSubject(meta.subject);
  doc.setKeywords(meta.keywords.split(",").map((k) => k.trim()).filter(Boolean));
  const out = await doc.save();
  return new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
}
