"use client";

import { Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useCoarsePointer } from "../page-board/use-coarse-pointer";
import type { ImageItem } from "../../lib/image-item";

const SPRING = { type: "spring", bounce: 0, duration: 0.3 } as const;

/** One photo in an image grid — same drag/hover language as the PDF page board, minus rotate/duplicate. */
export function ImageTile({
  image,
  index,
  dragging,
  register,
  onDragTo,
  onDragState,
  onRemove,
}: {
  image: ImageItem;
  index: number;
  dragging: boolean;
  register: (id: string, el: HTMLElement | null) => void;
  onDragTo: (id: string, x: number, y: number) => void;
  onDragState: (id: string | null) => void;
  onRemove: () => void;
}) {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const [hot, setHot] = useState(false);

  return (
    <motion.li
      ref={(el) => register(image.id, el)}
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
      onDragStart={() => onDragState(image.id)}
      onDrag={(_, info) => onDragTo(image.id, info.point.x, info.point.y)}
      onDragEnd={() => onDragState(null)}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      tabIndex={0}
      aria-label={`${image.file.name}, position ${index + 1}`}
      className={`glass group relative touch-none overflow-hidden rounded-2xl outline-none
        ${dragging ? "cursor-grabbing" : "cursor-grab"} focus-visible:ring-2 focus-visible:ring-[var(--accent)]`}
      style={{ aspectRatio: `${image.w / image.h}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt="" draggable={false} className="pointer-events-none h-full w-full object-cover" />

      <span className="absolute top-2 left-2 z-20 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
        {index + 1}
      </span>

      <motion.div
        initial={false}
        animate={{ opacity: (hot || coarse) && !dragging ? 1 : 0, y: (hot || coarse) && !dragging ? 0 : 6 }}
        transition={{ type: "spring", bounce: 0, duration: 0.28 }}
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center p-2"
        style={{ pointerEvents: (hot || coarse) && !dragging ? "auto" : "none" }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onPointerDown={onRemove}
          aria-label={`Remove ${image.file.name}`}
          className="grid size-8 cursor-pointer place-items-center rounded-full bg-black/45 text-white/85 backdrop-blur-md transition-colors hover:bg-[#e11d48] hover:text-white active:scale-90"
        >
          <Trash2 aria-hidden className="size-3.5" />
        </button>
      </motion.div>
    </motion.li>
  );
}
