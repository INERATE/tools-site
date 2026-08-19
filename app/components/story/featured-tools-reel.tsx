"use client";

import { motion } from "motion/react";
import { RECOMMENDED_TOOLS } from "../tool-list";
import { FeaturedToolCard } from "./featured-tool-card";

/**
 * The landing page's "what you can actually do here" beat — a horizontally
 * scrollable strip of the same six recommended tools the grid leads with,
 * told as a short story instead of a grid. Native scroll-snap (touch and
 * wheel both just work) rather than scroll-hijacked parallax, which reads
 * as premium without the motion-sickness risk on a document-tools site.
 */
export function FeaturedToolsReel() {
  return (
    <section className="flex flex-col gap-8">
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
          <span className="animated-gradient-text inline-block font-serif font-normal italic">
            first click.
          </span>
        </motion.h2>
      </div>

      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:justify-center sm:px-0">
        {RECOMMENDED_TOOLS.map((tool, i) => (
          <FeaturedToolCard key={tool.href} {...tool} index={i} />
        ))}
      </div>
    </section>
  );
}
