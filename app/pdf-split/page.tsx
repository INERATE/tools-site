"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dropzone } from "../components/dropzone";
import { SplitIcon } from "../components/icons/split-icon";
import { SplitControls } from "./split-controls";
import { useSplit } from "./use-split";

const ACTION = "clay flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] font-semibold";

export default function PdfSplitPage() {
  const { file, pages, range, busy, error, url, pick, run, editRange } = useSplit();
  const [hot, setHot] = useState(false);

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
            <SplitIcon active={hot || busy} size={24} />
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em]">PDF Splitter</h1>
        </div>
        <p className="mb-8 text-[14.5px] leading-[1.6] text-[var(--text-dim)]">
          Pull out the pages you want. Everything runs in your browser — nothing is uploaded.
        </p>

        <Dropzone onFiles={pick} label={file ? "Choose a different PDF" : "Click to add a PDF"} />

        {file && <SplitControls name={file.name} pages={pages} range={range} onRange={editRange} />}

        {error && (
          <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
            {error}
          </p>
        )}

        {file && !url && (
          <button onClick={run} disabled={busy} className={`${ACTION} disabled:opacity-60`}>
            {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
            {busy ? "Splitting…" : "Extract pages"}
          </button>
        )}

        {url && (
          <motion.a
            href={url}
            download={`${file?.name.replace(/\.pdf$/i, "") ?? "split"}-pages.pdf`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className={ACTION}
          >
            <Download aria-hidden className="size-4" />
            Download extracted PDF
          </motion.a>
        )}
      </main>
    </div>
  );
}
