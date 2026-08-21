import { degrees, type PDFDocument } from "pdf-lib";

/**
 * Rotates and removes pages, last in the pipeline so every earlier step can
 * address pages by their original index. Removal walks backwards so each
 * splice cannot shift the indices still to be removed.
 */
export function applyPageOps(
  doc: PDFDocument,
  ops?: Record<number, { rotate: number; deleted: boolean }>,
) {
  if (!ops) return;
  const pages = doc.getPages();

  for (const [key, op] of Object.entries(ops)) {
    const page = pages[Number(key)];
    if (page && op.rotate) page.setRotation(degrees((page.getRotation().angle + op.rotate) % 360));
  }

  const doomed = Object.entries(ops)
    .filter(([, o]) => o.deleted)
    .map(([k]) => Number(k))
    .sort((a, b) => b - a);

  // Never delete the last surviving page — a zero-page PDF will not open.
  if (doomed.length >= pages.length) return;
  for (const i of doomed) doc.removePage(i);
}
