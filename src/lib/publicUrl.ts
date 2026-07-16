/** Resolve a path under `public/` with Vite/GitHub Pages base. */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const clean = path.replace(/^\//, '')
  return `${base.endsWith('/') ? base : `${base}/`}${clean}`
}
