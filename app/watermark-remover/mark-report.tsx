"use client";

import { BadgeCheck, Info } from "lucide-react";
import { motion } from "motion/react";

/**
 * What this tool will and will not do, on screen, before the user saves.
 * Watermarks live in three different places in a PDF and only one of them can
 * be deleted cleanly — saying so here is the difference between a tool that
 * works and one that quietly does nothing.
 */
export function MarkReport({ marks, boxes }: { marks: number; boxes: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className="glass mb-4 rounded-2xl p-4"
    >
      <p className="flex items-start gap-2 text-[13.5px] leading-[1.55]">
        <BadgeCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
        {marks > 0 ? (
          <span>
            <strong className="font-semibold">
              {marks} watermark or stamp annotation{marks === 1 ? "" : "s"} found
            </strong>{" "}
            — these are deleted when you save.
          </span>
        ) : (
          <span>
            No watermark annotations in this file, so the mark is printed into the page. Drag a box over
            it to cover it.
          </span>
        )}
      </p>

      <p className="mt-2.5 flex items-start gap-2 text-[12.5px] leading-[1.55] text-[var(--text-dim)]">
        <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        <span>
          A cover paints over the mark — the text beneath it stays in the file and can still be
          selected or copied. Do not use it to hide anything confidential.
          {boxes > 0 && ` ${boxes} cover${boxes === 1 ? "" : "s"} placed.`}
        </span>
      </p>
    </motion.div>
  );
}
