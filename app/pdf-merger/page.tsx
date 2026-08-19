"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { MergeIcon } from "../components/icons/merge-icon";
import { FileOrderList } from "../components/page-board/file-order-list";
import { ToolBoard } from "../components/page-board/tool-board";
import { thumbKey } from "../components/page-board/types";
import { usePageBoard } from "../components/page-board/use-page-board";
import { invalidateEdit } from "../lib/invalidate-edit";
import { useAssembleRun } from "../lib/use-assemble-run";
import { STEPS } from "./pipeline-steps";

export default function PdfMergerPage() {
  const board = usePageBoard();
  const { busy, url, run, clearUrl } = useAssembleRun(board.files, board.slots, board.setError, "The merge failed.");
  const step = url ? 2 : board.slots.length > 0 ? 1 : 0;
  const count = board.slots.length;
  const first = board.slots[0];
  const thumb = first && board.thumbs[thumbKey(first.src, first.page)];
  const fileOrder = [...new Set(board.slots.map((s) => s.src))];

  const edit = invalidateEdit(clearUrl);

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PDF Merger"
          busy={busy || board.pending > 0}
          icon={(active) => <MergeIcon active={active} size={24} />}
          blurb="Add as many PDFs as you like, then arrange the result page by page — drag to reorder, rotate, duplicate or delete any page before you save. Everything runs in your browser; nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-merger">
            <Dropzone
              id="merger-input"
              multiple
              onFiles={edit(board.addFiles)}
              label={count ? "Add more PDFs" : "Drop PDFs here, or click to choose"}
            />

            {board.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {board.error}
              </p>
            )}

            <ToolBoard board={board} invalidate={clearUrl} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={thumb?.url}
              ratio={thumb ? thumb.w / thumb.h : undefined}
              count={count}
              itemLabel={`page${count === 1 ? "" : "s"}`}
              addInputId="merger-input"
              action={
                <RunAction
                  label={count ? `Save ${count} as one PDF` : "Save as one PDF"}
                  busyLabel="Assembling…"
                  busy={busy}
                  disabled={count === 0}
                  url={url}
                  fileName="merged.pdf"
                  onRun={run}
                />
              }
            />
            <FileOrderList files={board.files} order={fileOrder} onMove={board.moveFile} />
            <ToolPipeline active={step} steps={STEPS} />
            <AdSlot slot="tool-rail" />
          </div>
        </div>
      </main>
    </div>
  );
}
