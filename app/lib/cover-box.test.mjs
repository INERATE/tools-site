/** node app/lib/cover-box.test.mjs — runs the real source with types stripped. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./cover-box.ts", import.meta.url), "utf8")
  .replace(/^export /gm, "")
  .replace(/^type [\s\S]*?;$/gm, "")
  .replace(/: (?:Box|UserRect|number)/g, "");
const { toUserRect, normalize } = new Function(`${src}; return { toUserRect, normalize };`)();

const W = 400;
const H = 800;
// Top-left quarter of the displayed page.
const tl = { x: 0, y: 0, w: 0.5, h: 0.25 };

// Unrotated: y flips, so the top of the screen is the top of the PDF box.
assert.deepEqual(toUserRect(tl, W, H, 0), { x: 0, y: 600, width: 200, height: 200 });

// 180°: mirrored in both axes, so it lands bottom-right in user space.
assert.deepEqual(toUserRect(tl, W, H, 180), { x: 200, y: 0, width: 200, height: 200 });

// Quarter turns: the displayed page is 800×400, so the same fractions cover a
// different physical area, and width/height swap.
assert.deepEqual(toUserRect(tl, W, H, 90), { x: 0, y: 0, width: 100, height: 400 });
assert.deepEqual(toUserRect(tl, W, H, 270), { x: 300, y: 400, width: 100, height: 400 });

// Nothing may fall outside the page, and a full-page box must cover it all.
for (const r of [0, 90, 180, 270, -90, 360]) {
  for (const box of [tl, { x: 0.5, y: 0.75, w: 0.5, h: 0.25 }, { x: 0, y: 0, w: 1, h: 1 }]) {
    const u = toUserRect(box, W, H, r);
    assert.ok(u.x >= -1e-9 && u.y >= -1e-9, `inside for rot ${r}`);
    assert.ok(u.x + u.width <= W + 1e-9 && u.y + u.height <= H + 1e-9, `edges for rot ${r}`);
  }
  assert.deepEqual(toUserRect({ x: 0, y: 0, w: 1, h: 1 }, W, H, r), {
    x: 0, y: 0, width: W, height: H,
  }, `full cover at ${r}`);
}

// Negative drags are normalized, not passed through.
assert.deepEqual(normalize(0.8, 0.9, 0.2, 0.1), { x: 0.2, y: 0.1, w: 0.6000000000000001, h: 0.8 });
assert.deepEqual(normalize(0.2, 0.1, 0.2, 0.1), { x: 0.2, y: 0.1, w: 0, h: 0 });

console.log("cover-box: all assertions passed");
