# Theme Toggle

**Goal:** ship a 4-theme appearance picker (Obsidian / Daylight / Aurora / Ember)
with an Auto mode that follows the OS, transitioning like Apple's circular
wipe — the "macOS System Settings" mental model this project already borrows
its aesthetic from.

## Themes
1. **Obsidian** — the original dark theme, unchanged
2. **Daylight** — bright glass, dark text, darkened accent for AA contrast
3. **Aurora** — dark, blue-violet cast, indigo→violet blobs
4. **Ember** — dark, warm-brown cast, coral→rose blobs

**Auto** is a mode, not a 5th theme — resolves live to Obsidian or Daylight via
`prefers-color-scheme`, never to Aurora/Ember (manual-only, like macOS never
auto-picks an accent color).

## Where it lives
A single glass-pill icon button in `Nav`, next to GitHub — click cycles
Auto → Obsidian → Daylight → Aurora → Ember → Auto. No dropdown, no new
component tier (per the transition recipe).

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
- [x] All 4 themes render distinct, correct token sets — `.glass` and the
      ambient blobs repaint per theme, not just text.
- [x] Hard refresh in any theme: zero FOUC (inline head script sets
      `data-theme` before first paint; `suppressHydrationWarning` on `<html>`).
- [x] Toggle persists the chosen theme (or `auto`) across visits via
      `localStorage`.
- [x] Auto updates live when OS appearance changes mid-session — no reload
      (`matchMedia` change listener while Auto is active).
- [x] Click-origin circular wipe on View Transitions browsers; cross-fade
      elsewhere; instant swap under `prefers-reduced-motion`.
- [x] WCAG AA text contrast holds in all 4 themes, glass-card text included.
- [x] Every touched file stays ≤350 words.
- [x] `pnpm build` and `pnpm lint` pass clean.
