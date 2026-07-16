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

**Live:** https://4nur4gmishr4.github.io/Faultline.site/

### One-time setup (required if deploy fails with 404)
1. Open https://github.com/4nur4gmishr4/Faultline.site/settings/pages  
2. **Build and deployment → Source → GitHub Actions**  
3. Re-run **Actions → Deploy site**

Push to `main` runs `.github/workflows/deploy.yml` with `VITE_BASE=/Faultline.site/`.

The workflow tries to create the Pages site via API if missing; org policies may still require the Settings click above.

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
