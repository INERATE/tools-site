"use client";

import { EditableBlock } from "./editable-block";
import type { LoadedPage } from "../engine/load-document";
import type { TextBlock } from "../types";

/** The real page: a rendered raster with one absolutely-placed editable box per text line. */
export function LiveCanvas({
  page, blocks, zoom, selected, onSelect, onEdit,
}: {
  page: LoadedPage;
  blocks: TextBlock[];
  zoom: number;
  selected: string | null;
  onSelect: (id: string | null) => void;
  onEdit: (id: string, text: string) => void;
}) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-lg bg-white"
      style={{
        width: page.width * (zoom / 100),
        height: page.height * (zoom / 100),
        boxShadow: "0 40px 90px -20px rgba(0,0,0,.7)",
      }}
      onClick={() => onSelect(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={page.url} alt={`Page ${page.index + 1}`} className="absolute inset-0 size-full" />

      {blocks.map((b) => (
        <EditableBlock
          key={b.id}
          block={b}
          active={selected === b.id}
          zoom={zoom}
          onSelect={onSelect}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
