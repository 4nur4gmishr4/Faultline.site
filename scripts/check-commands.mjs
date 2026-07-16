/**
 * Sanity-check site command titles against extension package.nls.json if present.
 * Usage: node scripts/check-commands.mjs [path-to-extension-package.nls.json]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const siteCommandsPath = path.join(__dirname, '../src/data/commands.ts')
const defaultNls = path.join(
  __dirname,
  '../../faultline/package.nls.json'
)
const nlsPath = process.argv[2] || defaultNls

const siteSrc = fs.readFileSync(siteCommandsPath, 'utf8')
const titles = [...siteSrc.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1])

if (!fs.existsSync(nlsPath)) {
  console.log('No package.nls.json at', nlsPath, '— site has', titles.length, 'commands.')
  process.exit(0)
}

const nls = JSON.parse(fs.readFileSync(nlsPath, 'utf8'))
const nlsTitles = Object.entries(nls)
  .filter(([k]) => k.startsWith('command.faultline.'))
  .map(([, v]) => v)

let missing = 0
for (const t of nlsTitles) {
  if (!titles.includes(t) && t !== 'Test Sound') {
    console.warn('Site missing command title:', t)
    missing++
  }
}
console.log(
  missing === 0
    ? `OK — ${titles.length} site commands vs ${nlsTitles.length} nls entries`
    : `WARN — ${missing} missing titles`
)
process.exit(missing ? 1 : 0)
