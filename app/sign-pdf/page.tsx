"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { SignPdfIcon } from "../components/icons/sign-pdf-icon";
import { PageCanvas } from "./page-canvas";
import { PagePicker } from "./page-picker";
import { SignaturePad } from "./signature-pad";
import { useSign } from "./use-sign";
import { STEPS } from "./pipeline-steps";

export default function SignPdfPage() {
  const s = useSign();
  const step = s.url ? 2 : s.sig ? 1 : s.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Sign PDF"
          busy={s.busy}
          icon={(active) => <SignPdfIcon active={active} size={24} />}
          blurb="Draw your signature, drag it onto the page, and save. Everything runs in your browser — the PDF and the signature never leave this tab."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="sign-pdf">
            <Dropzone
              id="sign-input"
              onFiles={s.pick}
              label={s.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.file && <SignaturePad onChange={s.setSig} />}

            {s.pagePreview && (
              <>
                <PagePicker index={s.pageIndex} count={s.pageCount} onGo={s.goToPage} />
                {s.sig ? (
                  <PageCanvas
                    pageUrl={s.pagePreview.url}
                    pageRatio={s.pagePreview.ratio}
                    sig={s.sig}
                    xFrac={s.pos.xFrac}
                    yFrac={s.pos.yFrac}
                    widthFrac={s.pos.widthFrac}
                    onMove={s.move}
                  />
                ) : (
                  <p className="rounded-xl bg-[var(--glass-bg)] p-6 text-center text-[13px] text-[var(--text-dim)]">
                    Draw a signature above, then drag it onto the page.
                  </p>
                )}
              </>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={s.pagePreview?.url}
              ratio={s.pagePreview?.ratio}
              count={s.file ? 1 : 0}
              itemLabel="PDF"
              addInputId="sign-input"
              action={
                <RunAction
                  label="Save signed PDF"
                  busyLabel="Signing…"
                  busy={s.busy}
                  disabled={!s.file || !s.sig}
                  url={s.url}
                  fileName={`${s.file?.name.replace(/\.pdf$/i, "") ?? "document"}-signed.pdf`}
                  onRun={s.run}
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
