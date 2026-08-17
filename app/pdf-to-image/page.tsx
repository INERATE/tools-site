"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { ToImageIcon } from "../components/icons/to-image-icon";
import { ToolBoard } from "../components/page-board/tool-board";
import { usePageBoard } from "../components/page-board/use-page-board";
import { ConvertButton } from "./convert-button";
import { PageGrid } from "./page-grid";
import { RenderOptions } from "./render-options";
import { useRender } from "./use-render";
import { STEPS } from "./pipeline-steps";

export default function PdfToImagePage() {
  const board = usePageBoard({ single: true });
  const r = useRender();
  const base = board.files[0]?.name.replace(/\.pdf$/i, "") ?? "page";
  const ext = r.format === "jpeg" ? "jpg" : "png";
  const step = r.pages.length > 0 ? 2 : board.files.length > 0 ? 1 : 0;

  const edit = <A extends unknown[]>(fn: (...a: A) => void) => (...a: A) => {
    r.reset(); // rendered images would no longer match the board
    fn(...a);
  };

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="PDF to Image"
          busy={r.busy || board.pending > 0}
          icon={(active) => <ToImageIcon active={active} size={24} />}
          blurb="Export pages as PNG or JPG. Drop the pages you do not want, rotate the ones you do, then convert — rendering happens in your browser and nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-to-image">
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
              <ConvertButton
                count={board.slots.length}
                ext={ext}
                busy={r.busy}
                done={r.done}
                total={r.total}
                onRun={() => r.run(board.files, board.slots)}
              />
            )}

            <PageGrid pages={r.pages} base={base} ext={ext} />
          </ToolWindow>

          <ToolPipeline active={step} steps={STEPS} />
        </div>
      </main>
    </div>
  );
}
