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
import { CropPdfIcon } from "../components/icons/crop-pdf-icon";
import { CropOverlay } from "./crop-overlay";
import { MarginSliders } from "./margin-sliders";
import { useCrop } from "./use-crop";
import { STEPS } from "./pipeline-steps";

export default function CropPdfPage() {
  const c = useCrop();
  const step = c.url ? 2 : c.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Crop PDF"
          busy={c.busy}
          icon={(active) => <CropPdfIcon active={active} size={24} />}
          blurb="Trim the same margin off every page — set it live on a preview of page 1. This hides content outside the box rather than deleting it, so an over-aggressive crop is never destructive. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="crop-pdf">
            <Dropzone
              id="crop-input"
              onFiles={c.pick}
              label={c.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {c.file && <MarginSliders insets={c.insets} onChange={c.setInsets} />}

            {c.preview && <CropOverlay pageUrl={c.preview.url} pageRatio={c.preview.ratio} insets={c.insets} />}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={c.preview?.url}
              ratio={c.preview?.ratio}
              count={c.file ? 1 : 0}
              itemLabel="PDF"
              addInputId="crop-input"
              action={
                <RunAction
                  label="Crop PDF"
                  busyLabel="Cropping…"
                  busy={c.busy}
                  disabled={!c.file}
                  url={c.url}
                  fileName={`${c.file?.name.replace(/\.pdf$/i, "") ?? "document"}-cropped.pdf`}
                  onRun={c.run}
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
