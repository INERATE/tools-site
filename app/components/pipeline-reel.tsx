"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ComponentType } from "react";
import { useCycle } from "../lib/use-cycle";

type Step = { icon: ComponentType<{ className?: string }>; label: string };

/**
 * A looping "how it works" storyboard, unique per tool: cycles through that
 * tool's own steps — its own icons, its own labels — one frame at a time,
 * forever, like a silent looping product demo. Pure SVG + Framer Motion, so
 * there is no video file anywhere: nothing here can be "downloaded" as a
 * clip, only shapes and text crossfading through keyframes.
 */
export function PipelineReel({ steps }: { steps: Step[] }) {
  const frame = useCycle(steps.length, 1500);
  const current = steps[frame];

  return (
    <div className="glass mb-3 flex flex-col items-center gap-2.5 overflow-hidden rounded-xl px-4 py-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={frame}
          initial={{ opacity: 0, y: 6, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.94 }}
          transition={{ type: "spring", bounce: 0, duration: 0.35 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="grid size-10 place-items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/12 text-[var(--accent)]">
            <current.icon className="size-5" />
          </span>
          <span className="text-[11.5px] font-semibold text-[var(--text)]">{current.label}</span>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <motion.span
            key={s.label}
            animate={{ scale: i === frame ? 1.3 : 1, opacity: i === frame ? 1 : 0.35 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="size-1.5 rounded-full bg-[var(--accent)]"
          />
        ))}
      </div>
    </div>
  );
}
