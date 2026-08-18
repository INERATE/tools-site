import { blocksToPdf } from "./blocks-to-pdf";
import { markdownToBlocks } from "./markdown-to-blocks";

export async function markdownToPdf(markdown: string): Promise<{ blob: Blob; blocks: number }> {
  const blocks = markdownToBlocks(markdown);
  if (blocks.length === 0) throw new Error("No text was found in that markdown.");
  const blob = await blocksToPdf(blocks, "document");
  return { blob, blocks: blocks.length };
}
