# PLAN — the road to a 200+-tool suite

## 1. Where we honestly are

**27 tools shipped**, all client-side, all live at tools.inerate.com,
spanning Phases 1-8 below (PDF organize/convert/optimize/security plus a
full image-tools suite). Started this file at 6 tools; kept the original
phase log intact underneath as the record of how we got here.

**Monetization scaffolding is live**: `AdSlot` (`app/components/ad-slot.tsx`)
is wired into every one of the 29 tool pages plus the homepage and
`/all-tools`, always below the primary upload→result→download action,
never inside it. It renders nothing until `NEXT_PUBLIC_ADSENSE_CLIENT` is
set (verified both states: off by default, a real client ID activates the
`adsbygoogle` script and unit in the prerendered output) and nothing for
Pro users. `useIsPro()` (`app/lib/use-is-pro.ts`) is the entitlement stub
every ad slot and future paywall checks — always `false` until a real
payment gateway exists, at which point it's a one-line change, not a
site-wide search-and-replace.

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

**Phase 3 — 🟢 HTML to PDF · PDF to PowerPoint · Excel to PDF** *(shipped)*
HTML to PDF: paste markup only, not a URL — checked before building, and
fetching an arbitrary external URL from the browser hits CORS on almost
every real site; a URL-fetch mode would need a server, breaking "nothing
uploaded." Reuses the same block-layout pipeline as DOCX to PDF. PDF to
PowerPoint: image-per-slide (visual-exact, text not editable after) rather
than text/layout reconstruction — slide design is visual-first, so this is
the more honest trade for this format. Excel to PDF: first sheet only,
drawn as a plain grid via a new `xlsx` (SheetJS) dependency; other sheets,
merges, colors and formulas are not reproduced.

**Phase 4 — 🟡 OCR PDF · Repair PDF · Crop PDF** *(revised — see note)*
Originally planned to include PowerPoint to PDF. Checked before building:
pptxgenjs (added in Phase 3) is **write-only** — it can build a .pptx but
cannot read/parse one. Reading a real .pptx means unzipping its slide XML
and rendering arbitrary shapes/text/images ourselves; there is no
lightweight, battle-tested client-side library for that the way mammoth
covers .docx and SheetJS covers .xlsx. That is a slide-renderer-sized
project, not a phase slot — moved to §6 pending a real build-vs-buy call,
same as Unlock/Protect PDF. Crop PDF pulled forward from Phase 5 to fill
the slot: reuses the page-board's rotate/duplicate pattern for a new "crop
box" op. OCR via tesseract.js (flag as slower on-device); Repair
re-serializes through pdf-lib.

**Phase 5 — 🟡 Compare PDF · Redact PDF · PDF Forms** *(shipped)*
Compare: hand-written LCS line-diff (no new dependency) between two PDFs'
extracted text, downloadable as a report. Redact: pages with a box are
rasterized with the box burned into the pixels before encoding — no
underlying text object survives, verified by round-tripping the output
through PDF to Word. Forms: real AcroForm fields (text/checkbox/radio/
dropdown) via pdf-lib, fill + flatten by default.

**Phase 6 — 🟢 PDF to Markdown · Markdown to PDF · Extract Images from PDF**
*(revised — see note)* Originally planned to include PDF to PDF/A. Checked
before building: real PDF/A compliance needs an embedded ICC profile, an
OutputIntent dictionary, full PDF/A-flavored XMP metadata, and a guarantee
every font is embedded — pdf-lib has none of that built in, and faking a
"PDF/A" label without real compliance is worse than not shipping it (a
validator like veraPDF would reject it, and a user relying on the label
for archival/legal purposes would be misled). Moved to §6. Extract Images
pulled forward instead: walks each page's XObject resources for embedded
JPEG (DCTDecode) streams and bundles them as a .zip via a ~40-line
store-only ZIP writer — no new dependency for that either. PDF to
Markdown guesses headings from font-size ratios (pdf.js exposes per-glyph
height); Markdown to PDF reuses the block-layout pipeline HTML/DOCX to
PDF already share, via a small hand-rolled markdown reader (headings,
lists, paragraphs only — the same block kinds the renderer supports, so a
full markdown-parser dependency would parse things it could never draw).

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

## 6. Deferred, not dropped

**Unlock PDF · Protect PDF** — needs a decision, not just a build slot:
either (a) implement the PDF standard security handler (RC4-40/128,
AES-128/256, per ISO 32000-1 §7.6) by hand on top of pdf-lib's low-level
object access, which is real cryptography code that has to be right, or
(b) pull in a library that already does it (evaluate size/maintenance
before adding).

**PowerPoint to PDF** — needs a real .pptx reader/renderer, not just a
build slot: pptxgenjs (Phase 3) only writes .pptx files, and there's no
equivalent of mammoth/SheetJS for reading one back — a slide has arbitrary
positioned shapes, text boxes and images in its own XML dialect, closer to
a small layout engine than a text extractor. Evaluate existing parser
libraries for size/completeness before committing to build one by hand.

**PDF to PDF/A** — needs real archival-format compliance, not a label
change: an embedded ICC color profile, an OutputIntent dictionary,
PDF/A-flavored XMP metadata, and a guarantee every font in the document is
embedded. pdf-lib has none of this built in. A "PDF/A" that isn't actually
compliant is worse than no tool at all for the people who'd use it.

All three scheduled once Phase 1-6 build a large-enough base that this
harder, riskier work is worth prioritizing over another easy conversion
tool.

## 7. Priority tiers (what actually gets homepage placement)

The homepage shows a **curated 6**, not all 27 — `RECOMMENDED_TOOLS` in
`app/components/tool-list.ts`, ordered by real-world search volume, with
everything else one click away at `/all-tools`:

1. PDF Merger — "merge pdf" is the single highest-volume query in the
   whole category
2. PDF Splitter — "split pdf" is a close second
3. Compress PDF — "compress pdf" — the #1 pain point once someone already
   has a PDF (email size limits, upload limits)
4. PDF to Word — "pdf to word" — the most-searched conversion, by a wide
   margin over every other format pair
5. JPG to PDF — "jpg to pdf" — the most-searched image→PDF direction
   (receipts, scanned docs, ID photos)
6. Sign PDF — "sign pdf" / e-signature demand, and unlike the other five
   it's a repeat-use tool (contracts, forms), which matters for return
   visits, not just first-click volume

Everything past these six is real, useful, and fully built — just not
first-click material. Re-rank this list, not the tool set, if traffic
data later shows a different top 6.
