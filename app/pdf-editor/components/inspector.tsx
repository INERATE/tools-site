"use client";

import { useEffect, useState } from "react";
import { Edit3, FileCheck, FileSearch, Sparkles, Square, X } from "lucide-react";
import type { Annotation, BoxLike } from "../annotation-types";
import type { WatermarkConfig } from "../element-types";
import type { FontFamily, TextBlock } from "../types";
import { InspectorEdit } from "./inspector-edit";
import { AiPanel, AnnotatePanel, FormPanel, OcrPanel } from "./inspector-modes";
import { WatermarkPanel } from "./watermark-panel";

type Mode = "edit" | "annotate" | "form" | "ocr" | "ai";

const MODES: { id: Mode; icon: typeof Edit3; label: string }[] = [
  { id: "edit", icon: Edit3, label: "Edit" },
  { id: "annotate", icon: FileCheck, label: "Annotate" },
  { id: "form", icon: Square, label: "Form" },
  { id: "ocr", icon: FileSearch, label: "OCR" },
  { id: "ai", icon: Sparkles, label: "AI Tools" },
];

export function Inspector({
  block,
  annotation,
  onFamily,
  onFormat,
  onUpdateAnnotation,
  onRemoveAnnotation,
  match,
  watermark,
  onWatermark,
  hasDoc = false,
  onRotatePage,
  onDeletePage,
  onToolSelect,
  onOpenAi,
}: {
  block?: TextBlock | null;
  annotation?: Annotation | null;
  onFamily?: (id: string, family: FontFamily) => void;
  onFormat?: (id: string, patch: Partial<TextBlock>) => void;
  onUpdateAnnotation?: (id: string, patch: Partial<BoxLike>) => void;
  onRemoveAnnotation?: (id: string) => void;
  match: string;
  watermark?: WatermarkConfig;
  onWatermark?: (patch: Partial<WatermarkConfig>) => void;
  hasDoc?: boolean;
  onRotatePage?: () => void;
  onDeletePage?: () => void;
  onToolSelect?: (tool: string) => void;
  onOpenAi?: () => void;
}) {
  const [mode, setMode] = useState<Mode>("edit");
  const [open, setOpen] = useState(true);

  // Selecting something on the page has to bring its properties into view.
  // Without this the header renamed itself to match the selection while the
  // body kept showing whichever tab happened to be open — the panel claimed
  // to be editing text and offered annotation tools.
  const selectionId = annotation?.id ?? block?.id ?? null;
  useEffect(() => {
    if (!selectionId) return;
    setMode("edit");
    setOpen(true);
  }, [selectionId]);

  // Dynamic title based on selection
  let title = "Document properties";
  if (annotation) {
    if (annotation.kind === "redact") title = "Redaction properties";
    else if (annotation.kind === "signature") title = "Signature properties";
    else if (annotation.kind === "image") title = "Image properties";
    else title = `${annotation.kind.toUpperCase()} properties`;
  } else if (block) {
    title = "Edit text";
  }

  return (
    <aside className="hidden shrink-0 border-l border-slate-200/90 bg-white lg:flex">
      {open && (
        <div className="flex w-[260px] flex-col overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200/70 pb-3">
            <h2 className="text-[13px] font-bold text-slate-900 capitalize">{title}</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Collapse panel"
              className="grid size-6 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-3.5" />
            </button>
          </div>

          {mode === "edit" && (
            <InspectorEdit
              block={block}
              annotation={annotation}
              match={match}
              onFamily={onFamily}
              onFormat={onFormat}
              onUpdateAnnotation={onUpdateAnnotation}
              onRemoveAnnotation={onRemoveAnnotation}
              onToolSelect={onToolSelect}
              onRotatePage={onRotatePage}
              onDeletePage={onDeletePage}
            />
          )}
          {mode === "ocr" && <OcrPanel />}
          {mode === "ai" && <AiPanel onOpenAi={onOpenAi} />}
          {mode === "form" && <FormPanel />}
          {mode === "annotate" && (
            <>
              <AnnotatePanel onToolSelect={onToolSelect} />
              {watermark && onWatermark && (
                <div className="mt-5 border-t border-slate-200/70 pt-4">
                  <WatermarkPanel value={watermark} onChange={onWatermark} disabled={!hasDoc} />
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="flex w-14 flex-col items-center gap-2 border-l border-slate-200/80 bg-slate-50/60 px-1 py-3">
        {MODES.map((m) => (
          <button
            key={m.id}
            title={m.label}
            aria-pressed={mode === m.id && open}
            onClick={() => {
              setMode(m.id);
              setOpen(true);
            }}
            className={`flex w-12 flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all ${
              mode === m.id && open
                ? "border border-indigo-200/80 bg-indigo-50 text-indigo-600 shadow-2xs font-semibold"
                : "text-slate-500 hover:bg-white hover:text-slate-900"
            }`}
          >
            <m.icon className="size-4" />
            <span className="text-[9px] font-medium tracking-tight">{m.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
