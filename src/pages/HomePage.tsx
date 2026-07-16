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
    <div className="flex w-full flex-col">
      <section className="grid min-h-[calc(100dvh-3rem)] w-full grid-cols-1 border-b border-primary/85 max-[720px]:min-h-0 md:grid-cols-12">
        <div className="order-1 flex flex-col justify-center border-b border-primary/85 px-6 py-12 md:col-span-4 md:border-r md:border-b-0 md:px-8 md:py-16 lg:px-12 xl:px-14">
          <div className="w-full max-w-none">
            <p className="icon-inline mb-7 text-mono-label uppercase tracking-[0.16em] text-secondary">
              <VscodeIcon size={16} />
              VS Code extension
            </p>
            <h1
              className="text-display-xl mb-7 text-primary"
              aria-label={HERO_LINE}
            >
              <TypewriterLine text={HERO_LINE} />
            </h1>
            <p className="text-body-lg mb-10 max-w-md text-secondary">
              Understand terminal and task failures first. Optional sounds and
              notifications second.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noreferrer"
                className="brutal-btn brutal-btn-solid"
              >
                Install
              </a>
              <Link to="/docs" className="brutal-btn">
                Documentation
              </Link>
            </div>
          </div>
        </div>

        <div className="order-2 relative flex min-h-[min(58dvh,560px)] w-full flex-col md:col-span-8 md:min-h-[calc(100dvh-3rem)]">
          <LaptopSceneLazy
            scrollLinked
            className="!min-h-full !h-full !w-full !border-0"
          />
          <p className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] text-mono-label tracking-[0.1em] text-secondary md:bottom-4 md:left-4">
            Drag to rotate · lid opens 95°
          </p>
        </div>
      </section>

      <SpecBar />
      <FaultSample />
      <DefaultsMatrix />
      <InstallPath />
      <CommandPalette />

      <section className="border-b border-primary/85 px-6 py-14 md:px-12 md:py-16 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <p className="mb-3 text-mono-label uppercase tracking-[0.14em] text-secondary">
              Docs
            </p>
            <h2 className="text-headline-lg text-primary">Full reference</h2>
          </div>
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2"
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

      {/* Closing install only — no marketing copy (hero owns the pitch) */}
      <section
        className="border-b border-primary/85 px-6 py-14 md:px-12 md:py-16 lg:px-16"
        aria-labelledby="end-cta-title"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="end-cta-title" className="text-headline-lg text-primary">
            Install FaultLine
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noreferrer"
              className="brutal-btn brutal-btn-solid"
            >
              <VscodeIcon size={16} />
              Install
            </a>
            <Link to="/docs" className="brutal-btn">
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
