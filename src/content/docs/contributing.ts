import type { DocPageContent } from './types'

/** Text from FaultLine CONTRIBUTING.md. */
export const contributingDoc: DocPageContent = {
  id: 'contributing',
  title: 'Contributing',
  description: 'How to contribute and report issues.',
  blocks: [
    {
      type: 'lead',
      text: 'Thanks for helping improve FaultLine. FaultLine is a debugger and fault explainer first, and an error notifier second. Built by Anurag Mishra for developers who ship.',
    },
    {
      type: 'p',
      text: 'This guide is simple first, then technical. 3.5.0 is the production line. Keep changes solid, tested, and clear for users.',
    },

    { type: 'h2', text: 'For everyone' },

    { type: 'h3', text: 'Ways you can help' },
    {
      type: 'table',
      headers: ['Way', 'How'],
      rows: [
        [
          'Report a bug',
          'GitHub Issues with steps, VS Code version, and OS',
        ],
        [
          'Commands broken after install',
          'See Troubleshooting · reload window after VSIX',
        ],
        [
          'Suggest a feature',
          'Open an issue with why it helps, not only what to add',
        ],
        ['Improve docs', 'Clearer wording and accurate behavior'],
        [
          'Improve media',
          'Only the three project GIFs; see docs/media/README.md',
        ],
        ['Fix code', 'Fork, branch, pull request'],
      ],
    },

    { type: 'h3', text: 'First-install UX (do not break this)' },
    {
      type: 'p',
      text: 'On first install, WelcomePanel shows a typing greeting, then the welcome body. There is a Skip button under the type area. FaultLine: Show Welcome Screen opens the body without replaying the intro.',
    },

    { type: 'h3', text: 'Before you open a PR' },
    {
      type: 'ol',
      items: [
        'Search existing issues and PRs',
        'Keep the change focused',
        'Describe how you tested',
        'Never commit secrets, real API keys, or personal logs',
      ],
    },

    { type: 'h3', text: 'Conduct' },
    {
      type: 'p',
      text: 'Be kind. Assume good intent. No harassment. Security issues go private (see Security), not public exploit posts.',
    },

    { type: 'divider' },
    { type: 'h2', text: 'For developers' },

    { type: 'h3', text: 'Prerequisites' },
    {
      type: 'list',
      items: [
        'Node.js 18+ (CI uses 20)',
        'npm',
        'VS Code 1.93+ for Extension Development Host',
      ],
    },

    { type: 'h3', text: 'Setup' },
    {
      type: 'code',
      text: `git clone https://github.com/4nur4gmishr4/vscode-FaultLine-Extension.git
cd vscode-FaultLine-Extension
npm ci
npm run vendor:sync`,
    },

    { type: 'h3', text: 'Quality gates' },
    {
      type: 'code',
      text: `npm run lint
npm test -- --coverage
npm run test:integration
npm run compile`,
    },
    {
      type: 'p',
      text: 'Optional: npm run package:prod',
    },

    { type: 'h3', text: 'Project map' },
    {
      type: 'table',
      headers: ['Path', 'What lives there'],
      rows: [
        [
          'src/application/runtime/faultline.ts',
          'Failure and success handling',
        ],
        [
          'src/infrastructure/detectors/',
          'Terminal, task, diagnostics',
        ],
        [
          'src/infrastructure/services/',
          'Explainer backends, webhooks, Jira',
        ],
        ['src/infrastructure/security/pii.ts', 'Redaction'],
        ['src/presentation/', 'Commands and webviews'],
        ['src/shared/config/', 'Settings, secrets, constants'],
        ['src/test/', 'Jest tests'],
        ['resources/vendor/', 'Packaged webview assets'],
        ['scripts/sync-vendor.js', 'Vendor copy'],
        ['scripts/make-docs-gifs.py', 'Docs GIFs'],
      ],
    },

    { type: 'h3', text: 'Coding guidelines' },
    {
      type: 'ol',
      items: [
        'Prefer typed code; avoid any in production src/',
        'Small functions with one job',
        'Comments explain why, not what',
        'Do not log secrets or full model replies at info',
        'Webhooks stay HTTPS and SSRF-safe',
        'Add tests when you change detectors, SSRF, or settings trust',
      ],
    },

    { type: 'h3', text: 'Docs to update when behavior changes' },
    {
      type: 'table',
      headers: ['Change type', 'Update'],
      rows: [
        ['User-visible feature', 'README.md and CHANGELOG.md'],
        ['Security or privacy', 'SECURITY.md and CHANGELOG.md'],
        ['Structure or flow', 'ARCHITECTURE.md'],
        ['Scripts or setup', 'CONTRIBUTING.md'],
      ],
    },

    { type: 'h3', text: 'Commit style' },
    {
      type: 'code',
      text: `fix(terminal): wait for stream drain before reading exitCode

docs: describe fault explainer before notifier features`,
    },

    { type: 'h3', text: 'Release process (maintainers)' },
    {
      type: 'ol',
      items: [
        'Keep package.json version and EXTENSION.VERSION aligned',
        'Update CHANGELOG.md',
        'Push main when green',
        'Tag vX.Y.Z so Actions attaches faultline.vsix',
        'Marketplace publish is separate (vsce publish)',
      ],
    },

    { type: 'h3', text: 'Media' },
    {
      type: 'p',
      text: 'Only three GIFs. Rules live in docs/media/README.md in the extension repo.',
    },
  ],
}
