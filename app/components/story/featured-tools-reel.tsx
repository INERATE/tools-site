"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { RECOMMENDED_TOOLS } from "../tool-list";
import { ToolStoryPanel } from "./tool-story-panel";

/**
 * Real pinned scroll-scrub: the viewport holds still while scroll progress
 * drives which recommended tool is on stage (opacity/lift/scale per segment
 * of scrollYProgress) — not a static list, not a horizontal drag-strip.
 */
export function FeaturedToolsReel() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = RECOMMENDED_TOOLS.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  return (
    <section ref={ref} className="relative" style={{ height: `${n * 62}vh` }}>
      <div className="sticky top-20 flex h-[calc(100vh-6rem)] flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase">
            Built for the whole job
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em] text-[var(--text)]">
            Six tools, one{" "}
            <span className="animated-gradient-text inline-block font-serif font-normal italic">
              first click.
            </span>
          </h2>
        </div>

        <div className="relative h-[300px] w-full max-w-xl">
          {RECOMMENDED_TOOLS.map((tool, i) => (
            <ToolStoryPanel
              key={tool.href}
              tool={tool}
              index={i}
              total={n}
              scrollYProgress={scrollYProgress}
              isActive={active === i}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          {RECOMMENDED_TOOLS.map((tool, i) => (
            <span
              key={tool.href}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
