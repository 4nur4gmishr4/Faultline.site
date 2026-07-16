const ROWS: {
  feature: string
  defaultValue: string
  why: string
  tone: 'safe' | 'signal' | 'fault'
}[] = [
  {
    feature: 'Auto-open explainer',
    defaultValue: 'Off',
    why: 'No surprise outbound requests',
    tone: 'safe',
  },
  {
    feature: 'Log summaries',
    defaultValue: 'Off',
    why: 'Same reason',
    tone: 'safe',
  },
  {
    feature: 'Jira create',
    defaultValue: 'Off',
    why: 'Opt-in only',
    tone: 'safe',
  },
  {
    feature: 'Webhooks',
    defaultValue: 'Empty',
    why: 'Nothing sent until https URL',
    tone: 'signal',
  },
  {
    feature: 'Provider keys',
    defaultValue: 'SecretStorage',
    why: 'Not plain settings text',
    tone: 'signal',
  },
]

function ToneChip({
  tone,
  children,
}: {
  tone: 'safe' | 'signal' | 'fault'
  children: string
}) {
  const cls =
    tone === 'safe'
      ? 'chip-safe'
      : tone === 'fault'
        ? 'chip-fault'
        : 'chip-signal'
  return <span className={cls}>{children}</span>
}

/**
 * Privacy defaults as a dense matrix with semantic chips.
 */
export function DefaultsMatrix() {
  return (
    <section
      className="border-b border-white px-6 py-14 md:px-12 md:py-20 lg:px-16"
      aria-labelledby="defaults-title"
    >
      <div className="mb-8 max-w-lg">
        <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-safe">
          Safe defaults
        </p>
        <h2 id="defaults-title" className="text-headline-lg mb-3 text-primary">
          Quiet until you ask.
        </h2>
        <p className="text-body-md text-secondary">
          Debugger first. Notifier second. Outbound paths stay closed unless you
          open them.
        </p>
      </div>

      <div className="w-full overflow-x-auto border border-white/85">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead className="brutal-invert">
            <tr>
              <th className="border border-white px-4 py-3 text-mono-label font-medium tracking-[0.08em]">
                Feature
              </th>
              <th className="border border-white px-4 py-3 text-mono-label font-medium tracking-[0.08em]">
                Default
              </th>
              <th className="border border-white px-4 py-3 text-mono-label font-medium tracking-[0.08em]">
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature} className="bg-surface/40">
                <td className="border border-white px-4 py-3 text-body-md text-primary">
                  {row.feature}
                </td>
                <td className="border border-white px-4 py-3">
                  <ToneChip tone={row.tone}>{row.defaultValue}</ToneChip>
                </td>
                <td className="border border-white px-4 py-3 text-body-md text-secondary">
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
