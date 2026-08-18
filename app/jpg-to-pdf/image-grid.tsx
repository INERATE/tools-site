"use client";

import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { GRID } from "../components/page-board/board";
import { useSortable } from "../components/page-board/use-sortable";
import { ImageTile } from "./image-tile";
import type { ImageItem } from "../lib/assemble-images-pdf";

export function ImageGrid({
  images,
  move,
  remove,
}: {
  images: ImageItem[];
  move: (from: number, to: number) => void;
  remove: (id: string) => void;
}) {
  const { register, setOrder, onDrag, dragging, setDragging } = useSortable(move);
  useEffect(() => setOrder(images.map((i) => i.id)), [images, setOrder]);

  if (images.length === 0) return null;

  return (
    <ul className={GRID}>
      <AnimatePresence initial={false}>
        {images.map((image, i) => (
          <ImageTile
            key={image.id}
            image={image}
            index={i}
            dragging={dragging === image.id}
            register={register}
            onDragTo={onDrag}
            onDragState={setDragging}
            onRemove={() => remove(image.id)}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
