import { EXTENSION_ID, VERSION } from '../../data/commands'
import { VscodeIcon } from '../brand/VscodeIcon'

/**
 * Single identity strip — version / id live here only (not repeated in hero).
 */
export function SpecBar() {
  return (
    <div
      className="flex w-full min-w-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-primary/85 px-5 py-2.5 md:gap-x-5 md:px-12 md:py-3 lg:px-16"
      role="presentation"
    >
      <span className="mono-chip">v{VERSION}</span>
      <span className="max-w-full break-all text-mono-code text-secondary">
        {EXTENSION_ID}
      </span>
      <span className="icon-inline text-mono-label tracking-[0.1em] text-secondary">
        <VscodeIcon size={14} />
        ^1.93
      </span>
      <span className="text-mono-label tracking-[0.1em] text-secondary">MIT</span>
    </div>
  )
}
