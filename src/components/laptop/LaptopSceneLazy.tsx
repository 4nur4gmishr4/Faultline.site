import { lazy, Suspense, type ComponentProps } from 'react'

const LaptopScene = lazy(() => import('./LaptopScene'))

/** Code-split Three/R3F off the critical path. */
export function LaptopSceneLazy(props: ComponentProps<typeof LaptopScene>) {
  return (
    <Suspense
      fallback={
        <div className="laptop-stage flex items-center justify-center bg-black">
          <span className="text-mono-label tracking-[0.14em] text-secondary">Loading</span>
        </div>
      }
    >
      <LaptopScene {...props} />
    </Suspense>
  )
}
