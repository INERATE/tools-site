"use client";

import { useEffect, useRef } from "react";
import { ContextToolbar, SelectionHandles } from "./context-toolbar";
import type { TextBlock } from "../types";

function getCSSFontFamily(family?: string, matchedFamily?: string) {
  if (matchedFamily === "serif" || /times|serif|georgia|roman|minion/i.test(family ?? "")) {
    return '"Times New Roman", Times, Georgia, serif';
  }
  if (matchedFamily === "mono" || /courier|mono|typewriter|consolas|menlo/i.test(family ?? "")) {
    return '"Courier New", Courier, monospace';
  }
  return 'Helvetica, Arial, Inter, system-ui, -apple-system, sans-serif';
}

function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function warningFor(b: TextBlock): string | null {
  const words = countWords(b.text);
  if (words > 250) return `Word limit exceeded (${words}/250 words)`;
  if (b.isOverflowing) return "Too long to fit";
  if (b.isMath) return "Math symbol — may not render";
  if (b.bgFlat === false) return "Busy background — edge may show";
  return null;
}

/**
 * An editable text block on the live PDF canvas.
 * Preserves font matching, weight, and smooth cursor placement on click/double-click.
 */
export function EditableBlock({
  block: b,
  active,
  zoom,
  onSelect,
  onEdit,
}: {
  block: TextBlock;
  active: boolean;
  zoom: number;
  onSelect: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const warning = warningFor(b);
  const risky = b.isOverflowing || b.bgFlat === false || countWords(b.text) > 250;

  const fontFam = getCSSFontFamily(b.fontFamily, b.matchedFamily);
  const fontW = b.fontWeight === "bold" || b.fontWeight === "700" ? 700 : 400;
  const fontS = b.fontStyle || "normal";

  // When block becomes active, focus the contentEditable span and place caret if needed
  useEffect(() => {
    if (active && spanRef.current) {
      if (document.activeElement !== spanRef.current) {
        spanRef.current.focus();
      }
    }
  }, [active]);

  // Keep DOM content in sync with external state changes (e.g. undo/redo) without losing cursor during typing
  useEffect(() => {
    if (spanRef.current && spanRef.current.textContent !== b.text) {
      spanRef.current.textContent = b.text;
    }
  }, [b.text]);

  const bgColor = b.bgColor
    ? `rgb(${Math.round(b.bgColor.r * 255)}, ${Math.round(b.bgColor.g * 255)}, ${Math.round(b.bgColor.b * 255)})`
    : "#ffffff";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(b.id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onSelect(b.id);
        spanRef.current?.focus();
      }}
      className={`absolute cursor-text rounded-xs transition-all ${
        active
          ? risky
            ? "outline-2 outline-amber-500 bg-amber-500/10 z-30"
            : "outline-2 outline-indigo-600 bg-indigo-50/20 z-30"
          : "outline-1 outline-dashed outline-transparent hover:outline-indigo-400 hover:bg-indigo-50/10 z-10"
      }`}
      style={{
        left: `${b.relX * 100}%`,
        top: `${b.relY * 100}%`,
        width: `${b.relWidth * 100}%`,
        height: `${b.relHeight * 100}%`,
        boxShadow: active ? "0 0 0 3px rgba(79, 70, 229, 0.18)" : undefined,
      }}
    >
      {active && (
        <>
          <SelectionHandles />
          <ContextToolbar font={b.matchedFamily === "serif" ? "Times New Roman" : b.matchedFamily === "mono" ? "Courier" : "Helvetica"} size={Math.round(b.fontSize)} color={b.color || "#4f46e5"} />
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
        onFocus={() => {
          if (!active) onSelect(b.id);
        }}
        onInput={(e) => {
          const newText = e.currentTarget.textContent ?? "";
          onEdit(b.id, newText);
        }}
        className="block size-full outline-none select-text"
        style={{
          fontFamily: fontFam,
          fontWeight: fontW,
          fontStyle: fontS,
          fontSize: b.fontSize * (zoom / 100),
          lineHeight: 1.15,
          letterSpacing: b.letterSpacing ? `${b.letterSpacing}px` : undefined,
          whiteSpace: "pre",
          color: active || b.isEdited ? (b.color || "#0f172a") : "transparent",
          background: active || b.isEdited ? bgColor : "transparent",
          caretColor: "#4f46e5",
        }}
      >
        {b.text}
      </span>
    </div>
  );
}
