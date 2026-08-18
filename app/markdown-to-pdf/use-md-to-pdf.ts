"use client";

import { useState } from "react";
import { markdownToPdf } from "../lib/markdown-to-pdf";
import { renderPages, type Rendered } from "../lib/pdf-to-image";

const SAMPLE = `# Untitled document

Paste your own markdown here — headings, paragraphs and lists carry over.

- Type or paste markdown on the left
- Convert to see a live preview
- Download when it looks right`;

export function useMarkdownToPdf() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [blocks, setBlocks] = useState(0);
  const [pages, setPages] = useState<Rendered[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const out = await markdownToPdf(markdown);
      setUrl(URL.createObjectURL(out.blob));
      setBlocks(out.blocks);
      setPages(await renderPages(out.blob, { scale: 1.4, format: "jpeg", quality: 0.85 }));
    } catch (e) {
      setUrl(null);
      setPages([]);
      setError(e instanceof Error ? e.message : "That markdown could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return {
    markdown,
    setMarkdown: (v: string) => {
      setMarkdown(v);
      setUrl(null);
    },
    blocks,
    pages,
    url,
    busy,
    error,
    run,
  };
}
