import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const HERO_LINE = 'Debugger and fault explainer for VS Code.'

const TYPE_MS = 42
const COOLDOWN_MS = 3000

/**
 * Loops: type full line → hold 3s → reset → type again.
 * Reduced motion: static full text, no cursor.
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
      // full line — cooldown then restart
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

  return (
    <span className={['inline grid w-full', className].filter(Boolean).join(' ')}>
      {/* reserve full line height so typing never reflows the hero */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {text}
      </span>
      <span className="col-start-1 row-start-1" aria-hidden={!reduced}>
        {shown}
        {!reduced ? (
          <span
            className="type-caret ml-[0.06em] inline-block w-[0.55ch] translate-y-[0.05em] bg-primary align-baseline"
            aria-hidden
          />
        ) : null}
      </span>
    </span>
  )
}

export { HERO_LINE }
