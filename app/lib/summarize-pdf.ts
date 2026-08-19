import { AI_ENDPOINT } from "./ai-config";
import { extractPdfLines } from "./extract-pdf-lines";

/**
 * The one deliberate exception this suite makes beyond "nothing is
 * uploaded": extracted TEXT (never the file itself) is POSTed to a
 * configurable backend for summarization — there is no client-side LLM.
 * Disclosed prominently in the tool's own copy, same principle as OCR's
 * "downloads a model" and Remove Background's model fetch.
 */
export async function summarizePdf(file: File): Promise<string> {
  const lines = await extractPdfLines(file);
  if (lines.length === 0) throw new Error("No text was found in that PDF.");

  const res = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  });
  if (!res.ok) throw new Error("The summarizer is temporarily unavailable.");

  const data = await res.json();
  if (typeof data.summary !== "string") throw new Error("The summarizer returned an unexpected response.");
  return data.summary;
}
