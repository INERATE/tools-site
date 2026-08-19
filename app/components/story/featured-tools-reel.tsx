"use client";

import { motion } from "motion/react";
import { RECOMMENDED_TOOLS } from "../tool-list";
import { ToolStoryBand } from "./tool-story-band";

/**
 * Six full-width bands, one per recommended tool, revealed sequentially as
 * you scroll — alternating sides, each with generous space of its own.
 * Sequential, not pinned/crossfaded: nothing can land mid-transition.
 */
export function FeaturedToolsReel() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase"
        >
          Built for the whole job
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em] text-[var(--text)]"
        >
          Six tools, one{" "}
          <span className="animated-gradient-text inline-block font-serif font-normal italic">first click.</span>
        </motion.h2>
      </div>

      <div className="flex flex-col gap-6 sm:gap-8">
        {RECOMMENDED_TOOLS.map((tool, i) => (
          <ToolStoryBand key={tool.href} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
}
