"use client";

import { useState } from "react";
import { Download, FileStack, Loader2 } from "lucide-react";
import { Nav } from "../components/nav";
import { mergePdfs } from "../lib/merge-pdfs";
import { Dropzone } from "./dropzone";
import { FileList } from "./file-list";

export default function PdfMergerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const pdfs = Array.from(list).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
    setResultUrl(null);
  }

  function move(index: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResultUrl(null);
  }

  async function merge() {
    setMerging(true);
    try {
      const blob = await mergePdfs(files);
      setResultUrl(URL.createObjectURL(blob));
    } finally {
      setMerging(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <FileStack className="size-6 text-[#25be74]" />
          <h1 className="text-2xl font-semibold">PDF Merger</h1>
        </div>
        <p className="mb-8 text-[14.5px] text-[#9b9b98]">
          Add PDFs in the order you want them merged. Everything runs in your browser — nothing is uploaded.
        </p>

        <Dropzone onFiles={addFiles} />
        <FileList files={files} onMove={move} onRemove={remove} />

        {files.length >= 2 && !resultUrl && (
          <button
            onClick={merge}
            disabled={merging}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f5f5f3] px-6 py-3 text-sm font-medium text-[#0a0a0b] transition-opacity disabled:opacity-50"
          >
            {merging && <Loader2 className="size-4 animate-spin" />}
            {merging ? "Merging…" : `Merge ${files.length} PDFs`}
          </button>
        )}

        {resultUrl && (
          <a
            href={resultUrl}
            download="merged.pdf"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25be74] px-6 py-3 text-sm font-medium text-[#0a0a0b]"
          >
            <Download className="size-4" />
            Download merged.pdf
          </a>
        )}
      </main>
    </div>
  );
}
