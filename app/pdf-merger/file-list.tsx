"use client";

import { ArrowDown, ArrowUp, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Stable id per pick — index keys would misdirect exit and reorder animations. */
export type Item = { id: string; file: File };

const BTN =
  "grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-[var(--text-dim)] " +
  "transition-colors hover:text-[var(--accent)] disabled:cursor-default disabled:opacity-30";

const SPRING = { type: "spring", bounce: 0, duration: 0.35 } as const;

export function FileList({
  items,
  onMove,
  onRemove,
}: {
  items: Item[];
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (index: number) => void;
}) {
  const reduced = useReducedMotion();
  if (items.length === 0) return null;

  return (
    <ul className="mb-6 flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {items.map(({ id, file }, i) => (
          <motion.li
            key={id}
            layout={!reduced}
            initial={{ opacity: 0, y: reduced ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
            transition={SPRING}
            className="glass flex items-center gap-1 rounded-2xl py-2 pr-2 pl-4"
          >
            <span className="w-5 shrink-0 text-[12px] font-semibold text-[var(--accent)]">{i + 1}</span>
            <span className="flex-1 truncate text-sm">{file.name}</span>
            <button onClick={() => onMove(i, -1)} disabled={i === 0} className={BTN} aria-label={`Move ${file.name} up`}>
              <ArrowUp className="size-4" />
            </button>
            <button
              onClick={() => onMove(i, 1)}
              disabled={i === items.length - 1}
              className={BTN}
              aria-label={`Move ${file.name} down`}
            >
              <ArrowDown className="size-4" />
            </button>
            <button onClick={() => onRemove(i)} className={BTN} aria-label={`Remove ${file.name}`}>
              <X className="size-4" />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
