/**
 * Capture proof — one place for failure transcript (not repeated elsewhere).
 * Only error line uses fault red; rest monochrome + signal for command.
 */
export function FaultSample() {
  return (
    <section
      className="border-b border-primary/85"
      aria-labelledby="fault-sample-title"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-primary/85 px-6 py-12 md:px-12 lg:col-span-4 lg:border-r lg:border-b-0 lg:px-16 lg:py-16">
          <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary">
            Capture
          </p>
          <h2 id="fault-sample-title" className="text-headline-lg mb-4 text-primary">
            Keep the context. Open analysis when you choose.
          </h2>
          <p className="text-body-md max-w-sm text-secondary">
            Sanitized command + output stay local. Auto-open stays off.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="border-b border-primary/85 bg-surface">
            <div className="flex items-center justify-between border-b border-primary/85 px-4 py-3 md:px-6">
              <span className="text-mono-label tracking-[0.12em] text-primary">
                CAPTURE
              </span>
              <span className="text-mono-label tracking-[0.1em] text-secondary">
                task
              </span>
            </div>
            <pre className="overflow-x-auto p-4 text-mono-code leading-relaxed md:p-6">
              <code>
                <span className="text-secondary">$ npm run build</span>
                {'\n\n'}
                <span className="text-fault font-semibold">
                  error TS2304: Cannot find name &apos;runtime&apos;.
                </span>
                {'\n'}
                <span className="text-primary-fixed-dim">
                  {'  '}src/extension.ts:42
                </span>
                {'\n\n'}
                <span className="text-primary">&gt; FAULT CAPTURED</span>
                {'\n'}
                <span className="text-secondary">&gt; pii: scrubbed · autoShow: OFF</span>
              </code>
            </pre>
            <div className="border-t border-primary/85 px-4 py-3 text-mono-label tracking-[0.1em] text-signal">
              Analyze Last Failure
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
