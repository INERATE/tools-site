# Theme Toggle — How It Works

## The interaction
1. User clicks the glass-pill button in `Nav` (`theme-toggle.tsx`). The click
   event gives us `(x, y)` — the wipe's origin.
2. We compute the farthest distance from `(x, y)` to any viewport corner —
   the wipe's max radius.
3. `document.startViewTransition(() => setAttribute('data-theme', next))`
   runs the actual swap. The browser snapshots old/new states and hands us
   `::view-transition-new(root)` to animate.
4. `globals.css` disables the API's default cross-fade
   (`::view-transition-old/new(root) { animation: none }`) so only our clip
   is visible; `document.documentElement.animate()` grows
   `clip-path: circle(r at x y)` from `0` to the max radius on a cubic-bezier
   tuned to *look* spring-like (View Transitions only accept CSS easing, not
   real spring physics).
5. The choice is written to `localStorage` (`theme`:
   `obsidian | daylight | aurora | ember | auto`).

Themes advance in a fixed cycle on each click — no dropdown, one button, same
glass material as the rest of `Nav`.

## No-FOUC on load
An inline `<script>` in `app/layout.tsx`'s `<head>` (before any hydration)
reads `localStorage` and sets `data-theme` on `<html>` synchronously —
`<html suppressHydrationWarning>` tells React to trust the DOM the script
already wrote instead of flagging a mismatch. This is the one place a
blocking script is correct — the alternative is a flash of the wrong theme.

## Auto mode
`auto` doesn't store a fixed theme — `app/lib/theme.ts`'s `resolve()` checks
`matchMedia('(prefers-color-scheme: dark)')` live, and the toggle's
`useLayoutEffect` re-subscribes to OS changes whenever `auto` is active, so
it updates mid-session with no reload. It only ever resolves to Obsidian or
Daylight, never Aurora/Ember.

## Fallbacks, in order of precedence
- **`prefers-reduced-motion: reduce`** — checked first (`useReducedMotion`),
  wins over everything: `data-theme` swaps instantly, no wipe, no cross-fade.
- **No View Transitions API** (`!document.startViewTransition`): the swap
  falls through to the same instant path, softened only by the 300ms
  `background-color`/`color` CSS transition already on `html, body`.
