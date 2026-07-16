import { Link, useParams } from 'react-router-dom'
import { DOCS, getDoc } from '../content/docs'
import { DocContent } from '../components/docs/DocContent'

/** Doc reader with sidebar aria-current */
export function DocPage() {
  const { docId = 'readme' } = useParams()
  const doc = getDoc(docId)

  if (!doc) {
    return (
      <div className="p-10 md:p-16">
        <h1 className="text-headline-lg text-primary">Document not found</h1>
        <Link
          to="/docs"
          className="mt-6 inline-block text-primary underline underline-offset-2"
        >
          All documentation
        </Link>
      </div>
    )
  }

  return (
    <div className="flex w-full min-w-0 flex-col lg:flex-row">
      <aside className="w-full min-w-0 shrink-0 border-b border-primary/85 lg:w-64 lg:border-r lg:border-b-0">
        <div className="lg:sticky lg:top-0 lg:max-h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto">
          <div className="p-4 md:p-6">
            <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary md:mb-5">
              Documentation
            </p>
            <nav
              className="flex flex-row flex-nowrap gap-0 overflow-x-auto overscroll-x-contain border border-primary/85 [-webkit-overflow-scrolling:touch] lg:flex-col lg:overflow-x-visible"
              aria-label="Docs"
            >
              {DOCS.map((d) => (
                <Link
                  key={d.id}
                  to={`/docs/${d.id}`}
                  className={[
                    'flex min-h-11 shrink-0 items-center border-primary/85 px-3.5 py-3 text-mono-label uppercase tracking-[0.1em] whitespace-nowrap no-underline transition-colors duration-150',
                    'border-r lg:shrink lg:whitespace-normal lg:border-r-0 lg:border-b last:lg:border-b-0',
                    d.id === doc.id
                      ? 'bg-primary text-on-primary'
                      : 'text-primary hover:bg-surface-variant',
                  ].join(' ')}
                  aria-current={d.id === doc.id ? 'page' : undefined}
                >
                  {d.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 px-5 py-10 md:px-12 md:py-16 lg:px-20 lg:py-20">
        <div className="doc-prose mx-auto">
          <DocContent title={doc.title} blocks={doc.blocks} />
        </div>
      </div>
    </div>
  )
}
