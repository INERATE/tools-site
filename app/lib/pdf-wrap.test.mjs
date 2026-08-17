/**
 * Self-check for the word wrapper. Run: node app/lib/pdf-wrap.test.mjs
 * Executes the real source (types stripped) so it cannot drift from shipped code.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./pdf-wrap.ts", import.meta.url), "utf8")
  .replace(/^export /gm, "")
  .replace(/^\s*type Measurer[\s\S]*?;\s*$/m, "")
  .replace(/: (?:string(?:\[\])?|number|Measurer)/g, "");
const wrapText = new Function(`${src}; return wrapText;`)();

// 1 unit per character at size 1 — makes widths trivial to reason about.
const mono = { widthOfTextAtSize: (t, s) => t.length * s };

assert.deepEqual(wrapText("a b c", 1, mono, 5), ["a b c"], "fits on one line");
assert.deepEqual(wrapText("aaa bbb", 1, mono, 3), ["aaa", "bbb"], "wraps at the boundary");
assert.deepEqual(wrapText("aaa bbb ccc", 1, mono, 7), ["aaa bbb", "ccc"], "greedy fill");
assert.deepEqual(wrapText("one\ntwo", 1, mono, 99), ["one", "two"], "authored newline kept");
assert.deepEqual(wrapText("a\n\nb", 1, mono, 99), ["a", "", "b"], "blank line preserved");
assert.deepEqual(wrapText("  a   b  ", 1, mono, 99), ["a b"], "whitespace collapsed");

// The important edge case: an unbreakable word must never be silently dropped.
assert.deepEqual(wrapText("supercalifragilistic", 1, mono, 5), ["supercalifragilistic"], "long word kept whole");
assert.deepEqual(wrapText("hi supercalifragilistic", 1, mono, 5), ["hi", "supercalifragilistic"], "long word after text");

// Nothing in, nothing lost.
assert.deepEqual(wrapText("", 1, mono, 10), [""], "empty string");

// Every word that goes in must come out.
const words = "alpha beta gamma delta epsilon zeta eta theta".split(" ");
const out = wrapText(words.join(" "), 1, mono, 11).join(" ").split(/\s+/).filter(Boolean);
assert.deepEqual(out, words, "no word lost or duplicated across lines");

console.log("pdf-wrap: all assertions passed");
