"use client";

import { MousePointerClick, X } from "lucide-react";
import type { EditorMode } from "../types";

/**
 * Shape / Draw / Redact are drag tools, but nothing said so — users clicked
 * once, nothing happened, and concluded the tool was broken. eSign and Image
 * are one-shot clicks, which is exactly why only those two felt like they
 * worked. This states the interaction the moment a drag tool is armed.
 */
const HINT: Partial<Record<EditorMode, string>> = {
  shapes: "Click and drag on the page to draw a rectangle.",
  draw: "Click and hold, then move to draw freehand.",
  redact: "Drag over anything you want permanently removed.",
};

export function ToolHint({ tool, onDone }: { tool: EditorMode; onDone: () => void }) {
  const text = HINT[tool];
  if (!text) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-indigo-200 bg-indigo-600 px-4 py-2 text-white shadow-lg">
        <MousePointerClick aria-hidden className="size-3.5 shrink-0" />
        <span className="text-[12.5px] font-medium">{text}</span>
        {tool === "redact" && (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-semibold">
            Flattens the page
          </span>
        )}
        <button
          onClick={onDone}
          aria-label="Back to Select"
          title="Back to Select"
          className="grid size-5 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X aria-hidden className="size-3" />
        </button>
      </div>
    </div>
  );
}
