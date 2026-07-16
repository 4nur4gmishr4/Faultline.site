import type { ReactNode } from 'react'
import type { DocBlock } from '../../content/docs/types'

function linkifyUrls(text: string): ReactNode[] {
  const re = /(https?:\/\/[^\s]+)/g
  const parts = text.split(re)
  return parts.map((part, i) => {
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="text-signal underline underline-offset-2 hover:opacity-80"
        >
          {part}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case 'lead':
      return (
        <p className="text-body-lg mb-8 text-secondary">{linkifyUrls(block.text)}</p>
      )
    case 'h2':
      return (
        <h2 className="text-headline-lg mb-4 mt-12 border-b border-white/15 pb-3 text-primary first:mt-0">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="text-headline-md mb-3 mt-8 text-primary">{block.text}</h3>
      )
    case 'p':
      return (
        <p className="text-body-lg mb-5 text-secondary">{linkifyUrls(block.text)}</p>
      )
    case 'list':
      return (
        <ul className="mb-5 list-disc space-y-2 pl-6 text-body-md text-secondary">
          {block.items.map((item) => (
            <li key={item}>{linkifyUrls(item)}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mb-5 list-decimal space-y-2 pl-6 text-body-md text-secondary">
          {block.items.map((item) => (
            <li key={item}>{linkifyUrls(item)}</li>
          ))}
        </ol>
      )
    case 'table':
      return (
        <div className="mb-6 w-full max-w-full overflow-x-auto border border-white/85">
          <table className="w-full min-w-[420px] border-collapse text-left text-body-md">
            <thead className="brutal-invert">
              <tr>
                {block.headers.map((h) => (
                  <th
                    key={h || 'empty'}
                    scope="col"
                    className="border border-white/85 px-3 py-2.5 text-mono-label font-medium tracking-[0.06em] text-inherit"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border border-white/85 px-3 py-2.5 align-top text-secondary"
                    >
                      {linkifyUrls(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'code':
      return (
        <pre className="mb-5 overflow-x-auto border border-white bg-surface-container-lowest p-4 text-mono-code text-primary whitespace-pre-wrap">
          {block.text}
        </pre>
      )
    case 'callout':
      return (
        <aside className="my-5 border border-white border-l-2 bg-surface-container-low px-4 py-3 text-body-md text-secondary">
          {linkifyUrls(block.text)}
        </aside>
      )
    case 'divider':
      return <hr className="my-10 border-0 border-t border-white/25" />
    default:
      return null
  }
}

/** Renders embedded doc content as product UI — not raw markdown. */
export function DocContent({
  title,
  blocks,
}: {
  title: string
  blocks: DocBlock[]
}) {
  return (
    <article className="doc-prose">
      <h1 className="text-display-xl mb-8 mt-0 border-b border-white/25 pb-6 text-primary">
        {title}
      </h1>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </article>
  )
}
