"use client";

import { useEffect, useRef } from "react";
import { ContextToolbar } from "./context-toolbar";
import type { TextBlock } from "../types";

function getCSSFontFamily(family?: string, matchedFamily?: string) {
  if (matchedFamily === "serif" || /times|serif|georgia|roman|minion|cambria/i.test(family ?? "")) {
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
  if (b.isOverflowing) return "Text extends beyond line";
  if (b.isMath) return "Math symbol — may not render";
  if (b.bgFlat === false) return "Busy background — edge may show";
  return null;
}

type ResizeDirection = "e" | "w" | "se" | "sw";

/**
 * An editable text block on the live PDF canvas.
 * Supports in-place typing, font match preservation, auto-expanding width,
 * background masking when edited, and interactive resize handles.
 */
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
  onResize?: (id: string, patch: { relX?: number; relY?: number; relWidth?: number; relHeight?: number }) => void;
  onFormat?: (id: string, patch: Partial<TextBlock>) => void;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeStart = useRef<{ clientX: number; clientY: number; initX: number; initY: number; initW: number; initH: number; dir: ResizeDirection } | null>(null);

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

  // Keep DOM content in sync with external state changes (e.g. undo/redo) without wiping caret during typing
  useEffect(() => {
    if (spanRef.current && document.activeElement !== spanRef.current) {
      if (spanRef.current.textContent !== b.text) {
        spanRef.current.textContent = b.text;
      }
    }
  }, [b.text]);

  const bgColor = b.bgColor
    ? `rgb(${Math.round(b.bgColor.r * 255)}, ${Math.round(b.bgColor.g * 255)}, ${Math.round(b.bgColor.b * 255)})`
    : "#ffffff";

  // Resize drag handlers
  const handleResizeDown = (dir: ResizeDirection) => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resizeStart.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      initX: b.relX,
      initY: b.relY,
      initW: b.relWidth,
      initH: b.relHeight,
      dir,
    };
  };

  const handleResizeMove = (e: React.PointerEvent) => {
    const s = resizeStart.current;
    if (!s || !onResize || !containerRef.current) return;
    const pageEl = containerRef.current.closest("[data-page]") as HTMLElement | null;
    if (!pageEl) return;
    const rect = pageEl.getBoundingClientRect();
    const dx = (e.clientX - s.clientX) / rect.width;
    const dy = (e.clientY - s.clientY) / rect.height;

    if (s.dir === "e") {
      onResize(b.id, { relWidth: Math.max(0.04, s.initW + dx) });
    } else if (s.dir === "w") {
      const newW = Math.max(0.04, s.initW - dx);
      onResize(b.id, { relX: s.initX + (s.initW - newW), relWidth: newW });
    } else if (s.dir === "se") {
      onResize(b.id, { relWidth: Math.max(0.04, s.initW + dx), relHeight: Math.max(0.015, s.initH + dy) });
    } else if (s.dir === "sw") {
      const newW = Math.max(0.04, s.initW - dx);
      onResize(b.id, { relX: s.initX + (s.initW - newW), relWidth: newW, relHeight: Math.max(0.015, s.initH + dy) });
    }
  };

  const handleResizeUp = () => {
    resizeStart.current = null;
  };

  return (
    <div
      ref={containerRef}
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
            : "outline-2 outline-indigo-600 bg-indigo-50/20 z-30 shadow-md"
          : b.isEdited
          ? "z-20"
          : "outline-1 outline-dashed outline-transparent hover:outline-indigo-400 hover:bg-indigo-50/10 z-10"
      }`}
      style={{
        left: `${b.relX * 100}%`,
        top: `${b.relY * 100}%`,
        minWidth: `${b.relWidth * 100}%`,
        minHeight: `${b.relHeight * 100}%`,
        width: "max-content",
        maxWidth: "95%",
        boxShadow: active ? "0 0 0 3px rgba(79, 70, 229, 0.18)" : undefined,
      }}
    >
      {active && (
        <>
          {/* Resize Handles */}
          <span
            onPointerDown={handleResizeDown("w")}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
            className="absolute -left-1 top-1/2 -translate-y-1/2 size-2.5 cursor-ew-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs z-40"
            title="Drag to resize width"
          />
          <span
            onPointerDown={handleResizeDown("e")}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
            className="absolute -right-1 top-1/2 -translate-y-1/2 size-2.5 cursor-ew-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs z-40"
            title="Drag to resize width"
          />
          <span
            onPointerDown={handleResizeDown("se")}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
            className="absolute -right-1 -bottom-1 size-2.5 cursor-nwse-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs z-40"
            title="Drag to resize box"
          />
          <span
            onPointerDown={handleResizeDown("sw")}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
            className="absolute -left-1 -bottom-1 size-2.5 cursor-nesw-resize rounded-full border-2 border-indigo-600 bg-white shadow-xs z-40"
            title="Drag to resize box"
          />

          <ContextToolbar
            block={b}
            font={b.matchedFamily === "serif" ? "Times New Roman" : b.matchedFamily === "mono" ? "Courier" : "Helvetica"}
            size={Math.round(b.fontSize)}
            color={b.color || "#4f46e5"}
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
        onFocus={() => {
          if (!active) onSelect(b.id);
        }}
        onInput={(e) => {
          const newText = e.currentTarget.textContent ?? "";
          onEdit(b.id, newText);
        }}
        className="block min-w-full outline-none select-text px-0.5"
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
