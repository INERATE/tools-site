import { blocksToPdf } from "./blocks-to-pdf";
import { htmlToBlocks, type Block } from "./docx-blocks";

/** Plain text (no markup) becomes one paragraph per non-empty line, so the tool isn't picky about needing real tags. */
function plainTextBlocks(html: string): Block[] {
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((text) => ({ kind: "p" as const, text }));
}

/**
 * HTML/markup to PDF, entirely in the browser. Same block-layout pipeline as
 * DOCX to PDF — headings, paragraphs and lists carry over, inline styling,
 * CSS layout and images do not. There is no page-fetch step: pasted markup
 * only, since fetching an arbitrary URL from the browser would either fail
 * on CORS or require a server, breaking the "nothing is uploaded" promise.
 */
export async function htmlToPdf(html: string): Promise<{ blob: Blob; blocks: number }> {
  const blocks = htmlToBlocks(html);
  const finalBlocks = blocks.length > 0 ? blocks : plainTextBlocks(html);
  if (finalBlocks.length === 0) throw new Error("No text was found in that markup.");

  const blob = await blocksToPdf(finalBlocks, "document");
  return { blob, blocks: finalBlocks.length };
}
