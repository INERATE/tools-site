/**
 * Runs tesseract.js on a single image and returns recognized text plus a
 * confidence score. Same OCR engine `ocr-pdf.ts` already loads — no new
 * dependency, just a one-file-in/text-out path instead of a rebuilt PDF.
 */
export async function imageToText(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<{ text: string; confidence: number }> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng", undefined, {
    logger: (m) => {
      if (m.status === "recognizing text") onProgress?.(Math.round(m.progress * 100));
    },
  });
  try {
    const { data } = await worker.recognize(file);
    return { text: data.text.trim(), confidence: data.confidence };
  } finally {
    await worker.terminate();
  }
}
