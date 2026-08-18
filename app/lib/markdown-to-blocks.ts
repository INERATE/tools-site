import type { Block } from "./docx-blocks";

/**
 * A minimal markdown reader — headings, dash/star/numbered list items,
 * and paragraphs — matching exactly the block kinds the shared PDF writer
 * supports. Inline formatting, tables, code fences and links are not a new
 * dependency's worth of complexity when the renderer can't display them
 * anyway; they're read as plain text instead of dropped silently.
 */
export function markdownToBlocks(markdown: string): Block[] {
  const out: Block[] = [];
  for (const raw of markdown.split(/\n{2,}/)) {
    const line = raw.trim();
    if (!line) continue;

    const heading = line.match(/^(#{1,6})\s+(.*)/);
    if (heading) {
      const level = heading[1].length;
      out.push({ kind: level === 1 ? "h1" : level === 2 ? "h2" : "h3", text: heading[2].trim() });
      continue;
    }

    const listLines = line.split("\n").filter((l) => /^\s*([-*]|\d+[.)])\s+/.test(l));
    if (listLines.length === line.split("\n").length) {
      for (const item of listLines) out.push({ kind: "li", text: item.replace(/^\s*([-*]|\d+[.)])\s+/, "") });
      continue;
    }

    out.push({ kind: "p", text: line.replace(/\n/g, " ") });
  }
  return out;
}
