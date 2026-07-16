# FaultLine Showcase

Marketing + docs site for **FaultLine** (`4nur4gmishr4.fahh`).

**Repo:** [4nur4gmishr4/Faultline.site](https://github.com/4nur4gmishr4/Faultline.site)  
**Live URL:** https://4nur4gmishr4.github.io/Faultline.site/

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

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Push to `main` runs `.github/workflows/deploy.yml`
3. Build uses `VITE_BASE=/Faultline.site/` (project site path)
4. Optional custom domain later → set `VITE_BASE=/` and update `SITE_ORIGIN`

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
