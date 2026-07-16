/** Structured doc content (embedded, no fetch) — real text from FaultLine docs, not raw markdown files. */

export type DocBlock =
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'divider' }

export type DocPageContent = {
  id: string
  title: string
  description: string
  blocks: DocBlock[]
}
