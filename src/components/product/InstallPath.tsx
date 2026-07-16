import { MARKETPLACE_URL, RELEASES_URL } from '../../data/commands'
import { VscodeIcon } from '../brand/VscodeIcon'

/**
 * Install detail lives here only (hero has a single Install CTA).
 */
export function InstallPath() {
  return (
    <section
      className="section-pad w-full min-w-0 max-w-full border-b border-primary/85"
      aria-labelledby="install-path-title"
    >
      <div className="mb-6 max-w-lg md:mb-8">
        <p className="icon-inline mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary">
          <VscodeIcon size={15} />
          Install
        </p>
        <h2 id="install-path-title" className="text-headline-lg mb-3 text-primary">
          Two ways in
        </h2>
        <p className="text-body-md text-secondary">
          Marketplace when listed; GitHub VSIX for a direct 3.5.0 package.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 border border-primary/85 md:grid-cols-2">
        <div className="border-b border-primary/85 p-5 md:border-r md:border-b-0 md:p-8">
          <p className="mb-3 text-mono-label tracking-[0.12em] text-secondary">
            01 · Marketplace
          </p>
          <p className="mb-6 text-body-md text-secondary">
            Extensions → search FaultLine → Install.
          </p>
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noreferrer"
            className="brutal-btn brutal-btn-solid w-full sm:w-auto"
          >
            <VscodeIcon size={16} />
            Open Marketplace
          </a>
        </div>
        <div className="p-5 md:p-8">
          <p className="mb-3 text-mono-label tracking-[0.12em] text-secondary">
            02 · VSIX
          </p>
          <p className="mb-6 text-body-md text-secondary">
            Install <code className="text-mono-code text-primary">fahh-3.5.0.vsix</code>{' '}
            from Releases, then reload.
          </p>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="brutal-btn w-full sm:w-auto"
          >
            <VscodeIcon size={16} />
            Releases
          </a>
        </div>
      </div>
    </section>
  )
}
