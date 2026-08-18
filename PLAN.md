# PLAN — the road to a 200+-tool suite

## 1. Where we honestly are

**6 tools shipped**, all client-side, all live at tools.inerate.com:
PDF Merger, PDF Split, PDF → Image, Watermark Remover, DOCX → PDF, Résumé Builder.

## 2. Rule for every phase from here on
- **3 tools per phase.** Small enough to give each one real depth — its own
  animated "how it works" pipeline, its own icon, its own liquid-glass
  polish — instead of stamping out six shallow tools a day.
- Each phase ships to production and gets a real Playwright pass (desktop +
  mobile) before the next phase starts. No permission checkpoint between
  phases — once a phase is verified live, the next one starts automatically.
- 🟢 client-only · 🟡 client-only but heavier (WASM) · 🔴 needs a server
  (LLM calls) — kept last, own trust copy, gated behind Pro.
- Ordered by real-world search volume (what people actually type into
  Google — "compress pdf" and "pdf to word" dwarf "redact pdf").

## 3. The phases

**Phase 1 — 🟢 Compress PDF · PDF to Word · JPG to PDF**
Highest-search-volume trio not yet built. Compress reuses pdf-lib's stream
recompression; PDF→Word is pdf.js text/layout extraction into docx.js (ship
with an honest "best effort on complex layouts" note, like every competitor
does); JPG→PDF is the inverse of our PDF→Image pipeline.

**Phase 2 — 🟢 Rotate PDF · Page Numbers · Sign PDF** *(revised — see note)*
Originally planned as Rotate/Unlock/Protect. Checked before building: pdf-lib
has **no password support at all** — it cannot decrypt an encrypted PDF
(`ignoreEncryption` just skips the content, it doesn't unlock it) and cannot
write encryption either. Unlock/Protect PDF need a real PDF security-handler
implementation (RC4/AES per ISO 32000) or a different dependency — a bigger,
security-sensitive decision on its own, not a quick pdf-lib call as first
assumed. Pulled from this phase and tracked separately (see §6) instead of
shipped half-working. Sign PDF and Page Numbers moved up from Phase 3 to
fill the slots: Sign PDF is draw/type/upload a signature, place and resize
on a page; Page Numbers stamps a running number with position/style
options; Rotate PDF is the single-file page-board already built, wrapped in
its own dedicated page.

**Phase 3 — 🟢 HTML to PDF · PDF to PowerPoint · Excel to PDF**
HTML to PDF: paste a URL or markup, render via `<iframe>` + print-to-canvas.
PDF to PowerPoint / Excel to PDF: office round-trips using the same
extraction approach as DOCX↔PDF.

**Phase 4 — 🟡 PowerPoint to PDF · OCR PDF · Repair PDF**
PowerPoint to PDF rounds out the office trio. OCR via tesseract.js (flag as
slower on-device); Repair re-serializes through pdf-lib.

**Phase 5 — 🟡 Crop PDF · Compare PDF · Redact PDF**
Crop reuses the page-board rotate/duplicate pattern for a new "crop box" op.
Compare: text-extract both docs, diff, side-by-side highlight. Redact: real
redaction — strip the underlying text run, not just paint a box over it.

**Phase 6 — 🟢 PDF Forms · PDF to Markdown · Markdown to PDF**
Forms: fill + flatten AcroForm fields pdf-lib already parses. Markdown
round-trip rounds out conversions and is a nice organic-search/OSS magnet.

**Phase 7 — 🟢 Compress Image · Resize Image · Convert Image**
New `image-board` sibling to `page-board`. Canvas-based, no new heavy deps.
Highest-search-volume image trio (mirrors iLoveIMG's top 3).

**Phase 8 — 🟢/🟡 Crop Image · Watermark Image · Remove Background**
Crop/Watermark reuse Phase 7's image-board. Remove Background needs
onnxruntime-web + a small segmentation model — flag as the heaviest tool
in the suite, lazy-loaded so it doesn't tax every other page's bundle.

**Phase 9 — 🔴 AI Summarizer · Translate PDF · Smart PDF Forms**
The one phase that calls a server (Cloudflare Worker + LLM key) — own trust
copy explaining exactly what leaves the device (extracted text only, never
the file), gated behind the Pro flag from day one. This is the actual
revenue page, not a bonus.

Beyond Phase 9: format-pair landing-page multiplication (`/word-to-pdf`,
`/pdf-to-word`, …) templated off the engines above — this is how the nav
count grows from ~35 real engines toward the 150-200 iLovePDF/CloudConvert
show, without new logic. Templating task, scheduled after Phase 8.

## 4. Design bar for every tool (non-negotiable, not just phase 1)
- Liquid-glass premium surfaces — matches the existing `ToolWindow` macOS
  chrome and `.glass`/`.liquid-card` system already in `themes.css`.
- **Animated pipeline, not a static 3-step list.** Replace the current
  static `ToolPipeline` icons with a looped, keyframed SVG animation per
  tool — the shapes it manipulates (a page, a lock, a signature) animate
  through the tool's actual steps on a loop, silent, no video file, so nothing
  is ever "downloadable" — pure CSS/SVG `@keyframes`, cheap to ship, infinite
  loop, matches Apple's own product-page style (e.g. iCloud Keychain's
  looping diagrams).
- Every icon gets its own hover/active micro-animation (spring physics per
  `apple-design`), not a shared generic hover state.
- Verified in a real browser (upload → result → download, desktop + mobile)
  before a phase counts as shipped — not just typecheck/lint.

## 5. Landing page overhaul (own workstream, runs alongside Phase 1)
- Hero keeps today's 6 recommended tools, gets a **"View all →"** that
  opens `/all-tools` — grid of every shipped tool, same card style, grouped
  by category (Organize / Convert / Edit / Security / Image / Intelligence).
- Premium command-palette search: a pill in the hero that, on click, opens
  a full-screen overlay (backdrop blur, glass panel) with an input;
  typing live-filters the tool list beneath it by name/keyword, arrow keys
  + Enter to jump straight to a tool, `Esc` to close. Same visual language
  as the macOS `ToolWindow` chrome already in place.

## 6. Deferred, not dropped: Unlock PDF · Protect PDF
Needs a decision, not just a build slot: either (a) implement the PDF
standard security handler (RC4-40/128, AES-128/256, per ISO 32000-1 §7.6)
by hand on top of pdf-lib's low-level object access, which is real
cryptography code that has to be right, or (b) pull in a library that
already does it (evaluate size/maintenance before adding). Scheduled once
Phase 1-6 build a large-enough base that the harder security work is worth
prioritizing over another easy conversion tool.
