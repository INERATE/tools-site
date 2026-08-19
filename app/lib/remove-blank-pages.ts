import { PDFDocument } from "pdf-lib";
import { renderPages } from "./pdf-to-image";

const WHITE_THRESHOLD = 250;
const NON_WHITE_FRACTION_THRESHOLD = 0.002;

async function isBlank(url: string): Promise<boolean> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = url;
  });
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let nonWhite = 0;
  const total = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < WHITE_THRESHOLD || data[i + 1] < WHITE_THRESHOLD || data[i + 2] < WHITE_THRESHOLD) nonWhite++;
  }
  return nonWhite / total < NON_WHITE_FRACTION_THRESHOLD;
}

/** Rasterizes every page at low scale and flags near-all-white ones as blank. Heuristic, disclosed in the tool's own copy. */
export async function removeBlankPages(file: File): Promise<{ blob: Blob; removed: number[] }> {
  const rendered = await renderPages(file, { format: "png", scale: 0.35 });
  const blankFlags = await Promise.all(rendered.map((r) => isBlank(r.url)));
  rendered.forEach((r) => URL.revokeObjectURL(r.url));

  const removed = blankFlags.map((blank, i) => (blank ? i : -1)).filter((i) => i >= 0);
  if (!removed.length) throw new Error("No blank pages were found.");
  if (removed.length === rendered.length) throw new Error("Every page looks blank — nothing was removed.");

  const doc = await PDFDocument.load(await file.arrayBuffer());
  removed
    .slice()
    .reverse()
    .forEach((i) => doc.removePage(i));
  const out = await doc.save();
  return {
    blob: new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }),
    removed: removed.map((i) => i + 1),
  };
}
