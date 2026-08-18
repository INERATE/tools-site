import { PDFDocument, StandardFonts } from "pdf-lib";
import type { Block } from "./docx-blocks";
import { Writer } from "./pdf-writer";

const STYLE: Record<Block["kind"], { size: number; bold?: boolean; before: number; indent?: number }> = {
  h1: { size: 19, bold: true, before: 16 },
  h2: { size: 14.5, bold: true, before: 13 },
  h3: { size: 12, bold: true, before: 10 },
  p: { size: 10.5, before: 7 },
  li: { size: 10.5, before: 3, indent: 14 },
};

/** Lays flattened blocks onto A4 pages — shared by every tool that converts text into a PDF. */
export async function blocksToPdf(blocks: Block[], title: string): Promise<Blob> {
  const doc = await PDFDocument.create();
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
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
