# Inerate Tools

Free, private, browser-based document utilities — PDF merge, split, convert, and more.
Nothing uploads to a server; every tool runs client-side. Sibling site to
[Inerate Forge](https://forge.inerate.com) (open source) and Atelier (the framework).

Live at `tools.inerate.com`.

## Stack

Next.js 16 (App Router) + Tailwind CSS 4 + Cloudflare Workers via
[OpenNext](https://opennext.js.org/cloudflare). Same setup as `forge-site`.

## Dev

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build + typecheck
```

## Deploy

```bash
pnpm run deploy   # opennextjs-cloudflare build + deploy
```

Requires an authenticated `wrangler` session (`wrangler login`) and the right
`account_id` for the target Cloudflare account.

## Structure

```
app/
  page.tsx              landing page — tool grid
  layout.tsx             root layout, theme init
  globals.css             design tokens, theme palettes
  components/            shared UI (nav, hero, tool card, theme toggle...)
  lib/                     pure logic (e.g. mergePdfs)
  pdf-merger/            first live tool
```

Each new tool gets its own top-level route (`/pdf-split`, `/watermark-remover`, ...)
with any pure logic split into `app/lib/`.

## Conventions

- **Ponytail**: shortest correct diff, no dependency where a native feature or a few
  lines will do, no speculative abstraction.
- **250-word file budget** (hard cap 350, enforced by a pre-write hook) — split
  components before you hit it.
- **Apple design law**: springs over CSS keyframes for anything interactive,
  translucent glass materials with vibrancy, `prefers-reduced-motion` always respected.

See `TASK.md` for the current build's done-state contract and `docs/` for the design
system and theme-toggle flow.
