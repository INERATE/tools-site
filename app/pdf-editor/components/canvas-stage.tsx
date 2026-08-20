"use client";

import { ContextToolbar, SelectionHandles } from "./context-toolbar";
import { DemoPage } from "./demo-page";

/**
 * The page stage. Today it renders a static specimen page so the interaction
 * model can be reviewed; the real build swaps DemoPage for the pdf.js canvas
 * and drives block geometry from the parsed document.
 */
export function CanvasStage({
  zoom, selected, onSelect,
}: {
  zoom: number; selected: string | null; onSelect: (id: string | null) => void;
}) {
  return (
    <main
      className="relative flex-1 overflow-auto p-6"
      onClick={() => onSelect(null)}
      style={{ background: "color-mix(in srgb, var(--bg) 92%, black)" }}
    >
      <div className="mx-auto w-fit" style={{ zoom: `${zoom}%` }}>
        <div
          className="relative rounded-lg bg-white text-[#14121c]"
          style={{ width: 640, minHeight: 828, boxShadow: "0 40px 90px -20px rgba(0,0,0,.7)" }}
        >
          <DemoPage selected={selected} onSelect={onSelect} />
        </div>
      </div>
    </main>
  );
}

/** A selectable text block on the page — the core interaction of the editor. */
export function Block({
  id, selected, onSelect, children, font = "Times New Roman", size = 11,
}: {
  id: string;
  selected: string | null;
  onSelect: (id: string | null) => void;
  children: React.ReactNode;
  font?: string;
  size?: number;
}) {
  const active = selected === id;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      className={`relative cursor-text rounded-[3px] px-1.5 py-1 transition-colors ${
        active
          ? "outline-2 outline-[var(--accent)]"
          : "outline-1 outline-dashed outline-transparent hover:outline-[#8b84b8]/70"
      }`}
      style={active ? { boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)" } : undefined}
    >
      {active && (
        <>
          <SelectionHandles />
          <ContextToolbar font={font} size={size} color="var(--accent)" />
        </>
      )}
      {children}
    </div>
  );
}
