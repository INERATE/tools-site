# Design System

Inerate Tools reads as **macOS System Settings**, not generic SaaS: near-black
glass, springs instead of easing curves, translucency that implies depth
rather than decoration. The theme picker extends this system — it doesn't
replace it.

## Why glassmorphism
Apple's own materials guidance (WWDC "Designing Fluid Interfaces") treats
translucency as a **depth cue**, not a trend: a blurred, saturated layer
tells the eye "this sits above your content" without a hard shadow. `.glass`
(`backdrop-filter: blur(24px) saturate(160%)`) is that cue. It only works
with vibrancy — text stays near-full-opacity, never flat gray-on-blur — so
every theme keeps `--text` high-contrast against its own `--bg`.

## The 4 themes
| Theme | `--bg` | `--bg-raised` | `--text` | `--accent` | Blobs |
|---|---|---|---|---|---|
| Obsidian | `#0a0a0b` | `#141518` | `#f5f5f3` | `#25be74` | green → blue |
| Daylight | `#f4f4f2` | `#ffffff` | `#1c1c1e` | `#17864d` | green → indigo |
| Aurora | `#0a0a12` | `#16151f` | `#f2f1fa` | `#8ab4ff` | blue → violet |
| Ember | `#120a08` | `#1c1210` | `#faf1ec` | `#ff9d5c` | coral → rose |

Obsidian's values are the original shipped tokens, untouched. Daylight's
accent is darkened from the brand green (`#25be74`, only 3.5:1 on white —
fails AA) to `#17864d` (4.6:1) so nav/link text stays compliant; the ambient
blobs keep the brighter, decorative `#25be74` since blob color isn't text.
Every other theme text/accent pairing clears AA with margin (7:1–18:1).

## Token rule
Every theme is a `data-theme` attribute swap on `<html>` (`app/lib/theme.ts`),
never a class per component. One CSS custom-property set, four values —
components stay theme-blind by reading `var(--text-dim)` etc., never a
hardcoded hex. `.glass` and `.ambient-blob` get small per-theme overrides in
`globals.css` for background/border/blob color, since those were the only
rules that hardcoded Obsidian's colors directly instead of referencing
tokens.

## Border hairline
`--border` (subtle white-on-dark, subtle black-on-light) and `.glass`'s
bright top-edge highlight stay conceptually identical across all 4 themes —
only their color inverts for light vs. dark, so the "light catching glass"
effect reads correctly regardless of theme.
