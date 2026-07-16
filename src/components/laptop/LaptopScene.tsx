import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { MacLaptop } from './MacLaptop'
import { MODEL_URL_LOCAL, MODEL_URL_REMOTE } from './materials'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type LaptopSceneProps = {
  compact?: boolean
  className?: string
  scrollProgress?: number
  scrollLinked?: boolean
}

class LaptopErrorBoundary extends Component<
  { children: ReactNode; onError: (msg: string) => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(err: Error) {
    this.props.onError(err?.message || 'Render failed')
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function FallbackFrame({ message }: { message: string }) {
  return (
    <div className="flex h-full min-h-[inherit] w-full flex-col items-center justify-center bg-background p-4 text-center md:p-8">
      <p className="text-body-md text-secondary">{message}</p>
      <p className="mt-3 max-w-sm text-body-md text-primary-fixed-dim">
        The rest of the site works without WebGL.
      </p>
    </div>
  )
}

function StageSkeleton() {
  return (
    <div
      className="flex h-full min-h-[inherit] w-full flex-col items-center justify-center bg-background"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="mb-4 h-px w-24 bg-signal/40" />
      <span className="text-mono-label tracking-[0.14em] text-secondary">
        Loading 3D preview
      </span>
    </div>
  )
}

function useIsMobile(): boolean {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const apply = () => setM(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return m
}

export function LaptopScene({
  compact = false,
  className = '',
  scrollProgress: externalProgress,
  scrollLinked = false,
}: LaptopSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, '160px')
  const reducedMotion = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const [failed, setFailed] = useState(false)
  const [failMsg, setFailMsg] = useState('')
  const [scrollProgress, setScrollProgress] = useState(1)
  const [allowMount, setAllowMount] = useState(false)
  const [modelUrl, setModelUrl] = useState(MODEL_URL_LOCAL)

  useEffect(() => {
    if (inView) {
      const t = window.setTimeout(() => setAllowMount(true), mobile ? 80 : 24)
      return () => window.clearTimeout(t)
    }
  }, [inView, mobile])

  useEffect(() => {
    let cancelled = false
    fetch(MODEL_URL_LOCAL, { method: 'HEAD' })
      .then((r) => {
        if (!cancelled && !r.ok) setModelUrl(MODEL_URL_REMOTE)
      })
      .catch(() => {
        if (!cancelled) setModelUrl(MODEL_URL_REMOTE)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!scrollLinked || reducedMotion) return
    const scrollRoot = document.getElementById('main')

    const onScroll = () => {
      const el = stageRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const centered =
        1 - Math.abs(rect.top + rect.height * 0.4 - vh * 0.45) / (vh * 0.9)
      const raw = Math.min(1, Math.max(0, centered))
      setScrollProgress(0.72 + raw * 0.28)
    }
    onScroll()
    const target: HTMLElement | Window = scrollRoot ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scrollLinked, reducedMotion])

  const progress = useMemo(() => {
    if (externalProgress !== undefined) return externalProgress
    if (reducedMotion) return 1
    if (scrollLinked) return scrollProgress
    return 1
  }, [externalProgress, reducedMotion, scrollLinked, scrollProgress])

  // Lower mobile DPR for perf; reserve stage height via CSS (CLS)
  const dpr: [number, number] = mobile ? [1, 1.15] : [1, 1.75]

  if (failed) {
    return (
      <div ref={stageRef} className={`laptop-stage ${className}`}>
        <FallbackFrame message={failMsg || 'Preview could not load.'} />
      </div>
    )
  }

  return (
    <div
      ref={stageRef}
      className={`laptop-stage ${compact ? 'laptop-stage--compact' : ''} ${className}`}
      role="img"
      aria-label="Interactive 3D laptop preview. Drag to rotate. Zoom is disabled."
    >
      <div className="h-full w-full">
        {allowMount ? (
          <LaptopErrorBoundary
            onError={(msg) => {
              setFailMsg(msg)
              setFailed(true)
            }}
          >
            <Canvas
              gl={{
                antialias: !mobile,
                alpha: false,
                powerPreference: mobile ? 'low-power' : 'high-performance',
                stencil: false,
                depth: true,
              }}
              dpr={dpr}
              camera={{
                fov: compact ? 36 : mobile ? 36 : 34,
                near: 1,
                far: 400,
                position: [0, 2.8, compact ? 70 : mobile ? 68 : 62],
              }}
              style={{ background: 'var(--color-background)' }}
              frameloop={inView && !reducedMotion ? 'always' : 'demand'}
              onCreated={({ gl, scene }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.toneMappingExposure = 1.06
                gl.outputColorSpace = THREE.SRGBColorSpace
                gl.domElement.style.touchAction = 'none'
                gl.domElement.setAttribute('aria-hidden', 'true')
                const syncBg = () => {
                  const raw = getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-background')
                    .trim()
                  if (raw) scene.background = new THREE.Color(raw)
                }
                syncBg()
                const mo = new MutationObserver(syncBg)
                mo.observe(document.documentElement, {
                  attributes: true,
                  attributeFilter: ['data-theme'],
                })
                gl.domElement.addEventListener(
                  'webglcontextlost',
                  (e) => {
                    e.preventDefault()
                    mo.disconnect()
                    setFailMsg(
                      'Graphics context was lost. Reload to restore the preview.'
                    )
                    setFailed(true)
                  },
                  false
                )
              }}
            >
              <Suspense fallback={null}>
                <MacLaptop
                  modelUrl={modelUrl}
                  scrollProgress={progress}
                  active={inView && !reducedMotion}
                  reducedMotion={reducedMotion}
                  compact={compact || mobile}
                />
              </Suspense>
            </Canvas>
          </LaptopErrorBoundary>
        ) : (
          <StageSkeleton />
        )}
      </div>
    </div>
  )
}

export default LaptopScene
