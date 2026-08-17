"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dropzone } from "../components/dropzone";
import { ToImageIcon } from "../components/icons/to-image-icon";
import { PageGrid } from "./page-grid";
import { RenderOptions } from "./render-options";
import { useRender } from "./use-render";

const ACTION = "clay flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] font-semibold";

export default function PdfToImagePage() {
  const r = useRender();
  const [hot, setHot] = useState(false);
  const base = r.file?.name.replace(/\.pdf$/i, "") ?? "page";
  const ext = r.format === "jpeg" ? "jpg" : "png";

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div
          className="mb-6 flex items-center gap-3.5"
          onPointerEnter={() => setHot(true)}
          onPointerLeave={() => setHot(false)}
        >
          <span className="glass grid size-12 shrink-0 place-items-center text-[var(--accent)]">
            <ToImageIcon active={hot || r.busy} size={24} />
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em]">PDF to Image</h1>
        </div>
        <p className="mb-8 text-[14.5px] leading-[1.6] text-[var(--text-dim)]">
          Export every page as a PNG or JPG. Rendering happens in your browser — nothing is uploaded.
        </p>

        <Dropzone onFiles={r.pick} label={r.file ? "Choose a different PDF" : "Click to add a PDF"} />

        {r.file && (
          <RenderOptions
            name={r.file.name}
            format={r.format}
            scale={r.scale}
            onFormat={(f) => {
              r.setFormat(f);
              r.reset();
            }}
            onScale={(s) => {
              r.setScale(s);
              r.reset();
            }}
          />
        )}

        {r.error && (
          <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
            {r.error}
          </p>
        )}

        {r.file && r.pages.length === 0 && (
          <button onClick={r.run} disabled={r.busy} className={`${ACTION} disabled:opacity-60`}>
            {r.busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
            {r.busy
              ? r.total
                ? `Rendering ${r.done} of ${r.total}…`
                : "Loading renderer…"
              : `Convert to ${ext.toUpperCase()}`}
          </button>
        )}

        <PageGrid pages={r.pages} base={base} ext={ext} />
      </main>
    </div>
  );
}
