"use client";

import { ContextToolbar, SelectionHandles } from "./context-toolbar";
import type { TextBlock } from "../types";

function warningFor(b: TextBlock): string | null {
  if (b.isOverflowing) return "Too long to fit";
  if (b.isMath) return "Math symbol — may not render";
  if (b.bgFlat === false) return "Busy background — edge may show";
  return null;
}

/** One absolutely-placed editable text line sitting over the rendered page. */
export function EditableBlock({
  block: b, active, zoom, onSelect, onEdit,
}: {
  block: TextBlock;
  active: boolean;
  zoom: number;
  onSelect: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const warning = warningFor(b);
  const risky = b.isOverflowing || b.bgFlat === false;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(b.id);
      }}
      className={`absolute cursor-text rounded-[2px] transition-colors ${
        active
          ? risky ? "outline-2 outline-amber-500" : "outline-2 outline-[var(--accent)]"
          : "outline-1 outline-dashed outline-transparent hover:outline-[#8b84b8]"
      }`}
      style={{
        left: `${b.relX * 100}%`,
        top: `${b.relY * 100}%`,
        width: `${b.relWidth * 100}%`,
        height: `${b.relHeight * 100}%`,
        boxShadow: active ? "0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)" : undefined,
      }}
    >
      {active && (
        <>
          <SelectionHandles />
          <ContextToolbar font={b.fontFamily} size={Math.round(b.fontSize)} color="var(--accent)" />
          {warning && (
            <span className="absolute top-full left-0 z-20 mt-1 rounded-md bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold whitespace-nowrap text-black">
              {warning}
            </span>
          )}
        </>
      )}
      <span
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onInput={(e) => onEdit(b.id, e.currentTarget.textContent ?? "")}
        className="block size-full outline-none"
        style={{
          fontSize: b.fontSize * (zoom / 100),
          lineHeight: 1,
          // A PDF line is one line — the exporter draws it with a single
          // drawText and never wraps, so wrapping here would show a layout
          // the output cannot reproduce.
          whiteSpace: "pre",
          color: b.isEdited ? "#111" : "transparent",
          background: b.isEdited ? "#fff" : "transparent",
        }}
      >
        {b.originalText}
      </span>
    </div>
  );
}
