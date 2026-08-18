"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { HtmlToPdfIcon } from "../components/icons/html-to-pdf-icon";
import { ResultPages } from "../docx-to-pdf/result-pages";
import { useHtmlToPdf } from "./use-html-to-pdf";
import { STEPS } from "./pipeline-steps";

export default function HtmlToPdfPage() {
  const h = useHtmlToPdf();
  const step = h.url ? 2 : h.html.trim() ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="HTML to PDF"
          busy={h.busy}
          icon={(active) => <HtmlToPdfIcon active={active} size={24} />}
          blurb="Paste HTML markup and convert it to a clean A4 PDF, with a preview before you download. Headings, paragraphs and lists carry over; styling and images do not. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="html-to-pdf">
            <textarea
              value={h.html}
              onChange={(e) => h.setHtml(e.target.value)}
              spellCheck={false}
              rows={10}
              className="glass mb-4 w-full resize-y rounded-2xl p-4 font-mono text-[12.5px] leading-[1.6] text-[var(--text)] outline-none focus:border-[var(--accent)]"
            />

            {h.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {h.error}
              </p>
            )}

            {h.url && h.pages.length > 0 && (
              <ResultPages
                blocks={h.blocks}
                pages={h.pages}
                note="Headings, paragraphs and lists carry over; CSS styling, images and layout do not."
              />
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={h.pages[0]?.url}
              ratio={h.pages[0] ? h.pages[0].width / h.pages[0].height : undefined}
              count={h.pages.length}
              itemLabel={h.pages.length === 1 ? "page" : "pages"}
              action={
                <RunAction
                  label="Convert to PDF"
                  busyLabel="Converting…"
                  busy={h.busy}
                  disabled={!h.html.trim()}
                  url={h.url}
                  fileName="document.pdf"
                  onRun={h.run}
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
