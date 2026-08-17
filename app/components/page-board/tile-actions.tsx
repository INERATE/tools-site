"use client";

import { Copy, RotateCcw, RotateCw, Trash2 } from "lucide-react";
import { motion } from "motion/react";

const BTN =
  "grid size-8 cursor-pointer place-items-center rounded-full bg-black/45 text-white/85 " +
  "backdrop-blur-md transition-[color,background-color,transform] duration-200 " +
  "hover:bg-black/65 hover:text-white active:scale-90";

/**
 * Per-page controls. Shown on hover and whenever anything inside has focus, so
 * the whole row is reachable by keyboard without a hover emulation hack.
 */
export function TileActions({
  page,
  shown,
  onRotate,
  onDuplicate,
  onRemove,
}: {
  page: string;
  shown: boolean;
  onRotate: (dir: 1 | -1) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 6 }}
      transition={{ type: "spring", bounce: 0, duration: 0.28 }}
      className="absolute inset-x-0 bottom-0 z-20 flex justify-center gap-1.5 p-2 motion-reduce:transition-none"
      style={{ pointerEvents: shown ? "auto" : "none" }}
      /* Bubble phase, not capture: the button below must see the press first,
         then this stops it reaching the tile and arming the drag. */
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button type="button" className={BTN} onPointerDown={() => onRotate(-1)} aria-label={`Rotate ${page} left`}>
        <RotateCcw aria-hidden className="size-3.5" />
      </button>
      <button type="button" className={BTN} onPointerDown={() => onRotate(1)} aria-label={`Rotate ${page} right`}>
        <RotateCw aria-hidden className="size-3.5" />
      </button>
      <button type="button" className={BTN} onPointerDown={onDuplicate} aria-label={`Duplicate ${page}`}>
        <Copy aria-hidden className="size-3.5" />
      </button>
      <button
        type="button"
        className={`${BTN} hover:bg-[#e11d48]`}
        onPointerDown={onRemove}
        aria-label={`Delete ${page}`}
      >
        <Trash2 aria-hidden className="size-3.5" />
      </button>
    </motion.div>
  );
}
