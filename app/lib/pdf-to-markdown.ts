type Line = { text: string; height: number };

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

async function extractLines(file: File): Promise<Line[]> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  const doc = await task.promise;
  const out: Line[] = [];

  try {
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const content = await page.getTextContent();
      let text = "";
      let height = 0;
      for (const item of content.items) {
        if (!("str" in item)) continue;
        text += item.str;
        height = Math.max(height, item.height);
        if ("hasEOL" in item && item.hasEOL) {
          if (text.trim()) out.push({ text: text.trim(), height });
          text = "";
          height = 0;
        }
      }
      if (text.trim()) out.push({ text: text.trim(), height });
      page.cleanup();
    }
  } finally {
    await task.destroy();
  }
  return out;
}

const median = (nums: number[]) => {
  const sorted = [...nums].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 12;
};

/**
 * Heuristic, disclosed as such: a PDF has no heading markup, so lines are
 * classed as headings by font size relative to the document's median size,
 * and as list items by a leading bullet/number. It will misjudge unusual
 * layouts — this is a best-effort re-derivation, not an exact reversal.
 */
export async function pdfToMarkdown(file: File): Promise<string> {
  const lines = await extractLines(file);
  if (lines.length === 0) throw new Error("No text was found in that PDF.");

  const baseSize = median(lines.map((l) => l.height));
  const out: string[] = [];

  for (const { text, height } of lines) {
    if (/^([-*•]|\d+[.)])\s+/.test(text)) {
      out.push(`- ${text.replace(/^([-*•]|\d+[.)])\s+/, "")}`);
    } else if (height >= baseSize * 1.7) {
      out.push(`# ${text}`);
    } else if (height >= baseSize * 1.3) {
      out.push(`## ${text}`);
    } else {
      out.push(text);
    }
  }
  return out.join("\n\n");
}
