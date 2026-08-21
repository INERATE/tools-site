"use client";

import type { Annotation, AnnotationKind } from "../annotation-types";
import type { LoadedPage } from "../engine/load-document";
import type { EditorMode, TextBlock } from "../types";
import { AnnotationLayer } from "./annotation-layer";
import { EditableBlock } from "./editable-block";

/** Tools that place something by dragging on the page rather than editing text. */
const DRAG_TOOL: Partial<Record<EditorMode, AnnotationKind>> = {
  draw: "draw",
  shapes: "rect",
  redact: "redact",
};

export function LiveCanvas({
  page, blocks, zoom, selected, onSelect, onEdit, tool, anno, color,
}: {
  page: LoadedPage;
  blocks: TextBlock[];
  zoom: number;
  selected: string | null;
  onSelect: (id: string | null) => void;
  onEdit: (id: string, text: string) => void;
  tool: EditorMode;
  color: string;
  anno: {
    items: Annotation[];
    drafting: Annotation | null;
    begin: (k: AnnotationKind, page: number, x: number, y: number, color: string) => void;
    extend: (x: number, y: number) => void;
    finish: () => void;
    remove: (id: string) => void;
  };
}) {
  const kind = DRAG_TOOL[tool];
  const placing = Boolean(kind);

  const at = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg bg-white ${placing ? "cursor-crosshair" : ""}`}
      style={{
        width: page.width * (zoom / 100),
        height: page.height * (zoom / 100),
        boxShadow: "0 40px 90px -20px rgba(0,0,0,.7)",
      }}
      onClick={() => !placing && onSelect(null)}
      onPointerDown={(e) => {
        if (!kind) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        const { x, y } = at(e);
        anno.begin(kind, page.index, x, y, color);
      }}
      onPointerMove={(e) => {
        if (!kind || !anno.drafting) return;
        const { x, y } = at(e);
        anno.extend(x, y);
      }}
      onPointerUp={() => kind && anno.finish()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={page.url} alt={`Page ${page.index + 1}`} className="absolute inset-0 size-full" draggable={false} />

      {!placing &&
        blocks.map((b) => (
          <EditableBlock key={b.id} block={b} active={selected === b.id} zoom={zoom} onSelect={onSelect} onEdit={onEdit} />
        ))}

      <AnnotationLayer
        items={anno.items.filter((a) => a.pageIndex === page.index)}
        drafting={anno.drafting?.pageIndex === page.index ? anno.drafting : null}
        onRemove={anno.remove}
        interactive={!placing}
      />
    </div>
  );
}
