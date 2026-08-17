# Design System & macOS Principles

Inerate Tools reads as **macOS native system software**, not generic SaaS:
precision-milled glass surfaces, springs instead of easing curves, and
translucency that implies physical depth. Every tool runs entirely in the
browser — no WebAssembly, no server telemetry. The `#demo-stage` mockup on the
landing page is illustrative: its "activity log" lists the real pdf-lib
steps (read / merge / save), not invented worker or WASM internals, and its
"Run Operation" button is a timed animation, not a measurement.

## Core Pillars

1. **macOS Native Window Hierarchy**: Translucent titlebars with authentic
   traffic lights (`#FF5F56`, `#FFBD2E`, `#27C93F`), segmented toolbar
   controls, and Finder-style file queues.
2. **Honest Local Activity**: The demo's status panel names the actual
   client-side steps a tool takes — no fabricated latency numbers, worker
   counts, or telemetry. If a claim isn't true of the code, it doesn't ship.
3. **Materials as Depth Cues**: Apple WWDC "Designing Fluid Interfaces"
   principles (`backdrop-filter: blur(28px) saturate(190%)`), top-light
   specular insets (`inset 0 1px 0 var(--glass-hi)`), and
   `rgba(255,255,255,0.08)` hairlines.

## The 5 Themes + Auto

| Theme | `--bg` | `--bg-raised` | `--text` | `--accent` | Accents |
|---|---|---|---|---|---|
| Iridescence (default) | `#0B0A14` | `#161422` | `#F4F2FF` | `#A78BFA` | Violet / Fuchsia / Cyan |
| Obsidian | `#0A0A0C` | `#17181C` | `#F2F3F5` | `#8FB6FF` | Slate / Ice Blue |
| Daylight | `#F2F1F7` | `#FFFFFF` | `#191722` | `#6D28D9` | Crisp Light / Deep Violet |
| Aurora | `#050F14` | `#0C1A20` | `#EAFBFF` | `#5EEAD4` | Mint / Emerald / Sky |
| Ember | `#120A08` | `#1E1210` | `#FFF3EC` | `#FDBA74` | Coral / Warm Amber |

`Auto` is a mode, not a 6th theme: it resolves live to Iridescence or
Daylight via `prefers-color-scheme`, never to Obsidian/Aurora/Ember
(manual-only). See `docs/THEME-TOGGLE.md` for the toggle mechanics.

## Token Rule
Every theme is a `data-theme` attribute swap on `<html>` (`app/lib/theme.ts`).
Components stay strictly theme-blind by reading `var(--text-dim)` and
`var(--accent)`. Hardcoded hex values in component files are prohibited.

## Motion & Tactility
- Micro-interactions: 150–350ms with critically damped springs
  (`type: "spring", bounce: 0`), per the Atelier apple-design law.
- `prefers-reduced-motion` disables the theme-toggle wipe, scroll-scrub
  parallax, and float animations — components fall back to instant or
  opacity-only transitions, never skip a state.

## The shared page board
Every PDF tool (Merger, Splitter, PDF to Image, Watermark Remover) is built
on one component set at `app/components/page-board/`: thumbnails of every
page as draggable tiles, with rotate, duplicate, delete and reset. `lib/
assemble-pdf.ts` writes the final arrangement as an explicit page list, so
order, deletions, duplicates and rotation all come from one source of truth
rather than being special-cased per tool.
