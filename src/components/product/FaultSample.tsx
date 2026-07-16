/**
 * Captured-failure panel (semantic colors for error/safe) — product artifact with semantic color for errors.
 */
export function FaultSample() {
  return (
    <section
      className="border-b border-white/85"
      aria-labelledby="fault-sample-title"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-white bg-signal-soft/40 px-6 py-12 md:px-12 lg:col-span-4 lg:border-r lg:border-b-0 lg:px-16 lg:py-16">
          <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-signal">
            Last failure
          </p>
          <h2 id="fault-sample-title" className="text-headline-lg mb-4 text-primary">
            Keep the context. Open analysis when you choose.
          </h2>
          <p className="text-body-md max-w-sm text-secondary">
            FaultLine stores a sanitized copy of the command and output. Auto-open
            stays off. You run Analyze Last Failure.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="panel-fault border-b border-white">
            <div className="flex items-center justify-between border-b border-fault/40 bg-fault-soft px-4 py-3 md:px-6">
              <span className="text-mono-label tracking-[0.12em] text-fault">
                FAULTLINE · CAPTURE
              </span>
              <span className="chip-fault">source: task</span>
            </div>
            <pre className="overflow-x-auto p-4 text-mono-code leading-relaxed md:p-6">
              <code>
                <span className="text-signal">$ npm run build</span>
                {'\n\n'}
                <span className="text-fault font-semibold">
                  error TS2304: Cannot find name &apos;runtime&apos;.
                </span>
                {'\n'}
                <span className="text-primary-fixed-dim">
                  {'  '}src/extension.ts:42
                </span>
                {'\n\n'}
                <span className="text-warn font-semibold">&gt; FAULT CAPTURED</span>
                {'\n'}
                <span className="text-secondary">&gt; label: npm run build</span>
                {'\n'}
                <span className="text-safe">&gt; pii: scrubbed</span>
                {'\n'}
                <span className="text-safe">&gt; autoShow: OFF</span>
              </code>
            </pre>
            <div className="flex flex-wrap items-stretch border-t border-white">
              <div className="border-b border-white bg-signal-soft px-4 py-3 text-mono-label tracking-[0.1em] text-signal sm:border-b-0 sm:border-r">
                Analyze Last Failure
              </div>
              <div className="border-b border-white px-4 py-3 text-mono-label tracking-[0.1em] text-secondary sm:border-b-0 sm:border-r">
                Explain? <span className="text-safe">[Y]</span> /{' '}
                <span className="text-fault">[N]</span>
              </div>
              <div className="px-4 py-3 text-mono-label tracking-[0.1em] text-secondary">
                id: 4nur4gmishr4.fahh
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
