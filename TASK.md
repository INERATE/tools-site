# Theme Toggle — shipped

**Status: done.** Kept here as the reference contract for the appearance
picker; see `docs/THEME-TOGGLE.md` for the mechanics and `docs/DESIGN.md` for
the token tables. The active work right now is monetization — see the bottom
of this file.

**Goal (met):** a 5-theme appearance picker (Iridescence / Obsidian / Daylight
/ Aurora / Ember) with an Auto mode that follows the OS, transitioning like
Apple's circular wipe — the "macOS System Settings" mental model this project
borrows its aesthetic from.

## Themes
1. **Iridescence** — the default: dark, violet→fuchsia→cyan gradient mesh
2. **Obsidian** — dark, slate / ice blue
3. **Daylight** — bright glass, dark text, darkened accent for AA contrast
4. **Aurora** — dark, blue-violet cast, indigo→violet blobs
5. **Ember** — dark, warm-brown cast, coral→rose blobs

**Auto** is a mode, not a 6th theme — resolves live to Iridescence or Daylight
via `prefers-color-scheme`, never to Obsidian/Aurora/Ember (manual-only, like
macOS never auto-picks an accent color). A first-time visitor gets
Iridescence directly, not Auto — see `docs/THEME-TOGGLE.md`.

## Where it lives
A single glass-pill icon button in `Nav`, next to GitHub — click cycles
Auto → Iridescence → Obsidian → Daylight → Aurora → Ember → Auto. No
dropdown, no new component tier (per the transition recipe).

## Flow
```
click (x, y) → startViewTransition(set data-theme)
            → clip-path circle expands from (x, y)
            → choice written to localStorage
```
Reduced motion: skip `startViewTransition`, swap instantly. No View
Transitions support: 300ms cross-fade on `html, body` background/color
instead of the wipe.

## Done-state contract
- [x] All 5 themes render distinct, correct token sets — `.glass` and the
      ambient blobs repaint per theme, not just text.
- [x] Hard refresh in any theme: zero FOUC (inline head script sets
      `data-theme` before first paint; `suppressHydrationWarning` on `<html>`).
- [x] Toggle persists the chosen theme (or `auto`) across visits via
      `localStorage`.
- [x] Auto updates live when OS appearance changes mid-session — no reload
      (`matchMedia` change listener while Auto is active).
- [x] Click-origin circular wipe on View Transitions browsers; cross-fade
      elsewhere; instant swap under `prefers-reduced-motion`.
- [x] WCAG AA text contrast holds in all 5 themes, glass-card text included.
- [x] Every touched file stays ≤350 words.
- [x] `pnpm build` and `pnpm lint` pass clean.

---

# Tools shipped — status as of this task

All six document tools are live in production and verified end to end:
PDF Merger, PDF Splitter, PDF to Image, Résumé Builder, Watermark Remover,
DOCX to PDF. Every PDF tool shares one page-board component
(`app/components/page-board/`) for drag-reorder, rotate, duplicate, delete
and reset — see `docs/DESIGN.md`.

**Not started: monetization.** No ads, no subscription, no collaboration.
This is the actual gap between the current site and the ₹1L/month goal, and
is the next real task once the ads-vs-subscription direction is decided.
