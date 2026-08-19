import * as pdfLib from "pdf-lib";
import { configure, lock, unlockInPlace } from "pdf-lib-encrypt";

configure(pdfLib);

export async function protectPdf(file: File, password: string): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const doc = await pdfLib.PDFDocument.load(bytes);
  const plain = await doc.save();
  const encrypted = await lock(plain, password);
  return new Blob([encrypted.buffer as ArrayBuffer], { type: "application/pdf" });
}

export async function unlockPdf(file: File, password: string): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const doc = await pdfLib.PDFDocument.load(bytes, { ignoreEncryption: true });
  const wasEncrypted = await unlockInPlace(doc, password);
  if (!wasEncrypted) throw new Error("That PDF isn't password-protected.");
  const out = await doc.save({ useObjectStreams: false });
  return new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
}
