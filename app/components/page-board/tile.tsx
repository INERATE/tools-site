"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TileActions } from "./tile-actions";
import { SPRING, TileThumb } from "./tile-thumb";
import { useCoarsePointer } from "./use-coarse-pointer";
import type { Slot, Thumb } from "./types";

export type TileOps = {
  rotate: (dir: 1 | -1) => void;
  duplicate: () => void;
  remove: () => void;
  nudge: (dir: 1 | -1) => void;
};

export function Tile({
  slot,
  index,
  thumb,
  label,
  dragging,
  register,
  onDragTo,
  onDragState,
  ops,
}: {
  slot: Slot;
  index: number;
  thumb?: Thumb;
  label: string;
  dragging: boolean;
  register: (id: string, el: HTMLElement | null) => void;
  onDragTo: (id: string, x: number, y: number) => void;
  onDragState: (id: string | null) => void;
  ops: TileOps;
}) {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const [hot, setHot] = useState(false);
  const turns = (((slot.rotate / 90) % 4) + 4) % 4;
  const ratio = thumb ? thumb.w / thumb.h : 0.707;

  return (
    <motion.li
      ref={(el) => register(slot.id, el)}
      layout={!reduced}
      transition={SPRING}
      initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 0.86 }}
      drag={!reduced}
      dragSnapToOrigin
      dragElastic={0.14}
      dragMomentum={false}
      whileDrag={{ scale: 1.06, zIndex: 40 }}
      onDragStart={() => onDragState(slot.id)}
      onDrag={(_, info) => onDragTo(slot.id, info.point.x, info.point.y)}
      onDragEnd={() => onDragState(null)}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      onKeyDown={(e) => {
        const dir = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
        if (dir !== 0 && e.altKey) {
          e.preventDefault();
          ops.nudge(dir);
        }
      }}
      tabIndex={0}
      aria-label={`${label}, position ${index + 1}. Hold Alt with the arrow keys to move it.`}
      className={`glass group relative touch-none overflow-hidden rounded-2xl outline-none
        ${dragging ? "cursor-grabbing" : "cursor-grab"} focus-visible:ring-2 focus-visible:ring-[var(--accent)]`}
      style={{ aspectRatio: `${ratio}` }}
    >
      <TileThumb thumb={thumb} turns={turns} ratio={ratio} />

      <span className="absolute top-2 left-2 z-20 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
        {index + 1}
      </span>

      <TileActions
        page={label}
        shown={(hot || coarse) && !dragging}
        onRotate={ops.rotate}
        onDuplicate={ops.duplicate}
        onRemove={ops.remove}
      />
    </motion.li>
  );
}
