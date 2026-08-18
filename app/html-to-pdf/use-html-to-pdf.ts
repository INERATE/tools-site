"use client";

import { useState } from "react";
import { htmlToPdf } from "../lib/html-to-pdf";
import { renderPages, type Rendered } from "../lib/pdf-to-image";

const SAMPLE = `<h1>Untitled document</h1>
<p>Paste your own HTML here — headings, paragraphs and lists carry over.</p>
<ul>
  <li>Type or paste markup on the left</li>
  <li>Convert to see a live preview</li>
  <li>Download when it looks right</li>
</ul>`;

export function useHtmlToPdf() {
  const [html, setHtml] = useState(SAMPLE);
  const [blocks, setBlocks] = useState(0);
  const [pages, setPages] = useState<Rendered[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const out = await htmlToPdf(html);
      setUrl(URL.createObjectURL(out.blob));
      setBlocks(out.blocks);
      const shots = await renderPages(out.blob, { scale: 1.4, format: "jpeg", quality: 0.85 });
      setPages(shots);
    } catch (e) {
      setUrl(null);
      setPages([]);
      setError(e instanceof Error ? e.message : "That markup could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return {
    html,
    setHtml: (v: string) => {
      setHtml(v);
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
