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
import { WatermarkPdfIcon } from "../components/icons/watermark-pdf-icon";
import { WatermarkOptions } from "./watermark-options";
import { useWatermarkPdf } from "./use-watermark-pdf";
import { STEPS } from "./pipeline-steps";

export default function WatermarkPdfPage() {
  const w = useWatermarkPdf();
  const step = w.url ? 2 : w.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Watermark PDF"
          busy={w.busy}
          icon={(active) => <WatermarkPdfIcon active={active} size={24} />}
          blurb="Stamp a text watermark across every page — tiled diagonally, centered, or placed in a corner. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="watermark-pdf">
            <Dropzone
              id="watermark-pdf-input"
              onFiles={w.pick}
              label={w.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {w.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {w.error}
              </p>
            )}

            {w.file && (
              <WatermarkOptions
                text={w.text}
                onText={w.setText}
                position={w.position}
                onPosition={w.setPosition}
                opacity={w.opacity}
                onOpacity={w.setOpacity}
              />
            )}

            {w.thumb && (
              <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                <img src={w.thumb.url} alt="First page preview" className="w-full" />
              </div>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={w.thumb?.url}
              ratio={w.thumb ? w.thumb.w / w.thumb.h : undefined}
              count={w.file ? 1 : 0}
              itemLabel="PDF"
              addInputId="watermark-pdf-input"
              action={
                <RunAction
                  label="Watermark"
                  busyLabel="Stamping…"
                  busy={w.busy}
                  disabled={!w.file || !w.text.trim()}
                  url={w.url}
                  fileName={`${w.file?.name.replace(/\.pdf$/i, "") ?? "document"}-watermarked.pdf`}
                  onRun={w.run}
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
