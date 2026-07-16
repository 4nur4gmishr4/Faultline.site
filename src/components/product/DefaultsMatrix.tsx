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
      className="w-full min-w-0 max-w-full border-b border-primary/85 px-6 py-14 md:px-12 md:py-20 lg:px-16"
      aria-labelledby="defaults-title"
    >
      <div className="mb-8 w-full min-w-0">
        <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary">
          Defaults
        </p>
        <h2 id="defaults-title" className="text-headline-lg mb-3 text-primary">
          Quiet until you ask.
        </h2>
      </div>

      <div className="w-full max-w-full min-w-0 overflow-x-auto border border-primary/85">
        <table className="w-full min-w-[min(100%,480px)] border-collapse text-left">
          <thead className="brutal-invert">
            <tr>
              <th
                scope="col"
                className="border border-primary/85 px-4 py-3.5 text-mono-label font-medium tracking-[0.08em] md:w-[32%] md:px-6"
              >
                Feature
              </th>
              <th
                scope="col"
                className="border border-primary/85 px-4 py-3.5 text-mono-label font-medium tracking-[0.08em] md:w-[22%] md:px-6"
              >
                Default
              </th>
              <th
                scope="col"
                className="border border-primary/85 px-4 py-3.5 text-mono-label font-medium tracking-[0.08em] md:px-6"
              >
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature}>
                <td className="border border-primary/85 px-4 py-3.5 text-body-md text-primary md:px-6">
                  {row.feature}
                </td>
                <td className="border border-primary/85 px-4 py-3.5 md:px-6">
                  <span className="mono-chip">{row.defaultValue}</span>
                </td>
                <td className="border border-primary/85 px-4 py-3.5 text-body-md text-secondary md:px-6">
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
