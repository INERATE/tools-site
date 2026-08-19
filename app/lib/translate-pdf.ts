import { AI_ENDPOINT } from "./ai-config";
import { blocksToPdf } from "./blocks-to-pdf";
import { extractPdfLines } from "./extract-pdf-lines";

/**
 * Same deliberate exception as AI Summarizer: extracted TEXT (never the
 * file) is POSTed to a configurable backend, this time for translation.
 * The translated text is rebuilt into a downloadable PDF via the same
 * block-layout writer every other "text in, PDF out" tool in this suite
 * shares — one paragraph per source line, since translation doesn't know
 * the original's heading structure.
 */
export async function translatePdf(file: File, targetLang: string): Promise<{ blob: Blob; lines: number }> {
  const lines = await extractPdfLines(file);
  if (lines.length === 0) throw new Error("No text was found in that PDF.");

  const res = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "translate", text: lines.join("\n"), targetLang }),
  });
  if (!res.ok) throw new Error("The translator is temporarily unavailable.");

  const data = await res.json();
  if (typeof data.translated !== "string") throw new Error("The translator returned an unexpected response.");

  const blocks = data.translated
    .split("\n")
    .map((text: string) => text.trim())
    .filter(Boolean)
    .map((text: string) => ({ kind: "p" as const, text }));

  const blob = await blocksToPdf(blocks, "translated");
  return { blob, lines: blocks.length };
}
