import { PDFArray, PDFDict, PDFName, PDFPage, PDFRef } from "pdf-lib";

/** Annotation subtypes that are watermarks or stamps by definition. */
const MARKS = ["Watermark", "Stamp"];

const annotsOf = (page: PDFPage) => (page.node.Annots()?.asArray() ?? []) as PDFRef[];

/* Entries of /Annots are indirect references; each has to be looked up in the
   document's object table before its subtype can be read. */
const isMark = (page: PDFPage, ref: PDFRef) =>
  MARKS.includes(
    String(page.node.context.lookupMaybe(ref, PDFDict)?.get(PDFName.of("Subtype")) ?? "").replace("/", ""),
  );

/** How many watermark or stamp annotations a page carries. */
export const countMarksOn = (page: PDFPage) => annotsOf(page).filter((ref) => isMark(page, ref)).length;

/** Drops those annotations from one page, returning how many went. */
export function stripMarks(page: PDFPage): number {
  const annots = annotsOf(page);
  const keep = annots.filter((ref) => !isMark(page, ref));
  if (keep.length === annots.length) return 0;
  const array = PDFArray.withContext(page.node.context);
  keep.forEach((ref) => array.push(ref));
  page.node.set(PDFName.of("Annots"), array);
  return annots.length - keep.length;
}
