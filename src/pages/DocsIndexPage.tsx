import { Link } from 'react-router-dom'
import { DOCS } from '../content/docs'

export function DocsIndexPage() {
  return (
    <div className="section-pad w-full min-w-0">
      <div className="mb-8 max-w-xl md:mb-12">
        <p className="mb-5 text-mono-label uppercase tracking-[0.14em] text-secondary">
          Reference
        </p>
        <h1 className="text-display-xl mb-5 text-primary">Documentation</h1>
        <p className="text-body-lg text-secondary">
          Product docs for FaultLine — written as site pages, not raw repository
          files.
        </p>
      </div>
      <div className="grid grid-cols-1 border border-primary/85 md:grid-cols-2">
        {DOCS.map((d, i) => (
          <Link
            key={d.id}
            to={`/docs/${d.id}`}
            className={[
              'group block border-primary/85 p-5 no-underline transition-colors duration-200 hover:bg-primary md:p-7',
              i % 2 === 0 ? 'md:border-r' : '',
              i < DOCS.length - 2
                ? 'border-b'
                : i < DOCS.length - 1
                  ? 'border-b md:border-b-0'
                  : '',
              DOCS.length % 2 === 1 && i === DOCS.length - 1 ? 'md:col-span-2' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <h2 className="text-headline-md mb-2 text-primary group-hover:text-on-primary">
              {d.title}
            </h2>
            <p className="text-body-md text-secondary group-hover:text-on-primary/65">
              {d.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
