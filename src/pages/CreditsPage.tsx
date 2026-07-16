export function CreditsPage() {
  return (
    <div className="flex w-full flex-col gap-10 px-6 py-14 md:px-12 md:py-20 lg:px-16">
      <section>
        <p className="mb-5 text-mono-label uppercase tracking-[0.14em] text-secondary">
          Attribution
        </p>
        <h1 className="text-display-xl mb-4 text-primary">Credits</h1>
      </section>

      <div className="grid grid-cols-1 gap-0 border border-primary/85 md:grid-cols-2">
        <div className="border-b border-primary/85 p-6 md:border-r md:border-b-0">
          <h2 className="text-headline-md mb-3 uppercase text-primary">FaultLine</h2>
          <p className="text-body-md text-secondary">
            VS Code extension by{' '}
            <strong className="text-primary">Anurag Mishra</strong>. MIT licensed.
          </p>
        </div>
        <div className="p-6">
          <h2 className="text-headline-md mb-3 uppercase text-primary">3D laptop</h2>
          <p className="text-body-md text-secondary">
            Interactive laptop scene adapted from{' '}
            <a
              className="text-signal underline underline-offset-2"
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

      <div className="border border-primary/85 p-6">
        <h2 className="text-headline-md mb-3 uppercase text-primary">Stack</h2>
        <p className="text-mono-code text-secondary">
          Vite · React · TypeScript · Tailwind · React Three Fiber · GSAP · React
          Router · Playwright
        </p>
      </div>

      <div className="border border-primary/85 p-6">
        <h2 className="text-headline-md mb-3 uppercase text-primary">VS Code mark</h2>
        <p className="text-body-md text-secondary">
          Visual Studio Code icon is a trademark of Microsoft Corporation. Used
          under{' '}
          <a
            className="text-signal underline underline-offset-2"
            href="https://code.visualstudio.com/brand"
            target="_blank"
            rel="noreferrer"
          >
            VS Code branding guidelines
          </a>
          .
        </p>
      </div>
    </div>
  )
}
