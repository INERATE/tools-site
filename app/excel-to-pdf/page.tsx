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
import { ExcelToPdfIcon } from "../components/icons/excel-to-pdf-icon";
import { ResultPages } from "../docx-to-pdf/result-pages";
import { useExcelToPdf } from "./use-excel-to-pdf";
import { STEPS } from "./pipeline-steps";

export default function ExcelToPdfPage() {
  const x = useExcelToPdf();
  const step = x.url && !x.busy ? 2 : x.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Excel to PDF"
          busy={x.busy}
          icon={(active) => <ExcelToPdfIcon active={active} size={24} />}
          blurb="Reads the first sheet of an .xlsx workbook and lays it out as a plain PDF grid, with a preview before you download. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="excel-to-pdf">
            <Dropzone
              id="excel-input"
              onFiles={x.pick}
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              label={x.name ? "Choose a different workbook" : "Drop an .xlsx here, or click to choose"}
              hint="Excel workbooks only — they never leave this tab"
            />

            {x.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {x.error}
              </p>
            )}

            {x.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Converting {x.name}…
              </p>
            )}

            {x.url && !x.busy && (
              <ResultPages
                blocks={x.rows}
                unit="row"
                pages={x.pages}
                note={`Sheet "${x.sheet}" only — other sheets, cell colors, merges and formulas are not reproduced.`}
              />
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={x.pages[0]?.url}
              ratio={x.pages[0] ? x.pages[0].width / x.pages[0].height : undefined}
              count={x.pages.length}
              itemLabel={x.pages.length === 1 ? "page" : "pages"}
              addInputId="excel-input"
              action={
                <RunAction
                  label="Download the PDF"
                  busyLabel="Converting…"
                  busy={x.busy}
                  disabled={!x.url}
                  url={x.url}
                  fileName={`${x.name?.replace(/\.xlsx?$/i, "") ?? "workbook"}.pdf`}
                  onRun={() => {}}
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
