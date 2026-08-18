"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { RotatePdfIcon } from "../components/icons/rotate-pdf-icon";
import { ToolBoard } from "../components/page-board/tool-board";
import { thumbKey } from "../components/page-board/types";
import { usePageBoard } from "../components/page-board/use-page-board";
import { invalidateEdit } from "../lib/invalidate-edit";
import { useAssembleRun } from "../lib/use-assemble-run";
import { STEPS } from "./pipeline-steps";

export default function RotatePdfPage() {
  const board = usePageBoard({ single: true });
  const { busy, url, run, clearUrl } = useAssembleRun(board.files, board.slots, board.setError, "The rotation failed.");
  const step = url ? 2 : board.slots.length > 0 ? 1 : 0;
  const count = board.slots.length;
  const first = board.slots[0];
  const thumb = first && board.thumbs[thumbKey(first.src, first.page)];
  const edit = invalidateEdit(clearUrl);
  const name = board.files[0]?.name.replace(/\.pdf$/i, "") ?? "document";

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Rotate PDF"
          busy={busy || board.pending > 0}
          icon={(active) => <RotatePdfIcon active={active} size={24} />}
          blurb="Fix sideways or upside-down pages — rotate every page at once, or just the ones that need it. Everything runs in your browser; nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="rotate-pdf">
            <Dropzone
              id="rotate-input"
              onFiles={edit(board.addFiles)}
              label={count ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
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
              addInputId="rotate-input"
              action={
                <RunAction
                  label="Save rotated PDF"
                  busyLabel="Saving…"
                  busy={busy}
                  disabled={count === 0}
                  url={url}
                  fileName={`${name}-rotated.pdf`}
                  onRun={run}
                />
              }
            />
            <ToolPipeline active={step} steps={STEPS} />
          </div>
        </div>
      </main>
    </div>
  );
}
