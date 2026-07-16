export function CreditsPage() {
  return (
    <div className="flex w-full flex-col gap-10 px-6 py-14 md:px-12 md:py-20 lg:px-16">
      <section>
        <p className="mb-5 text-mono-label uppercase tracking-[0.14em] text-signal">
          Attribution
        </p>
        <h1 className="text-display-xl mb-4 text-primary">Credits</h1>
      </section>

      <div className="grid grid-cols-1 gap-0 border border-white md:grid-cols-2">
        <div className="border-b border-white p-6 md:border-r md:border-b-0">
          <h2 className="text-headline-md mb-3 uppercase text-primary">FaultLine</h2>
          <p className="text-body-md text-secondary">
            VS Code extension by{' '}
            <strong className="text-primary">Anurag Mishra</strong>. MIT licensed.
            Debugger and fault explainer for terminals and tasks.
          </p>
        </div>
        <div className="p-6">
          <h2 className="text-headline-md mb-3 uppercase text-primary">3D laptop</h2>
          <p className="text-body-md text-secondary">
            Interactive laptop scene adapted from{' '}
            <a
              className="text-primary underline"
              href="https://codepen.io/ksenia-k/pen/gOEgyaj"
              target="_blank"
              rel="noreferrer"
            >
              Minimal Three.js Laptop Template
            </a>{' '}
            by Ksenia Kondrashova (MIT).
          </p>
        </div>
      </div>

      <div className="border border-white p-6">
        <h2 className="text-headline-md mb-3 uppercase text-primary">Stack</h2>
        <p className="text-mono-code text-secondary">
          Vite · React · TypeScript · Tailwind · React Three Fiber · GSAP · React
          Router
        </p>
      </div>
    </div>
  )
}
