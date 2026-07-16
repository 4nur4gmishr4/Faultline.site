import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="section-pad flex min-h-[min(60dvh,28rem)] w-full min-w-0 flex-col items-start justify-center gap-6 md:min-h-[min(70dvh,36rem)] md:gap-7">
      <p className="text-mono-label uppercase tracking-[0.14em] text-secondary">
        404
      </p>
      <h1 className="text-display-xl text-primary">Page not found</h1>
      <p className="text-body-lg max-w-md text-secondary">
        That path is not part of this site. No cap. Try the home page or documentation
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
