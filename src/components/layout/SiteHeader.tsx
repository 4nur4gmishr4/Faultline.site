import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MARKETPLACE_URL, VERSION } from '../../data/commands'

/** ≤5 primary items (skill: nav hierarchy). */
const topNav: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/docs', label: 'Docs' },
  { to: '/docs/security', label: 'Security' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="z-50 w-full shrink-0 border-b border-white/85 bg-background/92 backdrop-blur-xl">
      <div className="flex h-12 w-full items-stretch">
        <Link
          to="/"
          className="flex min-h-11 shrink-0 items-center border-r border-white/85 bg-signal px-5 text-mono-label font-semibold tracking-[0.16em] text-on-primary"
        >
          FAULTLINE
          <span className="ml-2.5 hidden font-normal tracking-[0.08em] opacity-70 sm:inline">
            {VERSION}
          </span>
        </Link>

        <nav className="hidden flex-1 md:flex" aria-label="Primary">
          {topNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'nav-link flex h-full min-h-11 items-center border-r border-white/85 px-5 text-mono-label uppercase tracking-[0.12em]',
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-primary hover:bg-white hover:text-black',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={MARKETPLACE_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-auto hidden h-full min-h-11 items-center border-l border-white/85 bg-signal px-7 text-mono-label font-semibold tracking-[0.14em] text-on-primary transition-opacity duration-200 hover:opacity-90 sm:flex"
        >
          Install
        </a>

        <button
          type="button"
          className="ml-auto flex h-full min-h-11 min-w-12 items-center justify-center border-l border-white/85 px-5 text-mono-label tracking-[0.12em] text-primary md:hidden sm:ml-0"
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
          className="flex max-h-[min(70dvh,28rem)] flex-col overflow-y-auto border-t border-white/85 md:hidden"
        >
          {topNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={Boolean(item.end)}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  'flex min-h-12 items-center border-b border-white/85 px-5 py-4 text-mono-label uppercase tracking-[0.12em]',
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
            className="flex min-h-12 items-center border-b border-white/85 px-5 py-4 text-mono-label uppercase tracking-[0.12em] text-primary"
          >
            Changelog
          </NavLink>
          <NavLink
            to="/credits"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center border-b border-white/85 px-5 py-4 text-mono-label uppercase tracking-[0.12em] text-primary"
          >
            Credits
          </NavLink>
          <a
            href={MARKETPLACE_URL}
            className="flex min-h-12 items-center bg-signal px-5 py-4 text-mono-label font-semibold tracking-[0.14em] text-on-primary"
            onClick={() => setOpen(false)}
          >
            Install
          </a>
        </div>
      )}
    </header>
  )
}
