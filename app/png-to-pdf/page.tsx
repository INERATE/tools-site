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
import { JpgToPdfIcon } from "../components/icons/jpg-to-pdf-icon";
import { ImageGrid } from "../components/image-board/image-grid";
import { useImageToPdf } from "../jpg-to-pdf/use-image-to-pdf";
import { STEPS } from "./pipeline-steps";

/** Same engine as /jpg-to-pdf — separate SEO-templated landing page for the "png to pdf" query. */
export default function PngToPdfPage() {
  const im = useImageToPdf();
  const step = im.url ? 2 : im.images.length > 0 ? 1 : 0;
  const count = im.images.length;
  const first = im.images[0];

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PNG to PDF"
          busy={im.busy}
          icon={(active) => <JpgToPdfIcon active={active} size={24} />}
          blurb="Turn PNG images into one PDF, one page per image, in the order you set. Everything runs in your browser; nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="png-to-pdf">
            <Dropzone
              id="png-input"
              multiple
              accept="image/png,image/jpeg"
              onFiles={im.addFiles}
              label={count ? "Add more images" : "Drop PNG (or JPG) images here, or click to choose"}
              hint="Images only — they never leave this tab"
            />

            {im.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {im.error}
              </p>
            )}

            <ImageGrid images={im.images} move={im.move} remove={im.remove} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={first?.url}
              ratio={first ? first.w / first.h : undefined}
              count={count}
              itemLabel={`image${count === 1 ? "" : "s"}`}
              addInputId="png-input"
              action={
                <RunAction
                  label={count ? `Save ${count} as one PDF` : "Save as one PDF"}
                  busyLabel="Building…"
                  busy={im.busy}
                  disabled={count === 0}
                  url={im.url}
                  fileName="images.pdf"
                  onRun={im.run}
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
