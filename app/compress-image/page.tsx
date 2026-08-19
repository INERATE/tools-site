"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { CompressImageIcon } from "../components/icons/compress-image-icon";
import { ImageGrid } from "../components/image-board/image-grid";
import { useCompressImage } from "./use-compress-image";
import { STEPS } from "./pipeline-steps";

const fmt = (n: number) => (n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export default function CompressImagePage() {
  const c = useCompressImage();
  const step = c.url ? 2 : c.images.length > 0 ? 1 : 0;
  const count = c.images.length;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Compress Image"
          busy={c.busy}
          icon={(active) => <CompressImageIcon active={active} size={24} />}
          blurb="Shrink JPGs and PNGs down for the web. JPEGs shrink the most — PNG is a lossless format, so the slider mostly helps photos, not graphics. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="compress-image">
            <Dropzone
              id="compress-img-input"
              multiple
              accept="image/jpeg,image/png"
              onFiles={c.addFiles}
              label={count ? "Add more photos" : "Drop JPG or PNG photos here, or click to choose"}
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {count > 0 && (
              <label className="mb-4 flex flex-col gap-1 text-[12.5px] text-[var(--text-dim)]">
                Quality — {Math.round(c.quality * 100)}%
                <input
                  type="range"
                  min={10}
                  max={95}
                  value={Math.round(c.quality * 100)}
                  onChange={(e) => c.setQuality(Number(e.target.value) / 100)}
                  className="accent-[var(--accent)]"
                />
              </label>
            )}

            {c.sizes.outSize > 0 && (
              <p className="mb-4 text-[12.5px] text-[var(--text-dim)]">
                {fmt(c.sizes.inSize)} →{" "}
                <span className={`font-semibold ${c.sizes.outSize < c.sizes.inSize ? "text-emerald-500" : "text-amber-500"}`}>
                  {fmt(c.sizes.outSize)}
                </span>
              </p>
            )}

            <ImageGrid images={c.images} move={c.move} remove={c.remove} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={c.images[0]?.url}
              ratio={c.images[0] ? c.images[0].w / c.images[0].h : undefined}
              count={count}
              itemLabel={count === 1 ? "photo" : "photos"}
              addInputId="compress-img-input"
              action={
                <RunAction
                  label="Compress"
                  busyLabel="Compressing…"
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
