"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { JpgToPdfIcon } from "../components/icons/jpg-to-pdf-icon";
import { ImageGrid } from "./image-grid";
import { useImageToPdf } from "./use-image-to-pdf";
import { STEPS } from "./pipeline-steps";

export default function JpgToPdfPage() {
  const im = useImageToPdf();
  const step = im.url ? 2 : im.images.length > 0 ? 1 : 0;
  const count = im.images.length;
  const first = im.images[0];

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="JPG to PDF"
          busy={im.busy}
          icon={(active) => <JpgToPdfIcon active={active} size={24} />}
          blurb="Turn photos into one PDF, one page per image, in the order you set. Everything runs in your browser; nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="jpg-to-pdf">
            <Dropzone
              id="jpg-input"
              multiple
              accept="image/jpeg,image/png"
              onFiles={im.addFiles}
              label={count ? "Add more photos" : "Drop JPG or PNG photos here, or click to choose"}
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
              itemLabel={`photo${count === 1 ? "" : "s"}`}
              addInputId="jpg-input"
              action={
                <RunAction
                  label={count ? `Save ${count} as one PDF` : "Save as one PDF"}
                  busyLabel="Building…"
                  busy={im.busy}
                  disabled={count === 0}
                  url={im.url}
                  fileName="photos.pdf"
                  onRun={im.run}
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
