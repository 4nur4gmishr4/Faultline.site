import { Link } from 'react-router-dom'
import { LaptopSceneLazy } from '../components/laptop/LaptopSceneLazy'
import {
  CommandPalette,
  DefaultsMatrix,
  FaultSample,
  InstallPath,
  SpecBar,
} from '../components/product'
import { DOCS } from '../content/docs'
import { GITHUB_URL, MARKETPLACE_URL } from '../data/commands'

/** Home teaser — full catalog lives on /docs. */
const DOC_TEASER = DOCS.slice(0, 6)

/** Home: hero → product proof → install → palette → docs teaser */
export function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <section className="grid min-h-[calc(100dvh-3rem)] w-full grid-cols-1 border-b border-white/85 max-[720px]:min-h-0 md:grid-cols-12">
        <div className="order-1 flex flex-col justify-center border-b border-white/85 px-6 py-14 md:col-span-5 md:border-r md:border-b-0 md:px-12 md:py-20 lg:px-16 xl:px-20">
          <div className="max-w-[22rem]">
            <p className="mb-7 text-mono-label uppercase tracking-[0.16em] text-signal">
              VS Code extension
            </p>
            <h1 className="text-display-xl mb-7 text-primary">
              Debugger and fault explainer for VS Code.
            </h1>
            <p className="text-body-lg mb-5 text-secondary">
              Understand terminal and task failures first. Optional sounds and
              notifications second.
            </p>
            <p className="text-body-md mb-11 text-secondary">
              By Anurag Mishra ·{' '}
              <code className="border border-signal/50 bg-signal-soft px-1.5 py-0.5 text-mono-code text-signal">
                4nur4gmishr4.fahh
              </code>
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
              <Link to="/docs/readme" className="brutal-btn">
                Documentation
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="brutal-btn"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="order-2 relative flex min-h-[min(58dvh,560px)] flex-col md:col-span-7 md:min-h-[calc(100dvh-3rem)]">
          <LaptopSceneLazy
            scrollLinked
            className="!min-h-full !h-full !border-0"
          />
          <p className="pointer-events-none absolute bottom-3 left-3 z-10 text-mono-label tracking-[0.1em] text-secondary md:bottom-4 md:left-4">
            Drag to rotate · lid opens to 95°
          </p>
        </div>
      </section>

      <SpecBar />
      <FaultSample />
      <DefaultsMatrix />
      <InstallPath />
      <CommandPalette />

      <section className="border-b border-white/85 px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-signal">
              Reference
            </p>
            <h2 className="text-headline-lg mb-3 text-primary">Documentation</h2>
            <p className="text-body-md text-secondary">
              Core docs on this site. Full index under Docs.
            </p>
          </div>
          <Link
            to="/docs"
            className="brutal-btn shrink-0 self-start sm:self-auto"
          >
            All documentation
          </Link>
        </div>
        <div className="grid grid-cols-1 border border-white/85 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_TEASER.map((d, i) => {
            const col = i % 3
            const isLastRow =
              i >=
              DOC_TEASER.length -
                (DOC_TEASER.length % 3 === 0 ? 3 : DOC_TEASER.length % 3)
            return (
              <Link
                key={d.id}
                to={`/docs/${d.id}`}
                className={[
                  'group block min-h-[7.5rem] border-white/85 p-7 no-underline transition-colors duration-200 hover:bg-white hover:text-black',
                  col < 2 ? 'lg:border-r' : '',
                  i % 2 === 0 ? 'sm:border-r lg:border-r' : '',
                  !isLastRow || i < DOC_TEASER.length - 1 ? 'border-b' : '',
                  i === DOC_TEASER.length - 1 && DOC_TEASER.length % 3 !== 0
                    ? 'lg:border-b-0'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <h3 className="text-headline-md mb-2 text-primary group-hover:text-black">
                  {d.title}
                </h3>
                <p className="text-body-md text-secondary group-hover:text-black/65">
                  {d.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
