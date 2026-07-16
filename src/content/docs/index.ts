import type { DocPageContent } from './types'
import { readmeDoc } from './readme'
import { securityDoc } from './security'
import { architectureDoc } from './architecture'
import { changelogDoc } from './changelog'
import { contributingDoc } from './contributing'
import { troubleshootingDoc } from './troubleshooting'
import { licenseDoc } from './license'

export type { DocBlock, DocPageContent } from './types'

/** All docs as embedded structured content (no runtime fetch). */
export const DOC_PAGES: DocPageContent[] = [
  readmeDoc,
  securityDoc,
  architectureDoc,
  changelogDoc,
  contributingDoc,
  troubleshootingDoc,
  licenseDoc,
]

export const DOCS = DOC_PAGES.map((d) => ({
  id: d.id,
  title: d.title,
  description: d.description,
}))

export function getDoc(id: string): DocPageContent | undefined {
  return DOC_PAGES.find((d) => d.id === id.toLowerCase())
}
