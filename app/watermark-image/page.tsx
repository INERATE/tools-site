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
import { WatermarkImageIcon } from "../components/icons/watermark-image-icon";
import { ImageGrid } from "../components/image-board/image-grid";
import { WatermarkOptions } from "./watermark-options";
import { useWatermarkImage } from "./use-watermark-image";
import { STEPS } from "./pipeline-steps";

export default function WatermarkImagePage() {
  const w = useWatermarkImage();
  const step = w.url ? 2 : w.images.length > 0 ? 1 : 0;
  const count = w.images.length;
  const first = w.images[0];

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Watermark Image"
          busy={w.busy}
          icon={(active) => <WatermarkImageIcon active={active} size={24} />}
          blurb="Stamp a text watermark onto your photos — tiled across the whole image, or placed once. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="watermark-image">
            <Dropzone
              id="watermark-img-input"
              multiple
              accept="image/jpeg,image/png"
              onFiles={w.addFiles}
              label={count ? "Add more photos" : "Drop JPG or PNG photos here, or click to choose"}
            />

            {w.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {w.error}
              </p>
            )}

            {count > 0 && (
              <WatermarkOptions
                text={w.text}
                onText={w.setText}
                position={w.position}
                onPosition={w.setPosition}
                opacity={w.opacity}
                onOpacity={w.setOpacity}
              />
            )}

            <ImageGrid images={w.images} move={w.move} remove={w.remove} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={first?.url}
              ratio={first ? first.w / first.h : undefined}
              count={count}
              itemLabel={count === 1 ? "photo" : "photos"}
              addInputId="watermark-img-input"
              action={
                <RunAction
                  label="Watermark"
                  busyLabel="Stamping…"
                  busy={w.busy}
                  disabled={count === 0 || !w.text.trim()}
                  url={w.url}
                  fileName={w.fileName}
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
