/**
 * Capture proof — sole failure transcript on the home page.
 * Fault red only on the error line; everything else mono.
 */
export function FaultSample() {
  return (
    <section
      className="w-full min-w-0 max-w-full border-b border-primary/85"
      aria-labelledby="fault-sample-title"
    >
      <div className="grid w-full min-w-0 grid-cols-1 lg:grid-cols-12">
        <div className="min-w-0 border-b border-primary/85 px-6 py-12 md:px-10 lg:col-span-3 lg:border-r lg:border-b-0 lg:px-12 lg:py-16">
          <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary">
            Capture
          </p>
          <h2 id="fault-sample-title" className="text-headline-lg mb-4 text-primary">
            Keep the context. Open analysis when you choose.
          </h2>
          <p className="text-body-md text-secondary">
            Sanitized command + output stay local.
          </p>
        </div>

        <div className="min-w-0 lg:col-span-9">
          <div className="h-full border-b border-primary/85 bg-surface">
            <div className="flex items-center justify-between border-b border-primary/85 px-4 py-3 md:px-8">
              <span className="text-mono-label tracking-[0.12em] text-primary">
                CAPTURE
              </span>
              <span className="text-mono-label tracking-[0.1em] text-secondary">
                task
              </span>
            </div>
            <pre className="overflow-x-auto p-4 text-mono-code leading-relaxed md:p-8 lg:min-h-[14rem]">
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
            <div className="border-t border-primary/85 px-4 py-3 text-mono-label tracking-[0.1em] text-secondary md:px-8">
              Analyze Last Failure
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
