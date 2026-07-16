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
      className="border-b border-primary/85 px-6 py-14 md:px-12 md:py-20 lg:px-16"
      aria-labelledby="defaults-title"
    >
      <div className="mb-8 max-w-lg">
        <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary">
          Defaults
        </p>
        <h2 id="defaults-title" className="text-headline-lg mb-3 text-primary">
          Quiet until you ask.
        </h2>
      </div>

      <div className="w-full overflow-x-auto border border-primary/85">
        <table className="w-full min-w-[480px] border-collapse text-left">
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
