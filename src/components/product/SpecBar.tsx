import { EXTENSION_ID, VERSION } from '../../data/commands'
import { VscodeIcon } from '../brand/VscodeIcon'

/**
 * Static identity strip (never a marquee) with light semantic accents.
 */
export function SpecBar() {
  return (
    <div
      className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 border-b border-primary/85 bg-signal-soft/50 px-6 py-3 md:px-12 lg:px-16"
      role="presentation"
    >
      <span className="chip-signal">v{VERSION}</span>
      <span className="text-mono-label tracking-[0.1em] text-secondary">
        {EXTENSION_ID}
      </span>
      <span className="icon-inline text-mono-label tracking-[0.1em] text-signal">
        <VscodeIcon size={14} />
        VS Code ^1.93
      </span>
      <span className="text-mono-label tracking-[0.1em] text-safe">MIT</span>
      <span className="text-mono-label tracking-[0.1em] text-secondary">
        Anurag Mishra
      </span>
    </div>
  )
}
