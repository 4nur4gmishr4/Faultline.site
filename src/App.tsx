import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteShell } from './components/layout/SiteShell'
import { HomePage } from './pages/HomePage'
import { DocsIndexPage } from './pages/DocsIndexPage'
import { DocPage } from './pages/DocPage'
import { CreditsPage } from './pages/CreditsPage'
import { DonatePage } from './pages/DonatePage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Site routes: home + embedded docs + credits (embedded structured content).
 */
/** Vite BASE_URL is `/` or `/faultline-showcase/` — Router basename has no trailing slash. */
const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route path="docs" element={<DocsIndexPage />} />
          <Route path="docs/:docId" element={<DocPage />} />
          {/* Friendly redirects for old paths */}
          <Route path="features" element={<Navigate to="/docs/readme" replace />} />
          <Route path="install" element={<Navigate to="/docs/readme" replace />} />
          <Route path="security" element={<Navigate to="/docs/security" replace />} />
          <Route path="changelog" element={<Navigate to="/docs/changelog" replace />} />
          <Route path="architecture" element={<Navigate to="/docs/architecture" replace />} />
          <Route path="contributing" element={<Navigate to="/docs/contributing" replace />} />
          <Route path="troubleshooting" element={<Navigate to="/docs/troubleshooting" replace />} />
          <Route path="license" element={<Navigate to="/docs/license" replace />} />
          <Route path="press" element={<Navigate to="/docs/readme" replace />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
