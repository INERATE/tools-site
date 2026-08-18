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
import { RedactPdfIcon } from "../components/icons/redact-pdf-icon";
import { PagePicker } from "../sign-pdf/page-picker";
import { RedactCanvas } from "./redact-canvas";
import { useRedact } from "./use-redact";
import { STEPS } from "./pipeline-steps";

export default function RedactPdfPage() {
  const r = useRedact();
  const step = r.url ? 2 : r.totalBoxes > 0 ? 1 : r.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Redact PDF"
          busy={r.busy}
          icon={(active) => <RedactPdfIcon active={active} size={24} />}
          blurb="Draw a box over sensitive text and it's gone for good — a redacted page is rebuilt as an image with no underlying text anywhere on it, not just painted over. Pages you don't mark stay untouched. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="redact-pdf">
            <Dropzone
              id="redact-input"
              onFiles={r.pick}
              label={r.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {r.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {r.error}
              </p>
            )}

            {r.pagePreview && (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <PagePicker index={r.pageIndex} count={r.pageCount} onGo={r.goToPage} />
                  {r.boxes.length > 0 && (
                    <button
                      type="button"
                      onClick={r.clearPage}
                      className="text-[12px] font-semibold text-[var(--text-dim)] hover:text-[var(--text)]"
                    >
                      Clear this page
                    </button>
                  )}
                </div>
                <RedactCanvas pageUrl={r.pagePreview.url} pageRatio={r.pagePreview.ratio} boxes={r.boxes} onAddBox={r.addBox} />
              </>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={r.pagePreview?.url}
              ratio={r.pagePreview?.ratio}
              count={r.totalBoxes}
              itemLabel={r.totalBoxes === 1 ? "box" : "boxes"}
              addInputId="redact-input"
              action={
                <RunAction
                  label="Save redacted PDF"
                  busyLabel="Redacting…"
                  busy={r.busy}
                  disabled={r.totalBoxes === 0}
                  url={r.url}
                  fileName={`${r.file?.name.replace(/\.pdf$/i, "") ?? "document"}-redacted.pdf`}
                  onRun={r.run}
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
