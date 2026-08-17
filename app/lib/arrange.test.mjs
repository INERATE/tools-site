/**
 * node app/lib/arrange.test.mjs
 * Runs the real source: types stripped, no build step, no test framework.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./arrange.ts", import.meta.url), "utf8")
  .replace(/^export /gm, "")
  .replace(/<T>/g, "")
  .replace(/: \(DOMRect \| undefined\)\[\]/g, "")
  .replace(/: T\[\]/g, "")
  .replace(/: (?:string|number)/g, "");
const { moveItem, nearestIndex } = new Function(
  `${src}; return { moveItem, nearestIndex };`,
)();

const L = ["a", "b", "c", "d"];

// Lift-and-drop, not swap.
assert.deepEqual(moveItem(L, 0, 2), ["b", "c", "a", "d"]);
assert.deepEqual(moveItem(L, 3, 0), ["d", "a", "b", "c"]);
assert.deepEqual(moveItem(L, 1, 2), ["a", "c", "b", "d"]);

// No-ops return the very same array so setState can skip the render.
assert.equal(moveItem(L, 1, 1), L);
assert.equal(moveItem(L, -1, 2), L);
assert.equal(moveItem(L, 0, 9), L);
assert.deepEqual(moveItem([], 0, 1), []);

// The source is never mutated.
moveItem(L, 0, 3);
assert.deepEqual(L, ["a", "b", "c", "d"]);

// Every element survives exactly once, for every from/to pair.
for (let f = 0; f < L.length; f++) {
  for (let t = 0; t < L.length; t++) {
    const out = moveItem(L, f, t);
    assert.equal(out.length, L.length);
    assert.deepEqual([...out].sort(), [...L].sort());
    assert.equal(out[t], L[f], `item should land on ${t}`);
  }
}

const box = (left, top) => ({ left, top, width: 100, height: 140 });
assert.equal(nearestIndex([box(0, 0), box(120, 0)], 40, 70), 0);
assert.equal(nearestIndex([box(0, 0), box(120, 0)], 180, 70), 1);
assert.equal(nearestIndex([box(0, 0), undefined, box(120, 0)], 180, 70), 2);
assert.equal(nearestIndex([], 10, 10), -1);
assert.equal(nearestIndex([undefined], 10, 10), -1);

console.log("arrange: all assertions passed");
