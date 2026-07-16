import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** No trailing full stop — matches static hero pitch. */
const HERO_LINE = 'Debugger and fault explainer for VS Code'

const TYPE_MS = 42
const COOLDOWN_MS = 3000

/**
 * Loops: type full line → hold 3s → reset → type again.
 * Invisible full text locks the box; typed layer is absolute (no reflow).
 * Reduced motion: static full text, no caret.
 */
export function TypewriterLine({
  text = HERO_LINE,
  className = '',
}: {
  text?: string
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(reduced ? text : '')

  useEffect(() => {
    if (reduced) {
      setShown(text)
      return
    }

    let i = 0
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined

    const clearTimer = () => {
      if (timer !== undefined) window.clearTimeout(timer)
    }

    const schedule = (fn: () => void, ms: number) => {
      clearTimer()
      timer = window.setTimeout(fn, ms)
    }

    const typeNext = () => {
      if (cancelled) return
      if (i < text.length) {
        i += 1
        setShown(text.slice(0, i))
        schedule(typeNext, TYPE_MS)
        return
      }
      schedule(() => {
        if (cancelled) return
        i = 0
        setShown('')
        schedule(typeNext, TYPE_MS)
      }, COOLDOWN_MS)
    }

    setShown('')
    schedule(typeNext, TYPE_MS)

    return () => {
      cancelled = true
      clearTimer()
    }
  }, [text, reduced])

  if (reduced) {
    return <span className={className || undefined}>{text}</span>
  }

  return (
    <span
      className={['typewriter-line relative block w-full', className]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Sizer: full copy, same wrap as static headline — layout never moves */}
      <span className="invisible block" aria-hidden>
        {text}
      </span>
      {/* Paint layer: types inside the reserved box only */}
      <span className="pointer-events-none absolute inset-0 block overflow-hidden" aria-hidden>
        {shown}
        <span className="type-caret" aria-hidden />
      </span>
    </span>
  )
}

export { HERO_LINE }
