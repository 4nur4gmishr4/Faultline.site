# FaultLine Showcase — Design System Master

**Locked.** Do not re-run generic palette generators (green/glass/slate) for this project.
Future `/ui-ux-pro-max` work must follow this file.

## Product

- VS Code extension marketing site for **FaultLine** (`4nur4gmishr4.fahh` v3.5.0)
- Audience: developers installing a terminal/task debugger + fault explainer
- Stack: Vite · React · TypeScript · Tailwind 4 · R3F · GSAP · React Router · Playwright

## Style (locked)

| Dial | Value | Meaning |
|------|-------|---------|
| Variance | 7 | Brutal mono grid, zero radius, not soft SaaS |
| Motion | 3 | Product lid + hover only — no page theater |
| Density | 5 | Marketing spacing, scannable sections |

- **Language:** monochrome brutalist, zero border-radius
- **Not allowed:** glassmorphism, neon, green “run” accents, typewriter, marquee, scroll-reveal walls, emoji icons

## Color

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| background | `#000000` | `#ffffff` | Page |
| primary | `#ffffff` | `#000000` | Headings, borders (via primary) |
| secondary | `#b0b0b0` | `#4a4a4a` | Body muted, labels (≥4.5:1) |
| signal | `#0078d4` | `#0078d4` | Solid CTAs, focus ring, link hover only |
| fault | `#f14c4c` | `#c50f1f` | Capture sample **error line only** |

**Accent budget:** signal = CTAs + focus + sparse links. Never flood labels/chips/section chrome with blue.

## Typography

- Display: Space Grotesk
- Body: IBM Plex Sans
- Mono / UI chrome: IBM Plex Mono
- Body ≥16px scale via `.text-body-*`; mono labels small but high contrast

## Content ownership (no duplicacy)

| Owner | Owns |
|-------|------|
| Hero | Pitch + primary CTAs |
| SpecBar | Version, extension id, engines, license |
| FaultSample | Failure transcript only |
| DefaultsMatrix | Privacy defaults table |
| InstallPath | Marketplace + VSIX paths |
| CommandPalette | Command list + local filter |
| Docs strip | Titles only (descriptions on `/docs`) |
| End CTA | Install action only — no re-pitch |
| Credits page | Attribution only — no product pitch |
| Footer | Slogan once; Credits once in meta row |

## Navigation

- Primary: Home · Docs · Security (≤5)
- Install: header solid signal + hero + end CTA + install section detail
- Mobile: menu drawer; Install in drawer on small screens

## Interaction / a11y

- Touch targets ≥44×44px
- Visible `:focus-visible` with signal outline
- `prefers-reduced-motion` kills decorative transitions
- Skip link to `#main`
- Safe-area insets on header top + footer bottom
- Cursor pointer on interactive controls
- Light + dark both first-class (theme toggle)

## Motion

- Laptop lid: open angle π/2 − 95°, rotate-only, no auto-rotate / float
- GSAP only for product-meaningful motion
- No scroll-jacking marketing animations

## Landing spine

1. Hero (value + Install)
2. SpecBar
3. Capture proof
4. Defaults
5. Install paths
6. Command palette
7. Docs titles
8. End Install CTA
9. Footer

## Anti-patterns

- Repeating version/id outside SpecBar
- Chip-signal on every table cell
- Full VS Code editor gray theme as page background
- Doc card descriptions on home
- Pushing to remote without explicit user ask

## Checklist before UI ship

- [ ] Contrast AA light + dark
- [ ] 375px no horizontal scroll
- [ ] Reduced motion OK
- [ ] No new accent colors
- [ ] No duplicated marketing sentences across sections
- [ ] e2e green
- [ ] No push unless asked
