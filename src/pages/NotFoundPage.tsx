import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100dvh-3rem-12rem)] w-full flex-col items-start justify-center gap-7 px-6 py-16 md:px-12 md:py-24 lg:px-16">
      <p className="text-mono-label uppercase tracking-[0.14em] text-secondary">
        404
      </p>
      <h1 className="text-display-xl text-primary">Page not found</h1>
      <p className="text-body-lg max-w-md text-secondary">
        That path is not part of this site. Try the home page or documentation
        index.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/" className="brutal-btn brutal-btn-solid">
          Home
        </Link>
        <Link to="/docs" className="brutal-btn">
          Documentation
        </Link>
      </div>
    </div>
  )
}
