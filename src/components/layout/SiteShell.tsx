import { Outlet } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

/**
 * Full-viewport shell: header fixed, main + footer scroll as one document.
 * Footer only appears after content (end of page), not pinned over the hero.
 */
export function SiteShell() {
  return (
    <div className="flex h-dvh min-h-dvh w-full flex-col bg-background text-on-surface">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <div
        id="main"
        className="min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden"
        tabIndex={-1}
        role="main"
      >
        <Outlet />
        <SiteFooter />
      </div>
    </div>
  )
}
