"use client";

import type { usePdfEditor } from "../hooks/use-pdf-editor";
import type { EditorMode } from "../types";
import { LiveCanvas } from "./live-canvas";

/** The scrolling page area: scanned-page notice plus the live canvas. */
export function EditorStage({
  e, zoom, tool, color,
}: {
  e: ReturnType<typeof usePdfEditor>;
  zoom: number;
  tool: EditorMode;
  color: string;
}) {
  const current = e.pages[e.page];
  if (!current) return null;

  return (
    <main
      className="flex-1 overflow-auto p-6"
      style={{ background: "color-mix(in srgb, var(--bg) 92%, black)" }}
    >
      {current.scanned && (
        <div className="mx-auto mb-4 w-fit max-w-full rounded-xl border border-amber-500/30 bg-amber-500/8 px-4 py-2.5 text-[12.5px] text-amber-400">
          This page is a scan — an image with no text layer. Nothing on it can be edited as text.
          Run it through <a href="/ocr-pdf" className="underline">OCR PDF</a> first to make the text real.
        </div>
      )}
      <div className="mx-auto w-fit">
        <LiveCanvas
          page={current}
          blocks={e.blocks.filter((b) => b.pageIndex === e.page)}
          zoom={zoom}
          selected={e.selected}
          onSelect={e.setSelected}
          onEdit={e.editBlock}
          tool={tool}
          color={color}
          anno={e.anno}
        />
      </div>
    </main>
  );
}
