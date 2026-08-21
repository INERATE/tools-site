@AGENTS.md

# Tools Site Developer & Agent Guide

## Quick References
- **Design System & Tokens**: [`docs/DESIGN.md`](file:///e:/Framework/tools-site/docs/DESIGN.md)
- **Theme Mechanics (5 Themes + Auto)**: [`docs/THEME-TOGGLE.md`](file:///e:/Framework/tools-site/docs/THEME-TOGGLE.md)
- **Google Veo 3.0 Generation Guide**: [`docs/VEO-VIDEO-GENERATION.md`](file:///e:/Framework/tools-site/docs/VEO-VIDEO-GENERATION.md)
- **Roadmap & Phase Status**: [`PLAN.md`](file:///e:/Framework/tools-site/PLAN.md)

## Core Architecture Guidelines
1. **Zero-Upload Local Privacy**: All 50+ document & image tools process entirely client-side inside the browser using WebAssembly, Canvas, and `pdf-lib` / `pdfjs-dist`. Nothing is ever uploaded to a remote server.
2. **Animation & Design Preservation**: Preserve all existing UI aesthetics, theme tokens (5 themes: Iridescence, Obsidian, Daylight, Aurora, Ember), 3D claymorphic card tilt (`useTilt`), and frosted glassmorphism (`backdrop-filter: blur`). Do not alter or degrade existing UI styles.
3. **Edge Performance & Caching**: All public pages must be pre-rendered statically with Edge cache headers. Use `prefetch={false}` on large link grids/lists to avoid burst edge worker exhaustion.
4. **Google Analytics**: Web stream `G-L1D7GPN13Y` handles cross-subdomain analytics across `inerate.com`, `tools.inerate.com`, and `forge.inerate.com`.
5. **Deployments**: Pushes to `master` trigger automated GitHub Actions to deploy to Cloudflare via `@opennextjs/cloudflare`. Run `pnpm lint` and `pnpm build` before pushing to ensure zero regressions.
