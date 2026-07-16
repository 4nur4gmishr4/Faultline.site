import { Link } from 'react-router-dom'
import {
  EXTENSION_ID,
  GITHUB_URL,
  LICENSE_URL,
  MARKETPLACE_URL,
} from '../../data/commands'

const FOOTER_LINKS: { to?: string; href?: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/docs', label: 'Docs' },
  { to: '/docs/security', label: 'Security' },
  { to: '/docs/changelog', label: 'Changelog' },
  { href: MARKETPLACE_URL, label: 'Marketplace' },
  { href: GITHUB_URL, label: 'GitHub' },
  { href: LICENSE_URL, label: 'License' },
  { to: '/credits', label: 'Credits' },
]

export function SiteFooter() {
  return (
    <footer className="w-full shrink-0 border-t border-white/85 bg-background">
      <div className="flex w-full flex-col gap-11 px-6 py-14 md:px-12 md:py-20 lg:px-16">
        <p className="text-footer-slogan max-w-3xl uppercase text-primary">
          When it breaks, <span className="text-fault">keep the fault</span>.
        </p>
        <nav
          className="flex flex-wrap gap-x-9 gap-y-4"
          aria-label="Footer"
        >
          {FOOTER_LINKS.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="inline-flex min-h-11 items-center text-mono-label uppercase tracking-[0.12em] text-secondary transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-mono-label uppercase tracking-[0.12em] text-secondary transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </a>
            )
          )}
        </nav>
        <div className="flex flex-col gap-3 border-t border-white/15 pt-9 text-mono-code text-secondary md:flex-row md:items-start md:justify-between">
          <span>Anurag Mishra</span>
          <span className="max-w-md md:text-right">
            {EXTENSION_ID} · MIT ·{' '}
            <Link to="/credits" className="text-signal underline-offset-2 hover:underline">
              Credits
            </Link>
            {' · '}
            3D laptop by Ksenia Kondrashova (MIT)
          </span>
        </div>
      </div>
    </footer>
  )
}
