"use client";

import { BeatCopy } from "./beat-copy";
import { DocCard } from "./doc-card";
import { SealCheck } from "./seal-check";
import { useStoryTimeline } from "./use-story-timeline";

const SCATTER = [
  { x: -232, y: -74, r: -13 },
  { x: -118, y: 82, r: 9 },
  { x: -18, y: -112, r: -5 },
  { x: 112, y: 64, r: 12 },
  { x: 216, y: -60, r: -9 },
  { x: 36, y: 120, r: 6 },
];

const FAR =
  "radial-gradient(58% 50% at 18% 24%,rgba(124,58,237,0.32),transparent 70%)," +
  "radial-gradient(52% 46% at 84% 74%,rgba(34,211,238,0.22),transparent 70%)";
const MID = "radial-gradient(40% 34% at 66% 20%,rgba(217,70,239,0.3),transparent 70%)";

export function StorySection() {
  const root = useStoryTimeline();

  return (
    <section ref={root} aria-label="How it works" className="relative">
      <div className="stage relative flex min-h-screen flex-col items-center justify-center gap-14 overflow-hidden px-6 py-24 md:motion-safe:h-screen md:motion-safe:py-0">
        <div
          className="depth-far pointer-events-none absolute inset-x-0 -inset-y-[22%] z-0 blur-3xl"
          style={{ background: FAR }}
        />
        <div
          className="depth-mid pointer-events-none absolute inset-x-0 -inset-y-[22%] z-0 blur-2xl"
          style={{ background: MID }}
        />
        <div className="stack relative z-10 h-[300px] w-full max-w-xl md:h-[340px]">
          {SCATTER.map((s, i) => (
            <DocCard key={i} {...s} z={SCATTER.length - i} lead={i === 0} />
          ))}
          <SealCheck />
        </div>
        <BeatCopy />
      </div>
    </section>
  );
}
