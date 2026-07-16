# FaultLine Showcase

Marketing + docs site for **FaultLine** (`4nur4gmishr4.fahh`).

**Branch:** `showcase` on [vscode-FaultLine-Extension](https://github.com/4nur4gmishr4/vscode-FaultLine-Extension)  
**Intended live URL:** https://4nur4gmishr4.github.io/faultline-showcase/

## Stack

Vite · React · TypeScript · Tailwind · React Router · R3F · GSAP · Playwright

## Develop

```bash
npm install
npm run dev
npm run build
npm run test:e2e
```

Requires Node ≥ 20.

## Deploy (GitHub Pages)

1. Repo/Pages source: this site (or monorepo `showcase` branch / `docs` folder — your choice)
2. Build with `VITE_BASE=/faultline-showcase/` for project Pages
3. CI: `.github/workflows/deploy.yml`

## Design

- Brutal monochrome UI (0 radius, hard borders)
- Sparse VS Code accent `#0078d4` (CTAs / focus)
- Fault red only for error samples
- Product sections: capture, defaults, install, palette
- 3D laptop: rotate-only, spring-back on release

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/docs`, `/docs/:id` | Docs |
| `/donate` | Support (UPI / bank / GitHub Sponsors) |
| `/credits` | Attribution |

## Credits

- Extension: Anurag Mishra, MIT  
- Laptop: [Ksenia Kondrashova](https://codepen.io/ksenia-k/pen/gOEgyaj) (MIT) — see `/credits`

## Docs content

Embedded under `src/content/docs/` (no runtime markdown fetch).
