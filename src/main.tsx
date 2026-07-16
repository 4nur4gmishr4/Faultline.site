import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initThemeFromStorage } from './hooks/useTheme'

// Theme before paint (light/dark)
initThemeFromStorage()

// GitHub Pages SPA: 404.html stashes path then lands on base
const spaRedirect = sessionStorage.getItem('fl_spa_redirect')
if (spaRedirect) {
  sessionStorage.removeItem('fl_spa_redirect')
  const base = import.meta.env.BASE_URL || '/'
  const normalized =
    spaRedirect.startsWith(base) || base === '/'
      ? spaRedirect
      : `${base.replace(/\/$/, '')}${spaRedirect.startsWith('/') ? spaRedirect : `/${spaRedirect}`}`
  if (normalized !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(null, '', normalized)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
