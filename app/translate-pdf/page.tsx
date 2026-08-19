"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { TranslatePdfIcon } from "../components/icons/translate-pdf-icon";
import { AdSlot } from "../components/ad-slot";
import { ResultPages } from "../docx-to-pdf/result-pages";
import { LangSelect } from "./lang-select";
import { useTranslate } from "./use-translate";
import { STEPS } from "./pipeline-steps";

export default function TranslatePdfPage() {
  const t = useTranslate();
  const step = t.url ? 2 : t.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Translate PDF"
          busy={t.busy}
          icon={(active) => <TranslatePdfIcon active={active} size={24} />}
          blurb="Extracts a PDF's text and sends it — text only, never the file — to a translation backend, then rebuilds the result as a new PDF. The one deliberate exception to 'nothing is uploaded' in this suite. Not configured yet, so this tool won't run until it is."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="translate-pdf" badge="Sends extracted text">
            <LangSelect lang={t.lang} onLang={t.setLang} />

            <Dropzone
              id="translate-pdf-input"
              onFiles={t.pick}
              label={t.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {t.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {t.error}
              </p>
            )}

            {t.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Translating…
              </p>
            )}

            {t.url && !t.busy && (
              <ResultPages
                blocks={t.lines}
                unit="line"
                pages={t.pages}
                note="Content only — original fonts, layout and images are not reproduced."
              />
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={t.pages[0]?.url}
              ratio={t.pages[0] ? t.pages[0].width / t.pages[0].height : undefined}
              count={t.pages.length}
              itemLabel={t.pages.length === 1 ? "page" : "pages"}
              addInputId="translate-pdf-input"
              action={
                <RunAction
                  label="Download the PDF"
                  busyLabel="Translating…"
                  busy={t.busy}
                  disabled={!t.url}
                  url={t.url}
                  fileName={`${t.name?.replace(/\.pdf$/i, "") ?? "document"}-${t.lang.toLowerCase()}.pdf`}
                  onRun={() => {}}
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
