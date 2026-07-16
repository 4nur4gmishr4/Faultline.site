import { MARKETPLACE_URL, RELEASES_URL } from '../../data/commands'

/**
 * Two-step install path — Marketplace preferred, VSIX fallback.
 */
export function InstallPath() {
  return (
    <section
      className="border-b border-white px-6 py-14 md:px-12 md:py-20 lg:px-16"
      aria-labelledby="install-path-title"
    >
      <div className="mb-8 max-w-lg">
        <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-signal">
          Install
        </p>
        <h2 id="install-path-title" className="text-headline-lg mb-3 text-primary">
          Two ways in
        </h2>
        <p className="text-body-md text-secondary">
          Prefer Marketplace when the listing is available. Use the GitHub VSIX
          for a direct install of 3.5.0.
        </p>
      </div>

      <div className="grid grid-cols-1 border border-white md:grid-cols-2">
        <div className="border-b border-white p-6 md:border-r md:border-b-0 md:p-8">
          <p className="mb-3 text-mono-label tracking-[0.12em] text-signal">01 · Preferred</p>
          <h3 className="text-headline-md mb-3 text-primary">Marketplace</h3>
          <p className="mb-6 text-body-md text-secondary">
            Extensions → search <strong className="text-primary">FaultLine</strong> →
            Install. Id stays <code className="text-mono-code text-signal">4nur4gmishr4.fahh</code>.
          </p>
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noreferrer"
            className="brutal-btn brutal-btn-solid"
          >
            Open Marketplace
          </a>
        </div>
        <div className="p-6 md:p-8">
          <p className="mb-3 text-mono-label tracking-[0.12em] text-warn">02 · Direct</p>
          <h3 className="text-headline-md mb-3 text-primary">GitHub VSIX</h3>
          <p className="mb-6 text-body-md text-secondary">
            Download <code className="text-mono-code text-primary">fahh-3.5.0.vsix</code>, then
            Extensions → Install from VSIX… Reload the window after install.
          </p>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="brutal-btn"
          >
            Releases v3.5.0
          </a>
        </div>
      </div>
    </section>
  )
}
