/** A converted document, flattened to the blocks a PDF page can lay out. */
export type Block = { kind: "h1" | "h2" | "h3" | "p" | "li"; text: string };

const TAGS: Record<string, Block["kind"]> = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h3",
  H5: "h3",
  H6: "h3",
  P: "p",
  LI: "li",
  TD: "p",
  TH: "p",
  BLOCKQUOTE: "p",
};

/**
 * Walks the HTML mammoth produces and keeps the structure a text layout can
 * honour: headings, paragraphs and list items. Inline formatting, images,
 * columns and table geometry are dropped rather than faked — the tool says so
 * on screen instead of pretending.
 */
export function htmlToBlocks(html: string): Block[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const out: Block[] = [];

  for (const el of doc.body.querySelectorAll(Object.keys(TAGS).join(","))) {
    // A <p> inside an <li> would otherwise be emitted twice.
    if (el.tagName !== "LI" && el.closest("li")) continue;
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (text) out.push({ kind: TAGS[el.tagName], text });
  }

  return out;
}
