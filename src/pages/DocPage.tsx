import { Link, useParams } from 'react-router-dom'
import { DOCS, getDoc } from '../content/docs'
import { DocContent } from '../components/docs/DocContent'

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
    <div className="flex w-full flex-col lg:flex-row">
      <aside className="w-full shrink-0 border-b border-white/85 lg:w-64 lg:border-r lg:border-b-0">
        <div className="lg:sticky lg:top-0 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto">
          <div className="p-5 md:p-6">
            <p className="mb-5 text-mono-label uppercase tracking-[0.14em] text-signal">
              Documentation
            </p>
            <nav
              className="flex flex-row flex-wrap gap-0 border border-white/85 lg:flex-col"
              aria-label="Docs"
            >
              {DOCS.map((d) => (
                <Link
                  key={d.id}
                  to={`/docs/${d.id}`}
                  className={[
                    'flex min-h-11 items-center border-white/85 px-3.5 py-3 text-mono-label uppercase tracking-[0.1em] no-underline transition-colors duration-150',
                    'border-r lg:border-r-0 lg:border-b last:lg:border-b-0',
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

      <div className="min-w-0 flex-1 px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
        <div className="doc-prose mx-auto">
          <DocContent title={doc.title} blocks={doc.blocks} />
        </div>
      </div>
    </div>
  )
}
