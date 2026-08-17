import { PDFDocument, degrees } from "pdf-lib";

/** One page of the output: which source file, which page in it, extra rotation. */
export type Slot = { src: number; page: number; rotate: number };

const turn = (n: number) => ((n % 360) + 360) % 360;

/**
 * Builds a PDF from an explicit page list. Order, deletions, duplicates and
 * rotation all live in `slots` — the caller owns the arrangement, this only
 * writes it out. Each source is parsed once even when its pages are scattered
 * through the result.
 */
export async function assemblePdf(files: File[], slots: Slot[]): Promise<Blob> {
  if (slots.length === 0) throw new Error("Nothing to save — every page was removed.");

  const out = await PDFDocument.create();
  const cache = new Map<number, PDFDocument>();

  for (const slot of slots) {
    const file = files[slot.src];
    if (!file) throw new Error("A source file went missing — please add it again.");

    let doc = cache.get(slot.src);
    if (!doc) {
      doc = await PDFDocument.load(await file.arrayBuffer());
      cache.set(slot.src, doc);
    }
    if (slot.page < 0 || slot.page >= doc.getPageCount()) {
      throw new Error(`Page ${slot.page + 1} is not in ${file.name}.`);
    }

    const [copy] = await out.copyPages(doc, [slot.page]);
    if (turn(slot.rotate) !== 0) copy.setRotation(degrees(turn(copy.getRotation().angle + slot.rotate)));
    out.addPage(copy);
  }

  const bytes = await out.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
