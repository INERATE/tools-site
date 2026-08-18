"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { ResizeImageIcon } from "../components/icons/resize-image-icon";
import { ImageGrid } from "../components/image-board/image-grid";
import { useResizeImage } from "./use-resize-image";
import { STEPS } from "./pipeline-steps";

export default function ResizeImagePage() {
  const r = useResizeImage();
  const step = r.url ? 2 : r.images.length > 0 ? 1 : 0;
  const count = r.images.length;
  const first = r.images[0];

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Resize Image"
          busy={r.busy}
          icon={(active) => <ResizeImageIcon active={active} size={24} />}
          blurb="Scale photos down by the same percentage, keeping their aspect ratio and format. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="resize-image">
            <Dropzone
              id="resize-img-input"
              multiple
              accept="image/jpeg,image/png"
              onFiles={r.addFiles}
              label={count ? "Add more photos" : "Drop JPG or PNG photos here, or click to choose"}
            />

            {r.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {r.error}
              </p>
            )}

            {count > 0 && (
              <label className="mb-4 flex flex-col gap-1 text-[12.5px] text-[var(--text-dim)]">
                Scale — {r.percent}%
                {first && ` (${Math.round((first.w * r.percent) / 100)}×${Math.round((first.h * r.percent) / 100)}px for the first photo)`}
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={r.percent}
                  onChange={(e) => r.setPercent(Number(e.target.value))}
                  className="accent-[var(--accent)]"
                />
              </label>
            )}

            <ImageGrid images={r.images} move={r.move} remove={r.remove} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={first?.url}
              ratio={first ? first.w / first.h : undefined}
              count={count}
              itemLabel={count === 1 ? "photo" : "photos"}
              addInputId="resize-img-input"
              action={
                <RunAction
                  label="Resize"
                  busyLabel="Resizing…"
                  busy={r.busy}
                  disabled={count === 0}
                  url={r.url}
                  fileName={r.fileName}
                  onRun={r.run}
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
