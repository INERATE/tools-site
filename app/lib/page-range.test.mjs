/**
 * Self-check for the page-range parser. Run: node app/lib/page-range.test.mjs
 * Kept as plain node + assert — no framework, per the repo's testing rule.
 * Mirrors parseRanges() in page-range.ts; if you change one, change both.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run the REAL source, with its handful of type annotations stripped, so this
// can never drift from the shipped parser the way a copy-pasted one would.
const src = readFileSync(new URL("./page-range.ts", import.meta.url), "utf8")
  .replace(/^export /gm, "")
  .replace(/<number>/g, "")
  .replace(/: (?:string|number(?:\[\])?)/g, "");
const parseRanges = new Function(`${src}; return parseRanges;`)();

const ok = (input, count, expected, why) =>
  assert.deepEqual(parseRanges(input, count), expected, why);
const bad = (input, count, why) =>
  assert.throws(() => parseRanges(input, count), Error, why);

ok("1", 5, [0], "single page is zero-based");
ok("1-3", 5, [0, 1, 2], "inclusive range");
ok("1-3, 5", 5, [0, 1, 2, 4], "mixed list");
ok(" 2 , 1 ", 5, [0, 1], "sorted and trimmed");
ok("1-2, 2-3", 5, [0, 1, 2], "overlaps de-duplicated");
ok("5-5", 5, [4], "degenerate range");
ok("1 - 3", 5, [0, 1, 2], "spaces around the dash");

bad("", 5, "empty rejected");
bad("   ", 5, "whitespace rejected");
bad("0", 5, "pages are 1-based");
bad("3-1", 5, "backwards range rejected");
bad("6", 5, "past the end rejected");
bad("1-9", 5, "range past the end rejected");
bad("abc", 5, "non-numeric rejected");
bad("1..3", 5, "wrong separator rejected");
bad("-2", 5, "leading dash rejected");

console.log("page-range: all assertions passed");
