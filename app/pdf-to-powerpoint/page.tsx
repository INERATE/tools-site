"use client";

import { Info, Loader2 } from "lucide-react";
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
import { PdfToPptxIcon } from "../components/icons/pdf-to-pptx-icon";
import { usePdfToPptx } from "./use-pdf-to-pptx";
import { STEPS } from "./pipeline-steps";

export default function PdfToPowerPointPage() {
  const c = usePdfToPptx();
  const step = c.url && !c.busy ? 2 : c.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PDF to PowerPoint"
          busy={c.busy}
          icon={(active) => <PdfToPptxIcon active={active} size={24} />}
          blurb="Turns each page into a full-bleed slide image — pixel-exact, but text is not editable in PowerPoint afterward. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-to-powerpoint">
            <Dropzone
              id="pptx-input"
              onFiles={c.pick}
              label={c.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {c.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Building slides… {Math.round(c.progress * 100)}%
              </p>
            )}

            {c.url && !c.busy && (
              <div className="glass flex items-start gap-2 rounded-2xl p-4 text-[12.5px] leading-[1.55] text-[var(--text-dim)]">
                <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  <strong className="font-semibold text-[var(--text)]">{c.slideCount} slide{c.slideCount === 1 ? "" : "s"} built.</strong>{" "}
                  Each is an image of the original page — visually exact, but text inside it is not editable.
                </span>
              </div>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={c.thumb?.url}
              ratio={c.thumb ? c.thumb.w / c.thumb.h : undefined}
              count={c.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="pptx-input"
              action={
                <RunAction
                  label="Download the PPTX"
                  busyLabel="Converting…"
                  busy={c.busy}
                  disabled={!c.url}
                  url={c.url}
                  fileName={`${c.name?.replace(/\.pdf$/i, "") ?? "document"}.pptx`}
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
