"use client";

import { Loader2, ImageDown } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { ToolHead } from "../components/tool-head";
import { ToImageIcon } from "../components/icons/to-image-icon";
import { ToolBoard } from "../components/page-board/tool-board";
import { usePageBoard } from "../components/page-board/use-page-board";
import { PageGrid } from "./page-grid";
import { RenderOptions } from "./render-options";
import { useRender } from "./use-render";

const ACTION =
  "clay mt-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] " +
  "font-semibold disabled:cursor-default disabled:opacity-60";

export default function PdfToImagePage() {
  const board = usePageBoard({ single: true });
  const r = useRender();
  const base = board.files[0]?.name.replace(/\.pdf$/i, "") ?? "page";
  const ext = r.format === "jpeg" ? "jpg" : "png";

  const edit = <A extends unknown[]>(fn: (...a: A) => void) => (...a: A) => {
    r.reset(); // rendered images would no longer match the board
    fn(...a);
  };

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <ToolHead
          title="PDF to Image"
          busy={r.busy || board.pending > 0}
          icon={(active) => <ToImageIcon active={active} size={24} />}
          blurb="Export pages as PNG or JPG. Drop the pages you do not want, rotate the ones you do, then convert — rendering happens in your browser and nothing is uploaded."
        />

        <Dropzone
          onFiles={edit(board.addFiles)}
          label={board.files.length ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
        />

        {(board.error || r.error) && (
          <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
            {board.error ?? r.error}
          </p>
        )}

        {board.files.length > 0 && (
          <RenderOptions
            name={board.files[0].name}
            format={r.format}
            scale={r.scale}
            onFormat={(f) => {
              r.setFormat(f);
              r.reset();
            }}
            onScale={(s) => {
              r.setScale(s);
              r.reset();
            }}
          />
        )}

        <ToolBoard board={board} invalidate={() => r.reset()} />

        {board.slots.length > 0 && r.pages.length === 0 && (
          <button
            onClick={() => r.run(board.files, board.slots)}
            disabled={r.busy}
            className={`${ACTION} shimmer`}
          >
            {r.busy ? (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            ) : (
              <ImageDown aria-hidden className="size-4" />
            )}
            {r.busy
              ? r.total
                ? `Rendering ${r.done} of ${r.total}…`
                : "Loading renderer…"
              : `Convert ${board.slots.length} page${board.slots.length === 1 ? "" : "s"} to ${ext.toUpperCase()}`}
          </button>
        )}

        <PageGrid pages={r.pages} base={base} ext={ext} />
      </main>
    </div>
  );
}
