import { PDFDict, PDFDocument, PDFName, PDFRawStream } from "pdf-lib";

export type ExtractedImage = { name: string; url: string };

/**
 * Walks each page's XObject resources for embedded images. Only JPEG
 * streams (Filter /DCTDecode) are pulled out as-is — pdf-lib has no
 * decoder for FlateDecode raw bitmaps or JPX/JBIG2, and re-implementing
 * one is a project of its own. Disclosed in the tool's copy: PDFs whose
 * images use those other encodings will report fewer images than they
 * visually contain, not fail silently.
 */
export async function extractPdfImages(file: File): Promise<ExtractedImage[]> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const out: ExtractedImage[] = [];
  let count = 0;

  for (const page of doc.getPages()) {
    const resources = page.node.Resources();
    const xobjects = resources?.lookup(PDFName.of("XObject"), PDFDict);
    if (!xobjects) continue;

    for (const [, ref] of xobjects.entries()) {
      const xobj = doc.context.lookup(ref);
      if (!(xobj instanceof PDFRawStream)) continue;
      if (xobj.dict.lookup(PDFName.of("Subtype"))?.toString() !== "/Image") continue;
      if (xobj.dict.lookup(PDFName.of("Filter"))?.toString() !== "/DCTDecode") continue;

      count++;
      const blob = new Blob([new Uint8Array(xobj.contents).slice().buffer], { type: "image/jpeg" });
      out.push({ name: `image-${count}.jpg`, url: URL.createObjectURL(blob) });
    }
  }
  return out;
}
