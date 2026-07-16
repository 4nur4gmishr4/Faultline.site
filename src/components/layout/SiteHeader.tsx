import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MARKETPLACE_URL } from '../../data/commands'
import { useTheme } from '../../hooks/useTheme'
import { VscodeIcon } from '../brand/VscodeIcon'

/** ≤5 primary items (skill: nav hierarchy). Version lives only in SpecBar. */
const topNav: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/docs', label: 'Docs' },
  { to: '/docs/security', label: 'Security' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="z-50 w-full shrink-0 border-b border-primary/85 bg-background/92 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
      <div className="flex h-12 w-full min-h-12 items-stretch">
        <Link
          to="/"
          className="flex min-h-12 shrink-0 items-center gap-2 border-r border-primary/85 px-4 text-mono-label font-semibold tracking-[0.16em] text-primary sm:px-5"
        >
          <VscodeIcon size={16} />
          FAULTLINE
        </Link>

        <nav className="hidden flex-1 md:flex" aria-label="Primary">
          {topNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'nav-link flex h-full min-h-12 items-center border-r border-primary/85 px-5 text-mono-label uppercase tracking-[0.12em]',
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-primary hover:bg-primary hover:text-on-primary',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle hidden sm:inline-flex"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>

        <a
          href={MARKETPLACE_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-auto hidden h-full min-h-12 items-center gap-2 border-l border-primary/85 bg-signal px-5 text-mono-label font-semibold tracking-[0.14em] text-white transition-opacity duration-200 hover:opacity-90 sm:flex sm:ml-0 sm:px-6"
        >
          <VscodeIcon alt size={15} />
          Install
        </a>

        <button
          type="button"
          className="ml-auto flex h-full min-h-12 min-w-12 items-center justify-center border-l border-primary/85 px-5 text-mono-label tracking-[0.12em] text-primary md:hidden sm:ml-0"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="flex max-h-[min(70dvh,28rem)] flex-col overflow-y-auto border-t border-primary/85 md:hidden"
        >
          {topNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={Boolean(item.end)}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  'flex min-h-12 items-center border-b border-primary/85 px-5 py-4 text-mono-label uppercase tracking-[0.12em]',
                  isActive ? 'bg-primary text-on-primary' : 'text-primary',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/docs/changelog"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center border-b border-primary/85 px-5 py-4 text-mono-label uppercase tracking-[0.12em] text-primary"
          >
            Changelog
          </NavLink>
          <NavLink
            to="/credits"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center border-b border-primary/85 px-5 py-4 text-mono-label uppercase tracking-[0.12em] text-primary"
          >
            Credits
          </NavLink>
          <button
            type="button"
            className="flex min-h-12 w-full items-center border-b border-primary/85 px-5 py-4 text-left text-mono-label uppercase tracking-[0.12em] text-primary"
            onClick={() => {
              toggle()
              setOpen(false)
            }}
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <a
            href={MARKETPLACE_URL}
            className="flex min-h-12 items-center gap-2 bg-signal px-5 py-4 text-mono-label font-semibold tracking-[0.14em] text-white"
            onClick={() => setOpen(false)}
          >
            <VscodeIcon alt size={16} />
            Install
          </a>
        </div>
      )}
    </header>
  )
}
