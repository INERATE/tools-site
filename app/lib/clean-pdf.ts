import { PDFDocument, rgb } from "pdf-lib";
import { toUserRect, type Box } from "./cover-box";
import { countMarksOn, stripMarks } from "./strip-annots";

/** Counts removable annotations without writing anything. */
export async function countMarks(file: File): Promise<number> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  return doc.getPages().reduce((n, page) => n + countMarksOn(page), 0);
}

export type CleanOptions = {
  /** Zero-based pages the boxes apply to. */
  pages: number[];
  boxes: Box[];
  /** Cover colour: printed pages are usually white behind the mark. */
  dark?: boolean;
  stripAnnots?: boolean;
};

/**
 * Removes watermark annotations and paints cover boxes over whatever is left.
 * A cover hides the mark; it does not delete the text beneath it, so this is
 * not a redaction tool — the UI says so too.
 */
export async function cleanPdf(
  file: File,
  { pages, boxes, dark = false, stripAnnots = true }: CleanOptions,
): Promise<{ blob: Blob; stripped: number }> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  let stripped = 0;

  doc.getPages().forEach((page, i) => {
    if (stripAnnots) stripped += stripMarks(page);
    if (!pages.includes(i)) return;
    const { width, height } = page.getSize();
    const angle = page.getRotation().angle;
    for (const box of boxes) {
      if (box.w <= 0 || box.h <= 0) continue;
      page.drawRectangle({
        ...toUserRect(box, width, height, angle),
        color: dark ? rgb(0, 0, 0) : rgb(1, 1, 1),
        borderWidth: 0,
      });
    }
  });

  const bytes = await doc.save();
  return { blob: new Blob([bytes.slice().buffer], { type: "application/pdf" }), stripped };
}
