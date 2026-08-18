import { blocksToPdf } from "./blocks-to-pdf";
import { htmlToBlocks } from "./docx-blocks";

export type Converted = { blob: Blob; blocks: number; title: string };

/**
 * DOCX to PDF, entirely in the browser. mammoth reads the Word XML and gives
 * back semantic HTML; the blocks are then laid out with the same writer the
 * résumé builder uses.
 *
 * ponytail: this is a text-flow conversion, not a layout engine. Word's own
 * pagination, columns, floats, images and embedded fonts are not reproduced,
 * and matching them would mean either a server round trip — which would break
 * the promise that nothing is uploaded — or shipping a full layout engine.
 */
export async function docxToPdf(file: File): Promise<Converted> {
  const mammoth = await import("mammoth");
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
  const blocks = htmlToBlocks(html);
  if (blocks.length === 0) throw new Error("No text was found in that document.");

  const title = file.name.replace(/\.docx?$/i, "");
  const blob = await blocksToPdf(blocks, title);
  return { blob, blocks: blocks.length, title };
}
