/** Measures a string at a size. Satisfied by pdf-lib's PDFFont. */
export type Measurer = { widthOfTextAtSize: (text: string, size: number) => number };

/**
 * Greedy word wrap. Splits on existing newlines first so authored line breaks
 * survive, then fills each line to `width`.
 *
 * A word longer than `width` is emitted on its own overlong line rather than
 * dropped — losing user text would be worse than overflowing the margin.
 */
export function wrapText(
  text: string,
  size: number,
  font: Measurer,
  width: number,
): string[] {
  const lines: string[] = [];

  for (const para of text.split("\n")) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= width) {
        line = next;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    lines.push(line);
  }

  return lines;
}
