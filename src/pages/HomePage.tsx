import { Link } from 'react-router-dom'
import { LaptopSceneLazy } from '../components/laptop/LaptopSceneLazy'
import { VscodeIcon } from '../components/brand/VscodeIcon'
import {
  CommandPalette,
  DefaultsMatrix,
  FaultSample,
  InstallPath,
  SpecBar,
} from '../components/product'
import { HERO_LINE, TypewriterLine } from '../components/product/TypewriterLine'
import { DOCS } from '../content/docs'
import { MARKETPLACE_URL } from '../data/commands'

/**
 * Home ownership map (no duplicated copy):
 * hero = pitch only · SpecBar = id/version · Capture = transcript ·
 * Defaults = privacy table · Install = paths · Palette = commands ·
 * Docs strip = titles only · End CTA = action only (no re-pitch)
 */
export function HomePage() {
  return (
    <div className="flex w-full min-w-0 flex-col">
      <section className="grid w-full min-w-0 grid-cols-1 border-b border-primary/85 md:min-h-[calc(100dvh-var(--header-h))] md:grid-cols-12">
        <div className="order-1 flex min-w-0 flex-col justify-center border-b border-primary/85 px-5 py-10 md:col-span-5 md:border-r md:border-b-0 md:px-12 md:py-20 lg:px-16 xl:px-20">
          <div className="w-full max-w-[22rem] min-w-0">
            <p className="icon-inline mb-5 text-mono-label uppercase tracking-[0.16em] text-secondary md:mb-7">
              <VscodeIcon size={16} />
              VS Code extension
            </p>
            <h1
              className="text-display-xl mb-5 text-primary md:mb-7"
              aria-label={HERO_LINE}
            >
              <TypewriterLine text={HERO_LINE} />
            </h1>
            <p className="text-body-lg mb-8 text-secondary md:mb-10">
              Understand terminal and task failures first. Optional sounds and
              notifications second.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noreferrer"
                className="brutal-btn brutal-btn-solid w-full sm:w-auto"
              >
                Install
              </a>
              <Link to="/docs" className="brutal-btn w-full sm:w-auto">
                Documentation
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-laptop order-2 md:col-span-7">
          <LaptopSceneLazy
            scrollLinked
            className="!h-full !min-h-0 !max-h-none !border-0 md:!min-h-full"
          />
          <p className="pointer-events-none absolute bottom-2 left-2 z-10 max-w-[calc(100%-1rem)] text-mono-label tracking-[0.1em] text-secondary md:bottom-4 md:left-4">
            Drag to rotate
          </p>
        </div>
      </section>

      <SpecBar />
      <FaultSample />
      <DefaultsMatrix />
      <InstallPath />
      <CommandPalette />

      <section className="section-pad border-b border-primary/85">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="max-w-md min-w-0">
            <p className="mb-3 text-mono-label uppercase tracking-[0.14em] text-secondary">
              Docs
            </p>
            <h2 className="text-headline-lg text-primary">Full reference</h2>
          </div>
          <nav
            className="flex flex-wrap gap-x-4 gap-y-1"
            aria-label="Documentation links"
          >
            {DOCS.map((d) => (
              <Link
                key={d.id}
                to={`/docs/${d.id}`}
                className="inline-flex min-h-11 items-center text-mono-label uppercase tracking-[0.1em] text-secondary transition-colors hover:text-signal"
              >
                {d.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section
        className="section-pad border-b border-primary/85"
        aria-labelledby="end-cta-title"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <h2 id="end-cta-title" className="text-headline-lg text-primary">
            Install FaultLine
          </h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <a
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noreferrer"
              className="brutal-btn brutal-btn-solid w-full sm:w-auto"
            >
              <VscodeIcon size={16} />
              Install
            </a>
            <Link to="/docs" className="brutal-btn w-full sm:w-auto">
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
