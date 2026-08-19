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
import { CropImageIcon } from "../components/icons/crop-image-icon";
import { ImageGrid } from "../components/image-board/image-grid";
import { MarginSliders } from "../crop-pdf/margin-sliders";
import { shapeNeedsAlpha } from "../lib/crop-shape";
import { CropPreview } from "./crop-preview";
import { ShapePicker } from "./shape-picker";
import { useCropImage } from "./use-crop-image";
import { STEPS } from "./pipeline-steps";

export default function CropImagePage() {
  const c = useCropImage();
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
          title="Crop Image"
          busy={c.busy}
          icon={(active) => <CropImageIcon active={active} size={24} />}
          blurb="Trim the margin off every photo, then cut it to a shape — circle, rounded corners, or a custom outline. Non-rectangle shapes export as transparent PNG. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="crop-image">
            <Dropzone
              id="crop-img-input"
              multiple
              accept="image/jpeg,image/png"
              onFiles={c.addFiles}
              label={count ? "Add more photos" : "Drop JPG or PNG photos here, or click to choose"}
              hint="Images only — they never leave this tab"
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {count > 0 && <MarginSliders insets={c.insets} onChange={c.setInsets} />}
            {count > 0 && <ShapePicker shape={c.shape} onShape={c.setShape} />}

            {first && <CropPreview imageUrl={first.url} ratio={first.w / first.h} insets={c.insets} shape={c.shape} />}

            {shapeNeedsAlpha(c.shape) && (
              <p className="mb-4 text-[12.5px] text-[var(--text-dim)]">
                Exports as PNG so the area outside the shape stays transparent.
              </p>
            )}

            <ImageGrid images={c.images} move={c.move} remove={c.remove} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={first?.url}
              ratio={first ? first.w / first.h : undefined}
              count={count}
              itemLabel={count === 1 ? "photo" : "photos"}
              addInputId="crop-img-input"
              action={
                <RunAction
                  label="Crop"
                  busyLabel="Cropping…"
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
