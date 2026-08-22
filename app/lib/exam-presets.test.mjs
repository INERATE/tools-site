/** node app/lib/exam-presets.test.mjs — runs the real source with types stripped. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./exam-presets.ts", import.meta.url), "utf8")
  .replace(/^export /gm, "")
  .replace(/^type ExamPreset = \{[\s\S]*?\};$/m, "")
  .replace(/: Promise<\{ quality: number; size: number \}>/g, "")
  .replace(/: ExamPreset\[\]/g, "")
  .replace(/: \(q: number\) => Promise<number>/g, "")
  .replace(/: number/g, "");
const { pickQuality, padBytes, coverCrop, EXAM_PRESETS } = new Function(
  `${src}; return { pickQuality, padBytes, coverCrop, EXAM_PRESETS };`,
)();

// A stand-in encoder where size rises with quality, as a JPEG encoder's does.
const encoder = (bytesAtFullQuality) => async (q) => Math.round(bytesAtFullQuality * q);

// Picks a quality that fits, and gets close to the ceiling rather than far under it.
const fit = await pickQuality(encoder(100_000), 50_000);
assert.ok(fit.size <= 50_000, "must not exceed the portal's ceiling");
assert.ok(fit.size > 48_000, `should land near the ceiling, got ${fit.size}`);

// Already small enough at top quality — no need to degrade the image at all.
assert.equal((await pickQuality(encoder(10_000), 50_000)).quality, 0.95);

// Nothing fits: return the smallest we can make, don't claim success.
const tooBig = await pickQuality(encoder(1_000_000), 1_000);
assert.ok(tooBig.size > 1_000, "reports the real size when even min quality overflows");

// Padding only ever runs upward, and clears the floor with room to spare.
assert.equal(padBytes(20_000, 10_240), 0);
assert.ok(8_000 + padBytes(8_000, 10_240) > 10_240, "padded file must clear the minimum");

// Cover crop keeps the subject's aspect: a wide source is cropped on the sides.
const c = coverCrop(400, 200, 200, 230);
assert.equal(Math.round(c.sh), 200, "full height used when the source is too wide");
assert.ok(c.sw < 400 && c.sx > 0, "sides trimmed, and centred");
assert.ok(Math.abs(c.sw / c.sh - 200 / 230) < 0.01, "crop matches the target aspect");

// Every preset is internally sane — a min above the max would be unshippable.
for (const p of EXAM_PRESETS) {
  assert.ok(p.minKB < p.maxKB, `${p.id}: min must be under max`);
  assert.ok(p.w > 0 && p.h > 0, `${p.id}: needs real dimensions`);
}

console.log("exam-presets: all assertions passed");
