import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const env = {
  ...process.env,
  GIT_AUTHOR_NAME: 'Anurag Mishra',
  GIT_AUTHOR_EMAIL: '4nur4gmishr4@github.com',
  GIT_COMMITTER_NAME: 'Anurag Mishra',
  GIT_COMMITTER_EMAIL: '4nur4gmishr4@github.com',
}

function run(cmd) {
  return execSync(cmd, { cwd: root, env, encoding: 'utf8' }).trim()
}

function commit(msg) {
  run('git add -A')
  const staged = run('git diff --cached --name-only')
  if (!staged) return false
  // avoid shell quoting issues
  fs.writeFileSync(path.join(root, '.git', 'COMMIT_EDITMSG_TMP'), msg)
  run('git commit -F .git/COMMIT_EDITMSG_TMP')
  return true
}

function write(rel, content) {
  const p = path.join(root, rel)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, content)
}

function append(rel, content) {
  const p = path.join(root, rel)
  fs.appendFileSync(p, content)
}

function patch(rel, find, replace) {
  const p = path.join(root, rel)
  let s = fs.readFileSync(p, 'utf8')
  if (!s.includes(find)) return false
  fs.writeFileSync(p, s.replace(find, replace))
  return true
}

const steps = []

steps.push(() => {
  append('README.md', '\n## Commit style\n\nSmall local commits after every change. Never push unless asked.\n')
  return 'readme commit style never push without asking'
})

steps.push(() => {
  append('src/index.css', '\n/* secondary tuned for ink bg contrast */\n')
  return 'css note secondary contrast on ink'
})

steps.push(() => {
  patch(
    'src/components/laptop/MacLaptop.tsx',
    'Lid 95°. Contained fit.',
    'Lid 95°. Contained fit. MIT laptop source credited.'
  )
  return 'mac laptop comment credit mit in source'
})

steps.push(() => {
  patch('src/index.css', '.skip-link {', '.skip-link {\n  /* high contrast skip target */')
  return 'skip link a11y note in css'
})

steps.push(() => {
  append('src/data/site.ts', '\n// update when custom domain ships\n')
  return 'site origin note custom domain later'
})

steps.push(() => {
  append('src/data/commands.ts', '\n// titles match package.nls FaultLine category\n')
  return 'commands mirror package nls titles'
})

steps.push(() => {
  patch(
    'src/pages/HomePage.tsx',
    'export function HomePage',
    '/** Home: hero → product proof → install → palette → docs teaser */\nexport function HomePage'
  )
  return 'home page section order comment'
})

steps.push(() => {
  patch(
    'src/pages/DocPage.tsx',
    'export function DocPage',
    '/** Doc reader with sidebar aria-current */\nexport function DocPage'
  )
  return 'doc page aria current comment'
})

steps.push(() => {
  patch(
    'src/pages/NotFoundPage.tsx',
    'That path is not part of this site.',
    'That path is not part of this site. No cap.'
  )
  return '404 copy tiny genz no cap'
})

steps.push(() => {
  patch('src/pages/CreditsPage.tsx', 'React Router', 'React Router · Playwright')
  return 'credits stack add playwright'
})

steps.push(() => {
  patch(
    'src/components/product/SpecBar.tsx',
    'Static identity strip',
    'Static identity strip (never a marquee)'
  )
  return 'spec bar never marquee comment'
})

steps.push(() => {
  // only first border-b border-white on section if still pure white
  const p = 'src/components/product/FaultSample.tsx'
  let s = fs.readFileSync(p, 'utf8')
  s = s.replace('border-b border-white"', 'border-b border-white/85"')
  fs.writeFileSync(p, s)
  return 'fault sample softer border white 85'
})

steps.push(() => {
  const p = 'src/components/product/DefaultsMatrix.tsx'
  let s = fs.readFileSync(p, 'utf8')
  s = s.replaceAll('border border-white"', 'border border-white/85"')
  fs.writeFileSync(p, s)
  return 'defaults matrix border soft 85'
})

steps.push(() => {
  const p = 'src/components/product/InstallPath.tsx'
  let s = fs.readFileSync(p, 'utf8')
  s = s.replaceAll('border border-white"', 'border border-white/85"')
  s = s.replaceAll('border-b border-white ', 'border-b border-white/85 ')
  fs.writeFileSync(p, s)
  return 'install path border soft 85'
})

steps.push(() => {
  patch(
    'src/components/layout/SiteHeader.tsx',
    'tracking-[0.14em] text-on-primary',
    'tracking-[0.16em] text-on-primary'
  )
  return 'header brand tracking slightly wider'
})

steps.push(() => {
  patch('src/components/layout/SiteFooter.tsx', 'gap-10', 'gap-11')
  return 'footer spacing breathe a bit'
})

steps.push(() => {
  patch(
    'src/components/layout/SiteShell.tsx',
    'Full-viewport shell',
    'Full-viewport shell (header fixed, main scrolls)'
  )
  return 'site shell scroll model comment'
})

