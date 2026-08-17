import { PDFDocument, StandardFonts } from "pdf-lib";
import { htmlToBlocks, type Block } from "./docx-blocks";
import { Writer } from "./pdf-writer";

const STYLE: Record<Block["kind"], { size: number; bold?: boolean; before: number; indent?: number }> = {
  h1: { size: 19, bold: true, before: 16 },
  h2: { size: 14.5, bold: true, before: 13 },
  h3: { size: 12, bold: true, before: 10 },
  p: { size: 10.5, before: 7 },
  li: { size: 10.5, before: 3, indent: 14 },
};

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

  const doc = await PDFDocument.create();
  const title = file.name.replace(/\.docx?$/i, "");
  doc.setTitle(title);
  const w = new Writer(doc, {
    body: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  });

  blocks.forEach((block, i) => {
    const style = STYLE[block.kind];
    if (i > 0) w.gap(style.before);
    const text = block.kind === "li" ? `•  ${block.text}` : block.text;
    w.text(text, { size: style.size, bold: style.bold, indent: style.indent, color: 0.14 });
  });

  const bytes = await doc.save();
  return {
    blob: new Blob([bytes.slice().buffer], { type: "application/pdf" }),
    blocks: blocks.length,
    title,
  };
}
