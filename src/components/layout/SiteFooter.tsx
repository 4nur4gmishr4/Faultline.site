import { Link } from 'react-router-dom'
import { GITHUB_URL, LICENSE_URL, MARKETPLACE_URL } from '../../data/commands'

/**
 * Secondary links live here — not in the primary nav.
 * Nav keeps only Home + Docs; everything else is footer.
 */
const FOOTER_LINKS: { to?: string; href?: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/docs', label: 'Docs' },
  { to: '/docs/security', label: 'Security' },
  { to: '/docs/changelog', label: 'Changelog' },
  { to: '/donate', label: 'Donate' },
  { to: '/credits', label: 'Credits' },
  { href: MARKETPLACE_URL, label: 'Marketplace' },
  { href: GITHUB_URL, label: 'GitHub' },
  { href: LICENSE_URL, label: 'License' },
]

export function SiteFooter() {
  return (
    <footer className="w-full max-w-full shrink-0 border-t border-primary/85 bg-background pb-[env(safe-area-inset-bottom,0px)]">
      <div className="section-pad flex w-full min-w-0 flex-col gap-8 md:gap-11">
        <p className="text-footer-slogan max-w-3xl uppercase text-primary">
          When it breaks, keep the fault.
        </p>
        <nav
          className="flex max-w-full flex-wrap gap-x-6 gap-y-2 md:gap-x-9 md:gap-y-4"
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
        <div className="flex flex-col gap-3 border-t border-primary/15 pt-6 text-mono-code text-secondary md:flex-row md:items-start md:justify-between md:pt-9">
          <span>Anurag Mishra · MIT</span>
        </div>
      </div>
    </footer>
  )
}
