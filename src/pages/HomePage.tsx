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
import { DOCS } from '../content/docs'
import { MARKETPLACE_URL } from '../data/commands'

/**
 * Home ownership map (no duplicated copy):
 * hero = pitch only · SpecBar = id/version · Capture = transcript ·
 * Defaults = privacy table · Install = paths · Palette = commands ·
 * Docs strip = titles only (descriptions live on /docs)
 */
export function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <section className="grid min-h-[calc(100dvh-3rem)] w-full grid-cols-1 border-b border-primary/85 max-[720px]:min-h-0 md:grid-cols-12">
        <div className="order-1 flex flex-col justify-center border-b border-primary/85 px-6 py-14 md:col-span-5 md:border-r md:border-b-0 md:px-12 md:py-20 lg:px-16 xl:px-20">
          <div className="max-w-[22rem]">
            <p className="icon-inline mb-7 text-mono-label uppercase tracking-[0.16em] text-secondary">
              <VscodeIcon size={16} />
              VS Code extension
            </p>
            <h1 className="text-display-xl mb-7 text-primary">
              Debugger and fault explainer for VS Code.
            </h1>
            <p className="text-body-lg mb-10 text-secondary">
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

        <div className="order-2 relative flex min-h-[min(58dvh,560px)] flex-col md:col-span-7 md:min-h-[calc(100dvh-3rem)]">
          <LaptopSceneLazy
            scrollLinked
            className="!min-h-full !h-full !border-0"
          />
          <p className="pointer-events-none absolute bottom-3 left-3 z-10 text-mono-label tracking-[0.1em] text-secondary md:bottom-4 md:left-4">
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
            className="flex flex-wrap gap-x-6 gap-y-3"
            aria-label="Documentation links"
          >
            {DOCS.map((d) => (
              <Link
                key={d.id}
                to={`/docs/${d.id}`}
                className="text-mono-label uppercase tracking-[0.1em] text-secondary transition-colors hover:text-signal"
              >
                {d.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  )
}
