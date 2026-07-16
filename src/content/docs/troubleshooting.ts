import type { DocPageContent } from './types'

/** Text from FaultLine docs/commands-troubleshooting.md. */
export const troubleshootingDoc: DocPageContent = {
  id: 'troubleshooting',
  title: 'Troubleshooting',
  description: 'Commands not working and install checks.',
  blocks: [
    {
      type: 'lead',
      text: 'Commands not working? Work through these checks before opening an issue.',
    },

    { type: 'h2', text: 'Quick checks' },
    {
      type: 'ol',
      items: [
        'Reload Window — Developer: Reload Window after every VSIX install',
        'Confirm id: Extensions → FaultLine → details → 4nur4gmishr4.fahh',
        'Open FaultLine: Show Output Log — you want a line like FaultLine commands registered',
        'Palette search FaultLine (category), then Toggle Enable / Disable',
      ],
    },

    { type: 'h2', text: 'Common causes' },
    {
      type: 'table',
      headers: ['Symptom', 'Fix'],
      rows: [
        [
          '“command not found”',
          'Extension failed to activate — reload; reinstall fahh-3.5.0.vsix',
        ],
        [
          'Commands listed but silent',
          'Check Output log for command … failed',
        ],
        [
          'Marketplace badge said “retired”',
          'Cosmetics only (unpublished listing); install via GitHub VSIX',
        ],
        [
          'Dual VS Code + Cursor',
          'Install the VSIX into the editor you actually use',
        ],
      ],
    },

    { type: 'h2', text: 'Install from VSIX' },
    {
      type: 'code',
      text: 'code --install-extension fahh-3.5.0.vsix --force',
    },
    {
      type: 'p',
      text: 'Then reload. Keep version 3.5.0 and id 4nur4gmishr4.fahh.',
    },
  ],
}
