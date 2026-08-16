# Design System & macOS Principles

Inerate Tools reads as **macOS Native System Software & Cloudflare Telemetry**, not generic SaaS: precision-milled glass surfaces, springs instead of easing curves, translucency that implies physical depth, and live WebAssembly sandboxing.

## Core Pillars

1. **macOS Native Window Hierarchy**: Translucent titlebars with authentic traffic lights (`#FF5F56`, `#FFBD2E`, `#27C93F`), segmented toolbar controls, and Finder-style file queues.
2. **Cloudflare-Grade Telemetry Stream**: Real-time worker thread telemetry, execution latency counters (`0.034s`), sandboxed heap allocation meters, and interactive CLI prompts.
3. **Materials as Depth Cues**: Apple WWDC "Designing Fluid Interfaces" principles (`backdrop-filter: blur(28px) saturate(190%)`), top-light specular insets (`inset 0 1px 0 var(--glass-hi)`), and `rgba(255,255,255,0.08)` hairlines.

## The 5 Themes

| Theme | `--bg` | `--bg-raised` | `--text` | `--accent` | Accents |
|---|---|---|---|---|---|
| Iridescence | `#0B0A14` | `#161422` | `#F4F2FF` | `#A78BFA` | Violet / Fuchsia / Cyan |
| Obsidian | `#0A0A0C` | `#17181C` | `#F2F3F5` | `#8FB6FF` | Slate / Ice Blue |
| Daylight | `#F2F1F7` | `#FFFFFF` | `#191722` | `#6D28D9` | Crisp Light / Deep Violet |
| Aurora | `#050F14` | `#0C1A20` | `#EAFBFF` | `#5EEAD4` | Mint / Emerald / Sky |
| Ember | `#120A08` | `#1E1210` | `#FFF3EC` | `#FDBA74` | Coral / Warm Amber |

## Token Rule
Every theme is a `data-theme` attribute swap on `<html>` (`app/lib/theme.ts`). Components stay strictly theme-blind by reading `var(--text-dim)` and `var(--accent)`. Hardcoded hex values in component files are prohibited.

## Motion & Tactility
- Micro-interactions: 150–250ms with critically damped springs (`type: "spring", bounce: 0`).
- Interactive triggers provide instant haptic-like visual feedback and sub-millisecond RAM execution state updates.
