"use client";

import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Tile } from "./tile";
import { useSortable } from "./use-sortable";
import { thumbKey, type Slot, type Thumb } from "./types";

const GRID = "grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(116px,1fr))] sm:gap-4 sm:[grid-template-columns:repeat(auto-fill,minmax(146px,1fr))]";

export function PageBoard({
  files,
  slots,
  thumbs,
  move,
  remove,
  rotate,
  duplicate,
}: {
  files: File[];
  slots: Slot[];
  thumbs: Record<string, Thumb>;
  move: (from: number, to: number) => void;
  remove: (id: string) => void;
  rotate: (id: string, dir: 1 | -1) => void;
  duplicate: (id: string) => void;
}) {
  const { register, setOrder, onDrag, dragging, setDragging } = useSortable(move);

  // The drag reads order from a ref, so it has to track the committed list.
  useEffect(() => setOrder(slots.map((s) => s.id)), [slots, setOrder]);

  if (slots.length === 0) return null;

  return (
    <ul className={GRID}>
      <AnimatePresence initial={false}>
        {slots.map((slot, i) => (
          <Tile
            key={slot.id}
            slot={slot}
            index={i}
            thumb={thumbs[thumbKey(slot.src, slot.page)]}
            label={
              files.length > 1
                ? `Page ${slot.page + 1} of ${files[slot.src]?.name ?? "a removed file"}`
                : `Page ${slot.page + 1}`
            }
            dragging={dragging === slot.id}
            register={register}
            onDragTo={onDrag}
            onDragState={setDragging}
            ops={{
              rotate: (dir) => rotate(slot.id, dir),
              duplicate: () => duplicate(slot.id),
              remove: () => remove(slot.id),
              nudge: (dir) => move(i, i + dir), // move() ignores out-of-range, so the ends are safe
            }}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
