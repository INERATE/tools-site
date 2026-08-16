"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { MergeIcon } from "../components/icons/merge-icon";
import { mergePdfs } from "../lib/merge-pdfs";
import { Dropzone } from "./dropzone";
import { FileList, type Item } from "./file-list";

const ACTION = "clay flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] font-semibold";

export default function PdfMergerPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [merging, setMerging] = useState(false);
  const [hot, setHot] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  function addFiles(files: File[]) {
    const picked = files.filter((f) => f.type === "application/pdf");
    setItems((prev) => [...prev, ...picked.map((file) => ({ id: crypto.randomUUID(), file }))]);
    setResultUrl(null);
  }

  function move(index: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setResultUrl(null);
  }

  async function merge() {
    setMerging(true);
    try {
      const blob = await mergePdfs(items.map((i) => i.file));
      setResultUrl(URL.createObjectURL(blob));
    } finally {
      setMerging(false);
    }
  }

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
            <MergeIcon active={hot || merging} size={24} />
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em]">PDF Merger</h1>
        </div>
        <p className="mb-8 text-[14.5px] leading-[1.6] text-[var(--text-dim)]">
          Add PDFs in the order you want them merged. Everything runs in your browser — nothing is uploaded.
        </p>

        <Dropzone onFiles={addFiles} />
        <FileList items={items} onMove={move} onRemove={remove} />

        {items.length >= 2 && !resultUrl && (
          <button onClick={merge} disabled={merging} className={`${ACTION} disabled:opacity-60`}>
            {merging && <Loader2 aria-hidden className="size-4 animate-spin" />}
            {merging ? "Merging…" : `Merge ${items.length} PDFs`}
          </button>
        )}

        {resultUrl && (
          <motion.a
            href={resultUrl}
            download="merged.pdf"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className={ACTION}
          >
            <Download aria-hidden className="size-4" />
            Download merged.pdf
          </motion.a>
        )}
      </main>
    </div>
  );
}
