import { useEffect, useMemo, useRef, useState } from 'react'
import { FAULTLINE_COMMANDS } from '../../data/commands'

const CORE_IDS = new Set([
  'faultline.explainError',
  'faultline.openSettings',
  'faultline.toggle',
  'faultline.snooze',
  'faultline.factoryReset',
  'faultline.showOutput',
  'faultline.toggleSounds',
  'faultline.showWelcome',
])

/**
 * VS Code–style palette frame with local filter (Escape clears).
 */
export function CommandPalette() {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo(() => {
    const core = FAULTLINE_COMMANDS.filter((c) => CORE_IDS.has(c.id))
    const needle = q.trim().toLowerCase()
    if (!needle) return core
    return core.filter(
      (c) =>
        c.title.toLowerCase().includes(needle) ||
        c.id.toLowerCase().includes(needle) ||
        c.desc.toLowerCase().includes(needle)
    )
  }, [q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        setQ('')
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section
      className="w-full min-w-0 max-w-full border-b border-primary/85 px-6 py-14 md:px-12 md:py-20 lg:px-16"
      aria-labelledby="palette-title"
    >
      <div className="mb-8 w-full max-w-2xl">
        <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary">
          Command palette
        </p>
        <h2 id="palette-title" className="text-headline-lg mb-3 text-primary">
          FaultLine in the palette
        </h2>
        <p className="text-body-md text-secondary">
          Type FaultLine in VS Code. Filter below mirrors the real titles.
          Press Escape to clear.
        </p>
      </div>

      <div className="w-full border border-primary/85 bg-surface">
        <div className="flex items-stretch border-b border-primary/85">
          <label className="flex min-h-12 flex-1 items-center">
            <span className="sr-only">Filter commands</span>
            <span className="px-4 text-mono-label text-secondary" aria-hidden>
              &gt;
            </span>
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="FaultLine…"
              className="w-full min-h-12 border-0 bg-transparent py-3.5 pr-2 text-mono-code text-primary outline-none placeholder:text-secondary"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
            />
          </label>
          {q ? (
            <button
              type="button"
              className="min-h-12 min-w-12 border-l border-primary/85/90 px-4 text-mono-label tracking-[0.1em] text-secondary hover:bg-primary hover:text-on-primary"
              onClick={() => {
                setQ('')
                inputRef.current?.focus()
              }}
              aria-label="Clear filter"
            >
              Clear
            </button>
          ) : null}
        </div>

        <ul
          className="max-h-[22rem] overflow-y-auto"
          role="listbox"
          aria-label="Commands"
          aria-live="polite"
        >
          {items.length === 0 ? (
            <li className="px-4 py-8 text-body-md text-secondary">
              No matches for “{q}”. Try “analyze”, “snooze”, or “reset”.
            </li>
          ) : (
            items.map((cmd, i) => (
              <li
                key={cmd.id}
                className={[
                  'min-h-14 border-primary/85 px-4 py-3.5',
                  i < items.length - 1 ? 'border-b' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-body-md font-medium text-primary">
                    {cmd.title}
                  </span>
                  <span className="shrink-0 text-mono-code text-secondary">
                    {cmd.id}
                  </span>
                </div>
                <p className="mt-1 text-body-md text-secondary">{cmd.desc}</p>
              </li>
            ))
          )}
        </ul>

        <div className="border-t border-primary/85/90 px-4 py-2.5 text-mono-label tracking-[0.1em] text-secondary">
          Category · FaultLine · {items.length} shown
        </div>
      </div>
    </section>
  )
}
