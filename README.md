# FaultLine Showcase

Marketing + documentation site for **FaultLine** (`4nur4gmishr4.fahh`).

**Intended live URL:**  
https://4nur4gmishr4.github.io/faultline-showcase/

## Stack

Vite · React · TypeScript · Tailwind · React Router · React Three Fiber · GSAP · Playwright

## Develop

```bash
npm install
npm run dev
npm run build
npm run test:e2e
```

## Deploy (GitHub Pages)

1. `gh auth login`
2. Create/push repo `faultline-showcase`
3. **Settings → Pages → Source: GitHub Actions**
4. CI builds with `VITE_BASE=/faultline-showcase/`

```bash
gh auth login
gh repo create faultline-showcase --public --source=. --remote=origin --push
```

## Design language

- Brutalist monochrome structure (0 radius, hard borders)
- Semantic accents only: **signal** (blue), **fault** (red), **warn** (amber), **safe** (green)
- No typewriter / marquee / scroll-stagger theater
- Product UI: fault capture panel, defaults matrix, install path, command palette
- 3D laptop: model keys, 95° lid, rotate only (no zoom)

## Credits / license

- FaultLine extension: Anurag Mishra, MIT  
- 3D laptop adapted from [Ksenia Kondrashova](https://codepen.io/ksenia-k/pen/gOEgyaj) (public CodePen → MIT).  
  See `src/components/laptop/LICENSE-ksenia-k-laptop.txt` and `/credits`.

## Docs

Embedded under `src/content/docs/` (structured pages, not runtime markdown fetch).  
Re-sync manually when the extension ships a release that changes user-facing docs.

## Commit style

Small local commits after every change. Never push unless asked.
