"use client";

import {
  ChevronRight,
  Circle,
  Copy,
  EyeOff,
  Highlighter,
  Image as ImageIcon,
  PenTool,
  RotateCw,
  ShieldAlert,
  Square,
  Trash2,
  Type,
} from "lucide-react";
import { useRef } from "react";
import type { Annotation, BoxLike } from "../annotation-types";
import type { FontFamily, TextBlock } from "../types";
import { convertKrutiDevToUnicode, isLikelyKrutiDev } from "../engine/krutidev-converter";
import { TypographyPanel } from "./typography-panel";

const CONTENT = [
  { icon: Type, label: "Edit Text", tool: "edit-text" },
  { icon: ImageIcon, label: "Add Image", tool: "image" },
  { icon: Square, label: "Draw Shape", tool: "shapes" },
];

export function InspectorEdit({
  block,
  annotation,
  match,
  onFamily,
  onFormat,
  onUpdateAnnotation,
  onRemoveAnnotation,
  onToolSelect,
  onRotatePage,
  onDeletePage,
  onDeleteBlock,
}: {
  block?: TextBlock | null;
  annotation?: Annotation | null;
  match: string;
  onFamily?: (id: string, family: FontFamily) => void;
  onFormat?: (id: string, patch: Partial<TextBlock>) => void;
  onUpdateAnnotation?: (id: string, patch: Partial<BoxLike>) => void;
  onRemoveAnnotation?: (id: string) => void;
  onToolSelect?: (tool: string) => void;
  onRotatePage?: () => void;
  onDeletePage?: () => void;
  onDeleteBlock?: (id: string) => void;
}) {
  const shapeColorRef = useRef<HTMLInputElement>(null);

  // 1. Contextual Mode: Selected Redaction Box
  if (annotation && annotation.kind === "redact") {
    const b = annotation as BoxLike;
    const currentStyle = b.redactStyle || "blackout";

    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-rose-600" />
            <p className="text-[12px] font-bold text-rose-900">Redaction Box Selected</p>
          </div>
          <p className="mt-1 text-[11px] text-slate-600">
            Choose how to mask this area on export.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-semibold text-slate-700">Redaction Style</label>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => onUpdateAnnotation?.(annotation.id, { redactStyle: "blackout" })}
              className={`flex items-center justify-between rounded-xl border p-2.5 text-[12px] font-medium transition-all ${
                currentStyle === "blackout"
                  ? "border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-200 shadow-2xs font-semibold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="size-3.5 rounded-xs bg-black shadow-2xs" />
                Blackout (Permanent)
              </span>
              {currentStyle === "blackout" && <span className="text-[10px] font-bold text-indigo-600">Active</span>}
            </button>

            <button
              onClick={() => onUpdateAnnotation?.(annotation.id, { redactStyle: "blur" })}
              className={`flex items-center justify-between rounded-xl border p-2.5 text-[12px] font-medium transition-all ${
                currentStyle === "blur"
                  ? "border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-200 shadow-2xs font-semibold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <EyeOff className="size-3.5 text-indigo-600" />
                Blur / Frosted Censor
              </span>
              {currentStyle === "blur" && <span className="text-[10px] font-bold text-indigo-600">Active</span>}
            </button>

            <button
              onClick={() => onUpdateAnnotation?.(annotation.id, { redactStyle: "whiteout" })}
              className={`flex items-center justify-between rounded-xl border p-2.5 text-[12px] font-medium transition-all ${
                currentStyle === "whiteout"
                  ? "border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-200 shadow-2xs font-semibold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="size-3.5 rounded-xs border border-slate-300 bg-white shadow-2xs" />
                Whiteout Mask
              </span>
              {currentStyle === "whiteout" && <span className="text-[10px] font-bold text-indigo-600">Active</span>}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onRemoveAnnotation?.(annotation.id)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 py-2 text-[12px] font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="size-3.5" />
            Delete Redaction Box
          </button>
        </div>
      </div>
    );
  }

  // 2. Contextual Mode: Selected Shape (Rectangle, Circle, Line, Highlight)
  if (annotation && (annotation.kind === "rect" || annotation.kind === "circle" || annotation.kind === "line" || annotation.kind === "highlight")) {
    const b = annotation as BoxLike;
    const currentColor = b.color || "#4f46e5";

    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3">
          <div className="flex items-center gap-2">
            {annotation.kind === "circle" ? (
              <Circle className="size-4 text-indigo-600" />
            ) : annotation.kind === "highlight" ? (
              <Highlighter className="size-4 text-indigo-600" />
            ) : (
              <Square className="size-4 text-indigo-600" />
            )}
            <p className="text-[12px] font-bold text-indigo-900 capitalize">{annotation.kind} Selected</p>
          </div>
          <p className="mt-1 text-[11px] text-slate-600">
            Adjust shape color, opacity, or position.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-semibold text-slate-700">Shape Color</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => shapeColorRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium shadow-2xs hover:bg-slate-50"
            >
              <span className="size-4 rounded-full ring-1 ring-slate-300" style={{ background: currentColor }} />
              <span>Change Color</span>
            </button>
            <input
              ref={shapeColorRef}
              type="color"
              value={currentColor}
              className="invisible absolute top-0 left-0 size-0"
              onChange={(e) => onUpdateAnnotation?.(annotation.id, { color: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onRemoveAnnotation?.(annotation.id)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 py-2 text-[12px] font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="size-3.5" />
            Delete Shape
          </button>
        </div>
      </div>
    );
  }

  // 3. Contextual Mode: Selected Signature or Image
  if (annotation && (annotation.kind === "signature" || annotation.kind === "image")) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3">
          <div className="flex items-center gap-2">
            {annotation.kind === "signature" ? <PenTool className="size-4 text-indigo-600" /> : <ImageIcon className="size-4 text-indigo-600" />}
            <p className="text-[12px] font-bold text-indigo-900 capitalize">{annotation.kind} Selected</p>
          </div>
          <p className="mt-1 text-[11px] text-slate-600">
            Drag corner handles on page to resize, scale, or move.
          </p>
        </div>

        {annotation.kind === "image" && (
          <div>
            <label className="mb-2 block text-[11px] font-semibold text-slate-700">Image Options</label>
            <label className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs">
              <ImageIcon className="size-3.5 text-indigo-600" />
              Replace Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (typeof ev.target?.result === "string") {
                        onUpdateAnnotation?.(annotation.id, { dataUrl: ev.target.result });
                      }
                    };
                    reader.readAsDataURL(f);
                  }
                }}
              />
            </label>
          </div>
        )}

        <div className="pt-1">
          <button
            onClick={() => onRemoveAnnotation?.(annotation.id)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 py-2 text-[12px] font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="size-3.5" />
            Remove {annotation.kind === "signature" ? "Signature" : "Image"}
          </button>
        </div>
      </div>
    );
  }

  // 4. Default Mode: Text Block or Document Page
  const confidence = block?.fontMatchConfidence;
  const low = confidence !== undefined && confidence < 60;

  return (
    <>
      <div className={`mb-4 rounded-xl border px-3 py-2.5 ${low ? "border-amber-200 bg-amber-50" : "border-indigo-100 bg-indigo-50/50"}`}>
        <p className={`text-[11px] font-bold ${low ? "text-amber-800" : "text-indigo-900"}`}>
          {block ? "Font matched" : "Selection ready"}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          {block ? `${block.matchedFontName} · ${confidence}% confidence` : match}
        </p>
      </div>

      {block && isLikelyKrutiDev(block.text) && (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50/80 p-3 shadow-2xs">
          <div className="flex items-center gap-1.5 text-amber-900">
            <span className="text-[13px]">🇮🇳</span>
            <p className="text-[11.5px] font-bold">Legacy Kruti Dev Hindi Detected</p>
          </div>
          <p className="mt-1 text-[11px] text-amber-800 leading-relaxed">
            This PDF uses 8-bit ASCII Kruti Dev encoding. Convert to readable Unicode Hindi with 1 click.
          </p>
          <button
            onClick={() => {
              const converted = convertKrutiDevToUnicode(block.text);
              onFormat?.(block.id, {
                text: converted,
                matchedFamily: "sans",
                fontFamily: "Noto Sans Devanagari",
              });
            }}
            className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-[11.5px] font-bold text-white shadow-sm hover:bg-amber-700 transition-colors"
          >
            ✨ Convert to Unicode Hindi
          </button>
        </div>
      )}

      <TypographyPanel block={block} onFamily={onFamily} onFormat={onFormat} />

      {block && onDeleteBlock && (
        <button
          onClick={() => onDeleteBlock(block.id)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/70 py-2.5 text-[12px] font-semibold text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition-all shadow-2xs"
        >
          <Trash2 className="size-3.5" />
          Delete Selected Text Block
        </button>
      )}

      <section className="mt-5 border-t border-slate-200/70 pt-4">
        <h3 className="mb-2 text-[11px] font-bold tracking-wide text-slate-800">Content</h3>
        <div className="flex flex-col gap-1">
          {CONTENT.map((item) => (
            <button
              key={item.tool}
              onClick={() => onToolSelect?.(item.tool)}
              className="flex items-center justify-between rounded-lg p-2 text-[12px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <span className="flex items-center gap-2">
                <item.icon className="size-3.5 text-slate-500" />
                {item.label}
              </span>
              <ChevronRight className="size-3.5 text-slate-400" />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5 border-t border-slate-200/70 pt-4">
        <h3 className="mb-2 text-[11px] font-bold tracking-wide text-slate-800">Page</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { icon: RotateCw, label: "Rotate 90°", action: onRotatePage },
            { icon: Copy, label: "Duplicate (coming soon)", action: undefined },
            { icon: Trash2, label: "Delete page", action: onDeletePage },
          ].map((t) => (
            <button
              key={t.label}
              onClick={t.action}
              disabled={!t.action}
              title={t.label}
              className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200 disabled:hover:bg-white"
            >
              <t.icon className="size-4" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
