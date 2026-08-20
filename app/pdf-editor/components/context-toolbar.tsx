"use client";

import { AlignLeft, Bold, Italic, MoreHorizontal, Underline } from "lucide-react";

const BTN = "grid size-6 place-items-center rounded-md text-[var(--text-dim)] transition-colors hover:bg-[var(--accent)]/15 hover:text-[var(--text)]";
const DIV = <div className="h-3.5 w-px bg-[var(--border)]" />;

/** Canva-style inline formatting bar — floats directly above the active block. */
export function ContextToolbar({ font, size, color }: { font: string; size: number; color: string }) {
  return (
    <div
      className="absolute -top-12 left-0 z-30 flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-2 py-1.5 text-[12px] whitespace-nowrap text-[var(--text)]"
      style={{ background: "var(--bg-raised)", boxShadow: "0 16px 40px -12px rgba(0,0,0,.6)" }}
    >
      <span className="relative z-2 font-serif text-[13px] text-[var(--text-dim)]">Aa</span>
      <span className="relative z-2 font-semibold">{font}</span>
      {DIV}
      <span className="relative z-2 font-mono">{size}</span>
      {DIV}
      <span className="relative z-2 size-3.5 rounded-full ring-1 ring-white/25" style={{ background: color }} />
      {DIV}
      <button className={`${BTN} relative z-2`}><Bold aria-hidden className="size-3.5" /></button>
      <button className={`${BTN} relative z-2`}><Italic aria-hidden className="size-3.5" /></button>
      <button className={`${BTN} relative z-2`}><Underline aria-hidden className="size-3.5" /></button>
      {DIV}
      <button className={`${BTN} relative z-2`}><AlignLeft aria-hidden className="size-3.5" /></button>
      <button className={`${BTN} relative z-2`}><MoreHorizontal aria-hidden className="size-3.5" /></button>
    </div>
  );
}

/** The four round scale handles on an active selection. */
export function SelectionHandles() {
  const at = ["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];
  return (
    <>
      {at.map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} size-2.5 rounded-full border-2 bg-white`}
          style={{ borderColor: "var(--accent)" }}
        />
      ))}
    </>
  );
}
