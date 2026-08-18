# PLAN — the road to a 200+-tool suite

## 1. Where we honestly are

**6 tools shipped**, all client-side, all live at tools.inerate.com:
PDF Merger, PDF Split, PDF → Image, Watermark Remover, DOCX → PDF, Résumé Builder.

Not 110+. That number was a guess, not a fact — correcting it here so this plan
is built on real ground.

## 2. What "200+ tools" actually is, at iLovePDF/CloudConvert

Two different shapes, both worth copying:

- **iLovePDF (~30 real tools)**: one PDF *engine* per card — merge, split,
  compress, rotate, sign, watermark, unlock, OCR. Each is genuinely one
  feature.
- **CloudConvert (200+ nav entries)**: one *converter* engine, wearing a
  different costume per format pair — Word→PDF, PDF→Word, Excel→PDF, PDF→PPT…
  212 formats × plausible pairs = hundreds of landing pages, but maybe 15
  underlying conversion engines.

So "200 tools" for us realistically means: **~50-60 real engines**, several of
which (format conversion, image ops) get 3-6 landing-page variants each for
SEO — matching how competitors actually reach 150-200 nav entries without
building 200 different pieces of logic.

## 3. The constraint that actually matters: 100% client-side

Our whole brand is "nothing is uploaded." That's a real moat (privacy-first
beats every incumbent that phones a server) but it rules tools out. Every
tool below is tagged:

- 🟢 **client-only** — a WASM/JS library does the real work in the tab, keeps
  the brand promise intact.
- 🟡 **client-only, heavier** — doable, but bigger bundle / slower on low-end
  phones (ffmpeg.wasm, tesseract.js, onnxruntime-web). Ship behind a
  "this may take a moment on your device" note.
- 🔴 **needs a server** — an LLM call (Summarize, Translate) or something no
  WASM lib covers well. These break "nothing uploaded" unless scoped tightly
  (send only extracted text, not the file; disclose it in the UI). Treat as
  a deliberate, separate product line — not silently bolted onto the rest.

## 4. Phases

### Phase 1 — PDF Organize & Convert core (🟢, pdf-lib we already use)
Compress PDF, Rotate PDF, Page Numbers, Unlock PDF (remove open-password),
Protect PDF (add password), JPG → PDF, Extract Images from PDF, Sign PDF
(draw/type signature, place on page), PDF → PDF/A. ~9 tools, all built on
the page-board component we already have.

### Phase 2 — iLoveIMG-style image suite (🟢/🟡)
Compress Image, Resize Image, Convert Image (PNG/JPG/WEBP/AVIF via
`<canvas>`), Crop Image, Rotate Image, Watermark Image (reuse the PDF
watermark logic against a canvas instead of a page), Remove Background
(🟡 — onnxruntime-web + a small segmentation model). ~7 tools, new
`image-board` sibling to `page-board`.

### Phase 3 — Advanced PDF (🟡)
OCR PDF (tesseract.js — searchable text layer over scanned pages), Repair
PDF (re-serialize via pdf-lib, drops most corruption), Compare PDF
(side-by-side diff, text-extract + diff algorithm), Redact PDF (draw solid
boxes + strip underlying text, not just paint over it — real redaction),
Crop PDF, PDF Forms (fill/flatten AcroForm fields pdf-lib already exposes).
~6 tools.

### Phase 4 — Office round-trips (🟢/🟡)
We already have DOCX→PDF (mammoth). Add PDF→DOCX (harder: pdf.js text
extraction → docx.js reconstruction, imperfect layout — ship with a "best
effort, complex layouts may shift" disclaimer, exactly like every
competitor's fine print), PPTX→PDF, XLSX→PDF, Markdown→PDF, PDF→Markdown
(nice OSS-friendly one). ~5-6 tools.

### Phase 5 — 🔴 AI tools (separate track, own trust copy)
AI Summarizer, Translate PDF, PDF Forms auto-detect. These need an LLM API
key and a real backend endpoint (Cloudflare Worker + your Anthropic/OpenAI
key), so they're the one place the site legitimately calls out. Gate them
behind the Pro-tier flag from the start — this is the actual money page,
not the free client-side tools.

### Phase 6 — Monetization (parallel, not sequential — do this alongside Phase 1-2, not after)
Ad-slot components + placement (never between upload and download), a
`useIsPro()` stub that Phase 5's AI tools check against, Pro upsell copy.
This was already scoped and is still the next concrete task — see below.

## 5. Landing-page multiplication (how we get from ~35 engines to 150-200 pages)
Once Phase 1+4 conversion engines exist, generate format-pair landing pages
(`/word-to-pdf`, `/pdf-to-word`, `/jpg-to-pdf`, `/pdf-to-jpg`…) that each
render the *same* underlying tool with different copy/OG tags for SEO —
this is literally how iLovePDF/CloudConvert get their nav count. Don't build
this until Phase 1-2 engines exist; it's a templating task, not new logic.

## 6. Suggested build order
1. Finish Phase 6 (monetization scaffolding) — next up, unblocks revenue on
   the 6 tools already live.
2. Phase 1 (9 tools) — cheapest wins, reuses page-board entirely.
3. Phase 2 (7 tools) — new but small surface, high search volume
   ("compress image", "resize image").
4. Phase 3 → Phase 4 → landing-page multiplication → Phase 5.

Each phase is its own `/atelier:build` pass — ship and verify one phase in
production before starting the next, same as tools 1-6.
