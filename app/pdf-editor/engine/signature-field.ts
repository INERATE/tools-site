import { PDFDict, PDFName, PDFNumber, PDFString, type PDFDocument, type PDFPage } from "pdf-lib";

/**
 * pdf-lib has PDFSignature and getSignature but no createSignature, so an
 * empty /Sig widget is assembled directly. This is a field for someone to sign
 * later — it does not sign anything itself.
 */
export function addSignatureField(
  doc: PDFDocument,
  page: PDFPage,
  name: string,
  rect: { x: number; y: number; width: number; height: number },
) {
  const ctx = doc.context;
  const widget = ctx.obj({
    Type: "Annot",
    Subtype: "Widget",
    FT: "Sig",
    T: PDFString.of(name),
    F: PDFNumber.of(4), // printable
    Rect: ctx.obj([rect.x, rect.y, rect.x + rect.width, rect.y + rect.height]),
    P: page.ref,
  });
  const ref = ctx.register(widget);

  page.node.addAnnot(ref);

  const acro = doc.catalog.lookup(PDFName.of("AcroForm"), PDFDict);
  const list = acro?.lookup(PDFName.of("Fields"));
  if (list && "push" in list) (list as { push: (r: unknown) => void }).push(ref);
  // A signature field present anywhere means the document contains signatures.
  acro?.set(PDFName.of("SigFlags"), PDFNumber.of(3));
}
