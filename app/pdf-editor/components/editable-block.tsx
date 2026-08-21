"use client";

import { useEditableText } from "../hooks/use-editable-text";
import type { TextBlock } from "../types";
import { BlockResizeHandles } from "./block-resize-handles";
import { ContextToolbar } from "./context-toolbar";

const FAMILY: Record<string, string> = {
  serif: '"Times New Roman", Times, Georgia, serif',
  mono: '"Courier New", Courier, monospace',
  sans: "Helvetica, Arial, Inter, system-ui, sans-serif",
};

const LABEL: Record<string, string> = { serif: "Times New Roman", mono: "Courier", sans: "Helvetica" };

function warningFor(b: TextBlock): string | null {
  if (b.isOverflowing) return "Text extends beyond line";
  if (b.isMath) return "Math symbol — may not render";
  if (b.bgFlat === false) return "Busy background — edge may show";
  return null;
}

/** One editable line sitting over the rendered page. */
export function EditableBlock({
  block: b,
  active,
  zoom,
  onSelect,
  onEdit,
  onResize,
  onFormat,
}: {
  block: TextBlock;
  active: boolean;
  zoom: number;
  onSelect: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onResize?: (id: string, patch: { relX?: number; relWidth?: number; relHeight?: number }) => void;
  onFormat?: (id: string, patch: Partial<TextBlock>) => void;
}) {
  const spanRef = useEditableText(b.id, b.text);
  const warning = warningFor(b);
  const risky = b.isOverflowing || b.bgFlat === false;
  const family = b.matchedFamily ?? "sans";
  const bg = b.bgColor
    ? `rgb(${Math.round(b.bgColor.r * 255)},${Math.round(b.bgColor.g * 255)},${Math.round(b.bgColor.b * 255)})`
    : "#ffffff";

  const textDeco = [
    b.underline ? "underline" : "",
    b.strikethrough ? "line-through" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(b.id);
      }}
      className={`absolute cursor-text rounded-xs overflow-visible transition-all ${
        active
          ? risky
            ? "z-40 bg-amber-500/10 outline-2 outline-amber-500"
            : "z-40 bg-indigo-50/20 shadow-md outline-2 outline-indigo-600"
          : b.isEdited
            ? "z-20"
            : "z-10 outline-1 outline-dashed outline-transparent hover:bg-indigo-50/10 hover:outline-indigo-400"
      }`}
      style={{
        left: `${b.relX * 100}%`,
        top: `${b.relY * 100}%`,
        minWidth: `${b.relWidth * 100}%`,
        minHeight: `${b.relHeight * 100}%`,
        width: "max-content",
        maxWidth: "98%",
        textAlign: b.align || "left",
      }}
    >
      {active && (
        <>
          <BlockResizeHandles block={b} onResize={onResize} />
          <ContextToolbar
            block={b}
            font={LABEL[family]}
            size={Math.round(b.fontSize)}
            color={b.color || "#0f172a"}
            onFormat={(patch) => onFormat?.(b.id, patch)}
          />
          {warning && (
            <span className="absolute top-full left-0 z-40 mt-1 rounded-md bg-amber-500 px-2 py-0.5 text-[9.5px] font-bold whitespace-nowrap text-white shadow-md">
              {warning}
            </span>
          )}
        </>
      )}

      <span
        ref={spanRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onFocus={() => !active && onSelect(b.id)}
        onInput={(e) => onEdit(b.id, e.currentTarget.textContent ?? "")}
        className="block min-w-full px-0.5 outline-none select-text"
        style={{
          fontFamily: b.fontFamily
            ? `'${b.fontFamily}', ${FAMILY[family] || "sans-serif"}`
            : FAMILY[family] || "sans-serif",
          fontWeight: b.fontWeight === "bold" || b.fontWeight === "700" ? 700 : 400,
          fontStyle: b.fontStyle || "normal",
          textDecoration: textDeco || "none",
          textAlign: b.align || "left",
          fontSize: b.fontSize * (zoom / 100),
          lineHeight: b.lineHeight || 1.2,
          letterSpacing: b.letterSpacing ? `${b.letterSpacing}px` : "normal",
          whiteSpace: "pre",
          color: active || b.isEdited ? b.color || "#0f172a" : "transparent",
          background: active || b.isEdited ? bg : "transparent",
          caretColor: "#4f46e5",
        }}
      />
    </div>
  );
}
