import type { Line } from "./extract-blocks";
import { styleOf } from "./extract-blocks";
import { matchFont } from "./font-match";
import { sampleBackground } from "./sample-background";
import type { TextBlock } from "../types";

/** Turns one extracted line into a full editable TextBlock, sampling its background from the rendered page. */
export function buildBlock(
  id: string,
  pageIndex: number,
  line: Line,
  ctx: CanvasRenderingContext2D,
  canvas: { width: number; height: number },
  pw: number,
  ph: number,
): TextBlock {
  const rawFont = line.spans[0]?.fontName ?? "";
  const style = styleOf(rawFont);
  const match = matchFont(rawFont);
  const relX = line.x / pw;
  const relY = (ph - line.y - line.height) / ph;
  const relWidth = line.width / pw;
  const relHeight = line.height / ph;
  const bg = sampleBackground(
    ctx,
    { x: relX * canvas.width, y: relY * canvas.height, w: relWidth * canvas.width, h: relHeight * canvas.height },
    canvas.width,
    canvas.height,
  );

  return {
    id, pageIndex,
    pdfX: line.x, pdfY: line.y, pdfWidth: line.width, pdfHeight: line.height,
    relX, relY, relWidth, relHeight,
    text: line.text,
    originalText: line.text,
    fontSize: line.height,
    fontFamily: match.label,
    fontWeight: style.bold ? "bold" : "normal",
    fontStyle: style.italic ? "italic" : "normal",
    color: "#000000",
    align: "left",
    lineHeight: 1.2,
    letterSpacing: 0,
    isEdited: false,
    isNew: false,
    isDeleted: false,
    matchedFontName: match.label,
    matchedFamily: match.family,
    fontMatchConfidence: match.confidence,
    isMath: match.isMath,
    bgColor: { r: bg.r, g: bg.g, b: bg.b },
    bgFlat: bg.flat,
  };
}
