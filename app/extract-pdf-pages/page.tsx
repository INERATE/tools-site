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
import { SplitIcon } from "../components/icons/split-icon";
import { ToolBoard } from "../components/page-board/tool-board";
import { thumbKey } from "../components/page-board/types";
import { usePageBoard } from "../components/page-board/use-page-board";
import { invalidateEdit } from "../lib/invalidate-edit";
import { useAssembleRun } from "../lib/use-assemble-run";
import { QuickPick } from "./quick-pick";
import { STEPS } from "./pipeline-steps";

export default function ExtractPdfPagesPage() {
  const board = usePageBoard({ single: true });
  const { busy, url, run, clearUrl } = useAssembleRun(board.files, board.slots, board.setError, "The extract failed.");
  const name = board.files[0]?.name.replace(/\.pdf$/i, "") ?? "extracted";
  const step = url ? 2 : board.files.length > 0 ? 1 : 0;
  const count = board.slots.length;
  const first = board.slots[0];
  const thumb = first && board.thumbs[thumbKey(first.src, first.page)];
  const edit = invalidateEdit(clearUrl);

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Extract PDF Pages"
          busy={busy || board.pending > 0}
          icon={(active) => <SplitIcon active={active} size={24} />}
          blurb="Pull specific pages into their own PDF. Type a range, or pick pages off the board and reorder them before saving. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="extract-pdf-pages">
            <Dropzone
              id="extract-pages-input"
              onFiles={edit(board.addFiles)}
              label={board.files.length ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {board.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {board.error}
              </p>
            )}

            {board.files.length > 0 && <QuickPick total={board.total} onKeep={edit(board.keepOnly)} />}

            <ToolBoard board={board} invalidate={clearUrl} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={thumb?.url}
              ratio={thumb ? thumb.w / thumb.h : undefined}
              count={count}
              itemLabel={`page${count === 1 ? "" : "s"}`}
              addInputId="extract-pages-input"
              action={
                <RunAction
                  label={count ? `Extract ${count} page${count === 1 ? "" : "s"}` : "Extract pages"}
                  busyLabel="Extracting…"
                  busy={busy}
                  disabled={count === 0}
                  url={url}
                  fileName={`${name}-extracted.pdf`}
                  onRun={run}
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
