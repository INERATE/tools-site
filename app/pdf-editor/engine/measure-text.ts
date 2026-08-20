import type { FontFamily } from "../types";

const CSS_FAMILY: Record<FontFamily, string> = {
  serif: "Times New Roman, serif",
  sans: "Helvetica, Arial, sans-serif",
  mono: "Courier New, monospace",
};

let scratch: CanvasRenderingContext2D | null = null;

/** Approximate rendered width using a web-safe stand-in for the matched family — close enough to flag overflow, not to lay out. */
export function measureWidth(text: string, fontSize: number, family: FontFamily, bold: boolean): number {
  if (!scratch) scratch = document.createElement("canvas").getContext("2d");
  if (!scratch) return 0;
  scratch.font = `${bold ? "bold " : ""}${fontSize}px ${CSS_FAMILY[family]}`;
  return scratch.measureText(text).width;
}
