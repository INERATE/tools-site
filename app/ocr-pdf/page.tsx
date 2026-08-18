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
import { OcrPdfIcon } from "../components/icons/ocr-pdf-icon";
import { useOcr } from "./use-ocr";
import { STEPS } from "./pipeline-steps";

export default function OcrPdfPage() {
  const o = useOcr();
  const step = o.url ? 2 : o.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="OCR PDF"
          busy={o.busy}
          icon={(active) => <OcrPdfIcon active={active} size={24} />}
          blurb="Makes a scanned PDF searchable and selectable — the recognized text is layered invisibly over the original page image. Recognition runs on-device; the one exception to 'nothing is uploaded' is that the small recognition model downloads on first use."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="ocr-pdf" badge="Downloads OCR model">
            <Dropzone
              id="ocr-input"
              onFiles={o.pick}
              label={o.file ? "Choose a different PDF" : "Drop a scanned PDF here, or click to choose"}
            />

            {o.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {o.error}
              </p>
            )}

            {o.busy && (
              <p className="flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Recognizing text… {Math.round(o.progress * 100)}%
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={o.thumb?.url}
              ratio={o.thumb ? o.thumb.w / o.thumb.h : undefined}
              count={o.file ? 1 : 0}
              itemLabel="PDF"
              addInputId="ocr-input"
              action={
                <RunAction
                  label="Run OCR"
                  busyLabel="Recognizing…"
                  busy={o.busy}
                  disabled={!o.file}
                  url={o.url}
                  fileName={`${o.file?.name.replace(/\.pdf$/i, "") ?? "document"}-ocr.pdf`}
                  onRun={o.run}
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
