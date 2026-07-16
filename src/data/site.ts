/** Production site origin (GitHub Pages project site). Override via VITE_SITE_URL. */
export const SITE_ORIGIN =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
  'https://4nur4gmishr4.github.io/Faultline.site'

export const SITE_NAME = 'FaultLine'

// update when custom domain ships
