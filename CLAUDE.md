@AGENTS.md

# Tools Site Developer & Agent Guide

## Quick References
- **Design System & Tokens**: [`docs/DESIGN.md`](file:///e:/Framework/tools-site/docs/DESIGN.md)
- **Theme Mechanics (5 Themes + Auto)**: [`docs/THEME-TOGGLE.md`](file:///e:/Framework/tools-site/docs/THEME-TOGGLE.md)
- **Google Veo 3.0 Generation Guide**: [`docs/VEO-VIDEO-GENERATION.md`](file:///e:/Framework/tools-site/docs/VEO-VIDEO-GENERATION.md)
- **Roadmap & Phase Status**: [`PLAN.md`](file:///e:/Framework/tools-site/PLAN.md)

## Core Architecture Guidelines
1. **Zero-Upload Local Privacy**: All 39 document & image tools process entirely client-side inside the browser using WebAssembly, Canvas, and `pdf-lib` / `pdfjs-dist`. Nothing is uploaded to a remote server.
2. **Animation Over Video**: Use pure CSS/SVG/Canvas micro-animations and Motion 3D transforms (`InteractiveGlassFilm`) instead of pre-rendered `.mp4` video files to maintain 60+ FPS scroll scrubbing and zero bundle bloat.
3. **Google Analytics**: Web stream `G-L1D7SPN13Y` handles cross-subdomain analytics across `inerate.com`, `tools.inerate.com`, and `forge.inerate.com`.
4. **Deployments**: Pushes to `master` trigger automated GitHub Actions to deploy to Cloudflare via `@opennextjs/cloudflare`.
