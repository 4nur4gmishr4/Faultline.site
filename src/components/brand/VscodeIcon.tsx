/**
 * Official VS Code mark (Microsoft trademark).
 * Source: visual-studio-code-icons — use alt on blue/dark contrast surfaces.
 * Guidelines: https://code.visualstudio.com/brand
 */
export function VscodeIcon({
  alt = false,
  className = '',
  size = 18,
  title = 'Visual Studio Code',
}: {
  /** White alt mark for blue/dark solid backgrounds */
  alt?: boolean
  className?: string
  size?: number
  title?: string
}) {
  const base = import.meta.env.BASE_URL || '/'
  const src = `${base}brand/${alt ? 'vscode-alt' : 'vscode'}.svg`

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      title={title}
      className={`inline-block shrink-0 object-contain ${className}`}
      aria-hidden
      draggable={false}
    />
  )
}
