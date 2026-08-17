"use client";

import { useState } from "react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { MergeIcon } from "../components/icons/merge-icon";
import { ToolBoard } from "../components/page-board/tool-board";
import { usePageBoard } from "../components/page-board/use-page-board";
import { assemblePdf } from "../lib/assemble-pdf";
import { STEPS } from "./pipeline-steps";

export default function PdfMergerPage() {
  const board = usePageBoard();
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const step = url ? 2 : board.slots.length > 0 ? 1 : 0;

  async function run() {
    setBusy(true);
    try {
      const blob = await assemblePdf(board.files, board.slots);
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      board.setError(e instanceof Error ? e.message : "The merge failed.");
    } finally {
      setBusy(false);
    }
  }

  const edit = <A extends unknown[]>(fn: (...a: A) => void) => (...a: A) => {
    setUrl(null); // a finished file would no longer match the board
    fn(...a);
  };

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="PDF Merger"
          busy={busy || board.pending > 0}
          icon={(active) => <MergeIcon active={active} size={24} />}
          blurb="Add as many PDFs as you like, then arrange the result page by page — drag to reorder, rotate, duplicate or delete any page before you save. Everything runs in your browser; nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-merger">
            <Dropzone
              multiple
              onFiles={edit(board.addFiles)}
              label={board.slots.length ? "Add more PDFs" : "Drop PDFs here, or click to choose"}
            />

            {board.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {board.error}
              </p>
            )}

            <ToolBoard board={board} invalidate={() => setUrl(null)} />

            {board.slots.length > 0 && (
              <RunAction
                label={`Save ${board.slots.length} page${board.slots.length === 1 ? "" : "s"} as one PDF`}
                busyLabel="Assembling…"
                busy={busy}
                url={url}
                fileName="merged.pdf"
                onRun={run}
              />
            )}
          </ToolWindow>

          <ToolPipeline active={step} steps={STEPS} />
        </div>
      </main>
    </div>
  );
}
