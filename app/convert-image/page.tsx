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
import type { ImageFormat } from "../lib/transform-image";
import { useConvertImage } from "./use-convert-image";
import { STEPS } from "./pipeline-steps";

const FORMATS: { value: ImageFormat; label: string }[] = [
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WEBP" },
];

export default function ConvertImagePage() {
  const c = useConvertImage();
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
          title="Convert Image"
          busy={c.busy}
          icon={(active) => <ConvertImageIcon active={active} size={24} />}
          blurb="Switch photos between JPG, PNG and WEBP. Converting to JPG drops transparency, since JPEG has none. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="convert-image">
            <Dropzone
              id="convert-img-input"
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
              <div className="mb-4 flex gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => c.setFormat(f.value)}
                    className={`rounded-xl border px-3 py-2 text-[12.5px] font-semibold transition-colors ${
                      f.value === c.format
                        ? "border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--text)]"
                        : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            <ImageGrid images={c.images} move={c.move} remove={c.remove} />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={first?.url}
              ratio={first ? first.w / first.h : undefined}
              count={count}
              itemLabel={count === 1 ? "photo" : "photos"}
              addInputId="convert-img-input"
              action={
                <RunAction
                  label="Convert"
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
