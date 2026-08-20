"use client";

import { ContextToolbar, SelectionHandles } from "./context-toolbar";
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
  const w = page.width * (zoom / 100);
  const h = page.height * (zoom / 100);

  return (
    <div
      className="relative shrink-0 rounded-lg bg-white"
      style={{ width: w, height: h, boxShadow: "0 40px 90px -20px rgba(0,0,0,.7)" }}
      onClick={() => onSelect(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={page.url} alt={`Page ${page.index + 1}`} className="absolute inset-0 size-full rounded-lg" />

      {blocks.map((b) => {
        const active = selected === b.id;
        return (
          <div
            key={b.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(b.id);
            }}
            className={`absolute cursor-text rounded-[2px] transition-colors ${
              active ? "outline-2 outline-[var(--accent)]" : "outline-1 outline-dashed outline-transparent hover:outline-[#8b84b8]"
            }`}
            style={{
              left: `${b.relX * 100}%`,
              top: `${b.relY * 100}%`,
              width: `${b.relWidth * 100}%`,
              height: `${b.relHeight * 100}%`,
              boxShadow: active ? "0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)" : undefined,
            }}
          >
            {active && (
              <>
                <SelectionHandles />
                <ContextToolbar font={b.fontFamily} size={Math.round(b.fontSize)} color="var(--accent)" />
              </>
            )}
            <span
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              onInput={(e) => onEdit(b.id, e.currentTarget.textContent ?? "")}
              className="block size-full outline-none"
              style={{
                fontSize: b.fontSize * (zoom / 100),
                lineHeight: 1,
                // The raster already shows the original glyphs; the live text is
                // transparent until edited so the two never double-render.
                color: b.isEdited ? "#111" : "transparent",
                background: b.isEdited ? "#fff" : "transparent",
              }}
            >
              {b.originalText}
            </span>
          </div>
        );
      })}
    </div>
  );
}
