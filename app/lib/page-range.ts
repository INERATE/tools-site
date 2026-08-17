/**
 * Parses a human page-range string ("1-3, 5, 8-10") into sorted, de-duplicated
 * ZERO-BASED page indices. User input is a trust boundary: every token is
 * validated and anything malformed or out of bounds throws with a readable
 * message rather than silently producing a wrong document.
 */
export function parseRanges(input: string, pageCount: number): number[] {
  const text = input.trim();
  if (!text) throw new Error("Enter which pages you want, e.g. 1-3, 5");

  const out = new Set<number>();

  for (const raw of text.split(",")) {
    const token = raw.trim();
    if (!token) continue;

    const m = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(token);
    if (!m) throw new Error(`"${token}" isn't a page or range`);

    const from = Number(m[1]);
    const to = m[2] === undefined ? from : Number(m[2]);

    if (from < 1) throw new Error("Pages start at 1");
    if (to < from) throw new Error(`"${token}" runs backwards`);
    if (to > pageCount) {
      throw new Error(`This PDF has ${pageCount} page${pageCount === 1 ? "" : "s"} — "${token}" is past the end`);
    }
    for (let p = from; p <= to; p++) out.add(p - 1);
  }

  if (out.size === 0) throw new Error("Enter which pages you want, e.g. 1-3, 5");
  return [...out].sort((a, b) => a - b);
}
