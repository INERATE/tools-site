"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { ToImageIcon } from "../components/icons/to-image-icon";
import { ToolBoard } from "../components/page-board/tool-board";
import { thumbKey } from "../components/page-board/types";
import { usePageBoard } from "../components/page-board/use-page-board";
import { invalidateEdit } from "../lib/invalidate-edit";
import { ConvertAction } from "./convert-action";
import { PageGrid } from "./page-grid";
import { railThumb } from "./rail-thumb";
import { RenderOptions } from "./render-options";
import { useRender } from "./use-render";
import { STEPS } from "./pipeline-steps";

export default function PdfToImagePage() {
  const board = usePageBoard({ single: true });
  const r = useRender();
  const base = board.files[0]?.name.replace(/\.pdf$/i, "") ?? "page";
  const ext = r.format === "jpeg" ? "jpg" : "png";
  const step = r.pages.length > 0 ? 2 : board.files.length > 0 ? 1 : 0;
  const count = board.slots.length;
  const edit = invalidateEdit(r.reset);
  const first = board.slots[0];
  const thumb = railThumb(r.pages[0], first && board.thumbs[thumbKey(first.src, first.page)]);

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PDF to Image"
          busy={r.busy || board.pending > 0}
          icon={(active) => <ToImageIcon active={active} size={24} />}
          blurb="Export pages as PNG or JPG. Drop the pages you do not want, rotate the ones you do, then convert — rendering happens in your browser and nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-to-image">
            <Dropzone
              id="to-image-input"
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
                onFormat={edit(r.setFormat)}
                onScale={edit(r.setScale)}
              />
            )}

            <ToolBoard board={board} invalidate={r.reset} />
            <PageGrid pages={r.pages} base={base} ext={ext} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={thumb.url}
              ratio={thumb.ratio}
              count={count}
              itemLabel={`page${count === 1 ? "" : "s"}`}
              addInputId="to-image-input"
              action={
                <ConvertAction
                  pages={r.pages}
                  count={count}
                  ext={ext}
                  busy={r.busy}
                  done={r.done}
                  total={r.total}
                  onRun={() => r.run(board.files, board.slots)}
                />
              }
            />
            <ToolPipeline active={step} steps={STEPS} />
            <AdSlot slot="tool-rail" />
          </div>
        </div>
      </main>
    </div>
  );
}