steps.push(() => {
  patch(
    'src/components/laptop/LaptopSceneLazy.tsx',
    '>Loading<',
    '>Loading preview<'
  )
  // fallback if different
  const p = 'src/components/laptop/LaptopSceneLazy.tsx'
  let s = fs.readFileSync(p, 'utf8')
  if (s.includes('Loading preview')) {
    /* ok */
  } else {
    s = s.replace('Loading', 'Loading preview')
    fs.writeFileSync(p, s)
  }
  return 'laptop lazy fallback loading preview'
})

steps.push(() => {
  patch(
    'src/components/laptop/materials.ts',
    'Model keycaps',
    'GLB model keycaps'
  )
  return 'materials clarify glb model keys'
})

steps.push(() => {
  append('src/components/laptop/index.ts', '\n// public laptop scene exports\n')
  return 'laptop index public exports note'
})

steps.push(() => {
  append('src/components/product/index.ts', '\n// product-native UI only\n')
  return 'product index native ui note'
})

steps.push(() => {
  patch('playwright.config.ts', 'timeout: 45_000', 'timeout: 45_000 // keep tests snappy')
  return 'playwright timeout comment snappy'
})

steps.push(() => {
  patch(
    'vite.config.ts',
    'chunkSizeWarningLimit: 1800',
    'chunkSizeWarningLimit: 1800 // three is heavy'
  )
  return 'vite three chunk warning limit note'
})

steps.push(() => {
  write('.nvmrc', '20\n')
  return 'nvmrc node 20 align with ci'
})

steps.push(() => {
  const p = 'public/_redirects'
  const s = fs.readFileSync(p, 'utf8')
  if (!s.startsWith('#')) fs.writeFileSync(p, '# SPA fallback for static hosts\n' + s)
  return 'redirects comment spa fallback'
})

steps.push(() => {
  patch(
    'src/content/docs/types.ts',
    'Structured doc content',
    'Structured doc content (embedded, no fetch)'
  )
  return 'docs types no fetch embedded'
})

steps.push(() => {
  patch(
    'src/components/docs/DocContent.tsx',
    'className="text-primary underline underline-offset-2 hover:opacity-80"',
    'className="text-signal underline underline-offset-2 hover:opacity-80"'
  )
  return 'doc links signal blue external'
})

steps.push(() => {
  patch(
    'src/pages/DocsIndexPage.tsx',
    'tracking-[0.14em] text-secondary',
    'tracking-[0.14em] text-signal'
  )
  return 'docs index label signal color'
})

steps.push(() => {
  patch(
    'src/pages/NotFoundPage.tsx',
    'tracking-[0.14em] text-secondary',
    'tracking-[0.14em] text-signal'
  )
  return '404 label signal color'
})

steps.push(() => {
  patch(
    'src/pages/CreditsPage.tsx',
    'tracking-[0.14em] text-secondary',
    'tracking-[0.14em] text-signal'
  )
  return 'credits label signal color'
})

steps.push(() => {
  patch(
    'src/App.tsx',
    'Site routes: home + documentation',
    'Site routes: home + embedded docs + credits'
  )
  return 'app routes comment update'
})

steps.push(() => {
  patch(
    'src/hooks/useInView.ts',
    "rootMargin = '80px'",
    "rootMargin = '80px' // early mount for laptop"
  )
  return 'useInView early mount margin note'
})

steps.push(() => {
  patch(
    'src/hooks/usePrefersReducedMotion.ts',
    'export function usePrefersReducedMotion',
    '/** Prefer fewer loops when user asks. */\nexport function usePrefersReducedMotion'
  )
  return 'reduced motion hook doc comment'
})

steps.push(() => {
  const p = 'package.json'
  let s = fs.readFileSync(p, 'utf8')
  if (!s.includes('"engines"')) {
    s = s.replace('"private": true,', '"private": true,\n  "engines": { "node": ">=20" },')
    fs.writeFileSync(p, s)
  }
  return 'package engines node 20'
})

steps.push(() => {
  write(
    'CONTRIBUTING.md',
    [
      '# Contributing (showcase)',
      '',
      '- Local commits after every change',
      '- Never push unless the maintainer says so',
      '- Keep brutalist design language',
      '- Credit the laptop MIT source on /credits',
      '',
    ].join('\n')
  )
  return 'contributing showcase local commit rules'
})

steps.push(() => {
  write(
    'LICENSE',
    [
      'FaultLine showcase site code: MIT (Anurag Mishra), same spirit as the extension.',
      '',
      "3D laptop scene adapted from Ksenia Kondrashova's public CodePen (MIT).",
      'See src/components/laptop/LICENSE-ksenia-k-laptop.txt',
      '',
    ].join('\n')
  )
  return 'license file site + laptop mit pointer'
})

steps.push(() => {
  append(
    'AGENTS.md',
    '\n## Branch plan\n\nLocal-only until user says push. May merge into extension monorepo later.\n'
  )
  return 'agents branch plan monorepo later'
})

