const ROWS: { feature: string; defaultValue: string; why: string }[] = [
  {
    feature: 'Auto-open explainer',
    defaultValue: 'Off',
    why: 'No surprise outbound requests',
  },
  {
    feature: 'Log summaries',
    defaultValue: 'Off',
    why: 'Same privacy default',
  },
  {
    feature: 'Jira',
    defaultValue: 'Off',
    why: 'Opt-in only',
  },
  {
    feature: 'Webhooks',
    defaultValue: 'Empty',
    why: 'https only when set',
  },
  {
    feature: 'Provider keys',
    defaultValue: 'SecretStorage',
    why: 'Not plain settings text',
  },
]

/**
 * Privacy defaults — mono only. Signal reserved for CTAs elsewhere.
 */
export function DefaultsMatrix() {
  return (
    <section
      className="section-pad w-full min-w-0 max-w-full border-b border-primary/85"
      aria-labelledby="defaults-title"
    >
      <div className="mb-6 max-w-lg md:mb-8">
        <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary">
          Defaults
        </p>
        <h2 id="defaults-title" className="text-headline-lg mb-3 text-primary">
          Quiet until you ask.
        </h2>
      </div>

      <div className="w-full max-w-full min-w-0 overflow-x-auto overscroll-x-contain border border-primary/85 [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <thead className="brutal-invert">
            <tr>
              <th
                scope="col"
                className="border border-primary/85 px-4 py-3 text-mono-label font-medium tracking-[0.08em]"
              >
                Feature
              </th>
              <th
                scope="col"
                className="border border-primary/85 px-4 py-3 text-mono-label font-medium tracking-[0.08em]"
              >
                Default
              </th>
              <th
                scope="col"
                className="border border-primary/85 px-4 py-3 text-mono-label font-medium tracking-[0.08em]"
              >
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature}>
                <td className="border border-primary/85 px-4 py-3 text-body-md text-primary">
                  {row.feature}
                </td>
                <td className="border border-primary/85 px-4 py-3">
                  <span className="mono-chip">{row.defaultValue}</span>
                </td>
                <td className="border border-primary/85 px-4 py-3 text-body-md text-secondary">
                  {row.why}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
