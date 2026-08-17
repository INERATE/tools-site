"use client";

import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ToolCard } from "./tool-card";
import { TOOLS } from "./tool-list";

export function ToolGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Staggered column-based scroll parallax for tactile 3D depth
  const col1Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} id="tools" className="mt-28 flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase">
            <Sparkles className="size-3.5" />
            <span>Complete Suite</span>
          </div>
          <h2 className="text-[28px] font-extrabold tracking-tight text-[var(--text)] sm:text-[34px]">
            Explore All Document Tools
          </h2>
        </div>
        <p className="max-w-[32ch] text-[13.5px] text-[var(--text-dim)]">
          Fast, sandboxed, and engineered to execute completely inside your browser tab.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool, i) => {
          const colIndex = i % 3;
          const colTransform = colIndex === 0 ? col1Y : colIndex === 1 ? col2Y : col3Y;

          return (
            <motion.div key={tool.href} style={{ y: colTransform }}>
              <ToolCard {...tool} index={i} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
