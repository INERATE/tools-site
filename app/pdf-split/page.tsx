"use client";

import { useState } from "react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolHead } from "../components/tool-head";
import { SplitIcon } from "../components/icons/split-icon";
import { ToolBoard } from "../components/page-board/tool-board";
import { usePageBoard } from "../components/page-board/use-page-board";
import { assemblePdf } from "../lib/assemble-pdf";
import { QuickPick } from "./quick-pick";

export default function PdfSplitPage() {
  const board = usePageBoard({ single: true });
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const name = board.files[0]?.name.replace(/\.pdf$/i, "") ?? "split";

  async function run() {
    setBusy(true);
    try {
      const blob = await assemblePdf(board.files, board.slots);
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      board.setError(e instanceof Error ? e.message : "The split failed.");
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
      <main className="mx-auto max-w-4xl px-6 py-16">
        <ToolHead
          title="PDF Splitter"
          busy={busy || board.pending > 0}
          icon={(active) => <SplitIcon active={active} size={24} />}
          blurb="Pull out exactly the pages you want. Type a range for speed, or drop pages straight off the board — you can reorder and rotate what is left before saving. Everything runs in your browser; nothing is uploaded."
        />

        <Dropzone
          onFiles={edit(board.addFiles)}
          label={board.files.length ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
        />

        {board.error && (
          <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
            {board.error}
          </p>
        )}

        {board.files.length > 0 && (
          <QuickPick total={board.total} onKeep={edit(board.keepOnly)} />
        )}

        <ToolBoard board={board} invalidate={() => setUrl(null)} />

        {board.slots.length > 0 && (
          <RunAction
            label={`Extract ${board.slots.length} page${board.slots.length === 1 ? "" : "s"}`}
            busyLabel="Extracting…"
            busy={busy}
            url={url}
            fileName={`${name}-pages.pdf`}
            onRun={run}
          />
        )}
      </main>
    </div>
  );
}