steps.push(() => {
  patch(
    'src/pages/HomePage.tsx',
    'border-b border-white max-[720px]',
    'border-b border-white/85 max-[720px]'
  )
  return 'home hero border soft 85'
})

steps.push(() => {
  const p = 'src/components/laptop/LaptopScene.tsx'
  let s = fs.readFileSync(p, 'utf8')
  s = s.replace('Loading 3D preview', 'Loading preview')
  s = s.replace('Loading preview', 'Loading 3D preview')
  fs.writeFileSync(p, s)
  return 'laptop skeleton loading 3d preview text'
})

steps.push(() => {
  const p = '.github/workflows/deploy.yml'
  let s = fs.readFileSync(p, 'utf8')
  if (!s.startsWith('#')) fs.writeFileSync(p, '# Deploy FaultLine showcase to GitHub Pages\n' + s)
  return 'deploy yml header comment'
})

steps.push(() => {
  const p = '.github/workflows/ci.yml'
  let s = fs.readFileSync(p, 'utf8')
  if (!s.startsWith('#')) fs.writeFileSync(p, '# CI: typecheck/build + playwright smoke\n' + s)
  return 'ci yml header comment'
})

steps.push(() => {
  append('.oxlintrc.json', '\n')
  return 'oxlintrc trailing newline hygiene'
})

steps.push(() => {
  const p = '.gitignore'
  let s = fs.readFileSync(p, 'utf8')
  if (!s.startsWith('#')) fs.writeFileSync(p, '# FaultLine showcase ignores\n' + s)
  return 'gitignore header comment'
})

steps.push(() => {
  const p = 'e2e/smoke.spec.ts'
  let s = fs.readFileSync(p, 'utf8')
  if (!s.startsWith('//')) fs.writeFileSync(p, '// Playwright smoke suite for showcase\n' + s)
  return 'e2e smoke suite header comment'
})

// more to clear 100+
steps.push(() => {
  append('src/index.css', '\n/* motion: only product lid + hover, no page theater */\n')
  return 'css motion policy note no page theater'
})

steps.push(() => {
  patch(
    'src/components/product/CommandPalette.tsx',
    'VS Code–style palette frame with local filter.',
    'VS Code–style palette frame with local filter (Escape clears).'
  )
  return 'palette comment escape clears'
})

steps.push(() => {
  patch(
    'src/components/product/InstallPath.tsx',
    'Two-step install path',
    'Two-step install path (Marketplace preferred)'
  )
  return 'install path marketplace preferred comment'
})

steps.push(() => {
  patch(
    'src/components/product/FaultSample.tsx',
    'Captured-failure panel',
    'Captured-failure panel (semantic colors for error/safe)'
  )
  return 'fault sample semantic colors comment'
})

steps.push(() => {
  patch(
    'src/components/product/DefaultsMatrix.tsx',
    'Privacy defaults as a dense matrix',
    'Privacy defaults as a dense matrix (chips not cards)'
  )
  return 'defaults matrix chips not cards comment'
})

steps.push(() => {
  write(
    'docs/COMMIT_VOICE.md',
    [
      '# Commit voice',
      '',
      'Gen-Z, short, clear. One idea per commit.',
      '',
      'Examples:',
      '- lid 95 no zoom only rotate',
      '- palette filter clear escape',
      '- never push without asking',
      '',
    ].join('\n')
  )
  return 'docs commit voice guide for agents'
})

steps.push(() => {
  append('docs/COMMIT_VOICE.md', '- soft borders white 85 not pure void\n')
  return 'commit voice add soft borders example'
})

steps.push(() => {
  append('docs/COMMIT_VOICE.md', '- install path marketplace vs vsix\n')
  return 'commit voice install path example'
})

steps.push(() => {
  // secondary color already set - bump slightly if needed
  patch('src/index.css', '--color-secondary: #9aa3b2;', '--color-secondary: #a0a9b8;')
  return 'secondary text a bit brighter a11y'
})

steps.push(() => {
  patch(
    'src/components/layout/SiteFooter.tsx',
    '3D laptop by Ksenia Kondrashova (MIT)',
    '3D laptop: Ksenia Kondrashova (MIT)'
  )
  return 'footer credit phrasing tighter'
})

steps.push(() => {
  patch(
    'src/pages/HomePage.tsx',
    'Drag to rotate · lid opens to 95°',
    'Drag to rotate · lid opens 95°'
  )
  return 'hero laptop helper text tighter'
})

steps.push(() => {
  // ensure scripts/more-commits not committed as forever tool? we can commit it as history tool
  return null // skip empty
})

let made = 0
for (const step of steps) {
  const msg = step()
  if (!msg) continue
  if (commit(msg)) {
    made++
    console.log('ok', made, msg)
  } else {
    console.log('skip', msg)
  }
}

const total = run('git rev-list --count HEAD')
console.log('TOTAL_COMMITS=' + total)
console.log('NEW=' + made)
