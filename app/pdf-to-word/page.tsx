"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { PdfToWordIcon } from "../components/icons/pdf-to-word-icon";
import { usePdfToWord } from "./use-pdf-to-word";
import { WordPreview } from "./word-preview";
import { STEPS } from "./pipeline-steps";

export default function PdfToWordPage() {
  const w = usePdfToWord();
  const step = w.url && !w.busy ? 2 : w.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="PDF to Word"
          busy={w.busy}
          icon={(active) => <PdfToWordIcon active={active} size={24} />}
          blurb="Pulls the text out of a PDF and rebuilds it as an editable .docx. Works on real, selectable text — not scanned images. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-to-word">
            <Dropzone
              id="pdf-to-word-input"
              onFiles={w.pick}
              label={w.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {w.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {w.error}
              </p>
            )}

            {w.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Converting… {Math.round(w.progress * 100)}%
              </p>
            )}

            {w.previewHtml && !w.busy && <WordPreview html={w.previewHtml} />}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={w.thumb?.url}
              ratio={w.thumb ? w.thumb.w / w.thumb.h : undefined}
              count={w.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="pdf-to-word-input"
              action={
                <RunAction
                  label="Download the DOCX"
                  busyLabel="Converting…"
                  busy={w.busy}
                  disabled={!w.url}
                  url={w.url}
                  fileName={`${w.name?.replace(/\.pdf$/i, "") ?? "document"}.docx`}
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
