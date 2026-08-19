"use client";

import { Loader2 } from "lucide-react";
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
import { PdfToMarkdownIcon } from "../components/icons/pdf-to-markdown-icon";
import { TextPreview } from "./text-preview";
import { usePdfToText } from "./use-pdf-to-text";
import { STEPS } from "./pipeline-steps";

/** Plain-text extraction — a lighter sibling of /pdf-to-markdown for the much higher-volume "pdf to text" query. */
export default function PdfToTextPage() {
  const t = usePdfToText();
  const step = t.url && !t.busy ? 2 : t.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PDF to Text"
          busy={t.busy}
          icon={(active) => <PdfToMarkdownIcon active={active} size={24} />}
          blurb="Pulls every line of selectable text out of a PDF and saves it as a plain .txt file. Works on real text, not scanned images. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-to-text">
            <Dropzone
              id="pdf-to-text-input"
              onFiles={t.pick}
              label={t.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {t.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {t.error}
              </p>
            )}

            {t.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Reading {t.name}…
              </p>
            )}

            {t.url && !t.busy && <TextPreview lines={t.lines} />}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={t.lines.length}
              itemLabel={t.lines.length === 1 ? "line" : "lines"}
              addInputId="pdf-to-text-input"
              action={
                <RunAction
                  label="Download the text"
                  busyLabel="Reading…"
                  busy={t.busy}
                  disabled={!t.url}
                  url={t.url}
                  fileName={`${t.name?.replace(/\.pdf$/i, "") ?? "document"}.txt`}
                  onRun={() => {}}
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
