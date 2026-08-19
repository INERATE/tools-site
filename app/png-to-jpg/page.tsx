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
import { ConvertImageIcon } from "../components/icons/convert-image-icon";
import { ImageGrid } from "../components/image-board/image-grid";
import { useLockedImageFormat } from "../lib/use-locked-image-format";
import { STEPS } from "./pipeline-steps";

/** Same engine as /convert-image, locked to JPG output — SEO-templated landing page for the "png to jpg" query. */
export default function PngToJpgPage() {
  const c = useLockedImageFormat("image/jpeg");
  const step = c.url ? 2 : c.images.length > 0 ? 1 : 0;
  const count = c.images.length;
  const first = c.images[0];

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PNG to JPG"
          busy={c.busy}
          icon={(active) => <ConvertImageIcon active={active} size={24} />}
          blurb="Turn PNG images into JPG. Transparency is dropped, since JPEG has none. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="png-to-jpg">
            <Dropzone
              id="png-to-jpg-input"
              multiple
              accept="image/png"
              onFiles={c.addFiles}
              label={count ? "Add more images" : "Drop PNG images here, or click to choose"}
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            <ImageGrid images={c.images} move={c.move} remove={c.remove} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={first?.url}
              ratio={first ? first.w / first.h : undefined}
              count={count}
              itemLabel={`image${count === 1 ? "" : "s"}`}
              addInputId="png-to-jpg-input"
              action={
                <RunAction
                  label={count ? `Convert ${count} to JPG` : "Convert to JPG"}
                  busyLabel="Converting…"
                  busy={c.busy}
                  disabled={count === 0}
                  url={c.url}
                  fileName={c.fileName}
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
