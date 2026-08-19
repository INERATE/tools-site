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
import { PdfFormsIcon } from "../components/icons/pdf-forms-icon";
import { FieldInput } from "./field-input";
import { usePdfForm } from "./use-pdf-form";
import { STEPS } from "./pipeline-steps";

export default function PdfFormsPage() {
  const f = usePdfForm();
  const step = f.url ? 2 : f.fields.length > 0 ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PDF Forms"
          busy={f.busy}
          icon={(active) => <PdfFormsIcon active={active} size={24} />}
          blurb="Fill in a PDF's text, checkbox, radio and dropdown fields, then save — flattened by default so the values become permanent page content. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-forms">
            <Dropzone
              id="forms-input"
              onFiles={f.pick}
              label={f.file ? "Choose a different PDF" : "Drop a fillable PDF here, or click to choose"}
            />

            {f.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {f.error}
              </p>
            )}

            {f.fields.length > 0 && (
              <>
                <div className="mb-4 grid gap-3.5 sm:grid-cols-2">
                  {f.fields.map((field) => {
                    const current = f.values[field.name];
                    const live = field.kind === "checkbox" ? { ...field, checked: Boolean(current) } : { ...field, value: String(current ?? "") };
                    return <FieldInput key={field.name} field={live} onChange={(v) => f.setValue(field.name, v)} />;
                  })}
                </div>
                <label className="flex items-center gap-2 text-[12.5px] text-[var(--text-dim)]">
                  <input
                    type="checkbox"
                    checked={f.flatten}
                    onChange={(e) => f.setFlatten(e.target.checked)}
                    className="size-4 accent-[var(--accent)]"
                  />
                  Flatten — makes values permanent and the form read-only
                </label>
              </>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={f.fields.length}
              itemLabel={f.fields.length === 1 ? "field" : "fields"}
              addInputId="forms-input"
              action={
                <RunAction
                  label="Fill & save"
                  busyLabel="Filling…"
                  busy={f.busy}
                  disabled={f.fields.length === 0}
                  url={f.url}
                  fileName={`${f.file?.name.replace(/\.pdf$/i, "") ?? "document"}-filled.pdf`}
                  onRun={f.run}
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
