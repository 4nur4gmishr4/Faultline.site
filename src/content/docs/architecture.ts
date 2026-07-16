import type { DocPageContent } from './types'

/** Text from FaultLine ARCHITECTURE.md. */
export const architectureDoc: DocPageContent = {
  id: 'architecture',
  title: 'Architecture',
  description: 'How the extension is structured.',
  blocks: [
    {
      type: 'lead',
      text: 'How FaultLine is built. Part 1 is a product map in simple language. Part 2 covers folders, lifecycle, and packaging for contributors.',
    },

    { type: 'h2', text: 'Part 1. Simple map' },

    { type: 'h3', text: 'Product order' },
    {
      type: 'ol',
      items: [
        'Debugger and fault explainer — Capture failure context. Explain on demand (or auto if the user enables it).',
        'Error notifier — Optional sound, status bar, toast, webhook, Jira.',
      ],
    },
    {
      type: 'p',
      text: 'FaultLine is a VS Code extension (no separate server). It runs in the editor host.',
    },
    {
      type: 'code',
      text: `Terminal / Task / Diagnostics
        → Detectors
        → FaultLineRuntime
            → History
            → Explainer
            → Sound
            → Webhook / Jira
            → Status bar / toast`,
    },

    { type: 'h3', text: 'Main pieces' },
    {
      type: 'table',
      headers: ['Piece', 'Job'],
      rows: [
        ['Detectors', 'Emit failure (and optional success) events'],
        ['Runtime', 'Sanitize, mute, store history, fan out'],
        ['Scheduler', 'Snooze, quiet hours, sound cooldowns'],
        ['Explainer service', 'Talk to Copilot or HTTP providers'],
        ['Webhook service', 'HTTPS outbound and optional Jira'],
        ['Webviews', 'Settings, Error Analysis, Welcome'],
        ['Secret manager', 'Provider and integration keys'],
      ],
    },

    { type: 'h3', text: 'Failure path (runtime order)' },
    {
      type: 'ol',
      items: [
        'Detector fires (shell / task / terminal / diagnostics)',
        'Full mute check (disabled, snooze, quiet hours, focus)',
        'Redact label and output',
        'Ignore patterns and branch patterns (branch fails closed if unknown)',
        'Optional sound (cooldown / max-per-minute)',
        'History (capped, redacted)',
        'Webhook / Jira if configured',
        'Status bar and notification',
        'Explainer panel if enabled and auto-show is on (default: user opens it)',
      ],
    },

    { type: 'divider' },
    { type: 'h2', text: 'Part 2. Technical map' },

    { type: 'h3', text: 'Repository layout' },
    {
      type: 'code',
      text: `src/
  extension.ts                      # activate / deactivate / config reload
  application/
    runtime/faultline.ts            # handleFailure / handleSuccess
    core/                           # AudioPlayer, SoundResolver, WSL
  infrastructure/
    detectors/                      # terminal, task, diagnostic
    services/                       # explainer providers, webhooks, Jira
    security/pii.ts
    state/stateStore.ts
  presentation/
    commands/                       # sound / state / UI commands
    ui/                             # settings, error analysis, welcome, status bar
  shared/
    config/                         # ConfigManager, SecretManager, constants
    utils/                          # scheduler, history, logger, i18n, git
  test/                             # Jest unit + integration smoke
resources/
  packs/                            # built-in audio
  vendor/                           # toolkit and codicon assets
  faultline-logo.png
scripts/
  sync-vendor.js
  make-docs-gifs.py
docs/media/                         # logo-pulse, terminal-fail, how-it-works`,
    },

    { type: 'h3', text: 'Detectors' },
    {
      type: 'table',
      headers: ['Detector', 'Source id', 'Mechanism'],
      rows: [
        [
          'TerminalDetector',
          'shell',
          'Shell execution start/end, read() buffer, exitCode, commandLine, WeakMap',
        ],
        [
          'TerminalDetector',
          'terminal',
          'Terminal closed with non-zero exit',
        ],
        [
          'TaskDetector',
          'task',
          'Task process start/end, optional success, branch filter',
        ],
        [
          'DiagnosticDetector',
          'diagnostics',
          'Debounced diagnostics + threshold',
        ],
      ],
    },
    {
      type: 'p',
      text: 'Detectors use a live config getter. Config changes do not rebind listeners by default (affectsDetectors is false).',
    },

    { type: 'h3', text: 'Runtime' },
    {
      type: 'p',
      text: 'Public surface for commands includes configManager, secretManager, scheduler, player, resolver, history, ai, webhook, errorExplanation, statusBar, and extensionPath. Dispose is idempotent.',
    },

    { type: 'h3', text: 'Configuration' },
    {
      type: 'list',
      items: [
        'Section: faultline.*',
        'ConfigManager clamps numbers and compiles ignore regexes (count and length caps)',
        'Settings webview writes allowlisted keys only',
        'Secrets stay in SecretStorage',
      ],
    },

    { type: 'h3', text: 'Explainer providers' },
    {
      type: 'p',
      text: 'Registry in aiProviders.ts:',
    },
    {
      type: 'list',
      items: [
        'Builtin: Copilot via vscode.lm',
        'HTTP: OpenRouter, Groq, Gemini, Hugging Face, Mistral, Together, Cohere, OpenAI, Anthropic',
      ],
    },
    {
      type: 'p',
      text: 'Chat path: redact → load key when required → timeout wrapper. Tests mock fetch and check URL and auth shapes.',
    },

    { type: 'h3', text: 'Webhooks and Jira' },
    {
      type: 'code',
      text: `postWebhook
  → evaluateWebhookUrlResolved
  → https.request({ host: connectHost IP, servername: original host })
  → retries re-run DNS and pin

jiraEnabled?
  → evaluateJiraUrl
  → Basic auth email + SecretStorage token
  → POST {origin}/rest/api/3/issue
  → rate limit 30s`,
    },

    { type: 'h3', text: 'UI / webviews' },
    {
      type: 'table',
      headers: ['Panel', 'Purpose'],
      rows: [
        ['Settings', 'Core config and provider keys'],
        ['Error Analysis', 'Fault explainer and follow-up chat'],
        [
          'Welcome',
          'First install greeting (optional) then setup UI',
        ],
      ],
    },

    { type: 'h3', text: 'Welcome / first install' },
    {
      type: 'code',
      text: `First install (or major version jump)
  → WelcomePanel.createOrShow(uri, withIntro: true)
  → Typing greeting (Anurag Mishra, for developers who ship)
  → Skip under the text  OR  typing finishes
  → Main welcome body

Command: FaultLine: Show Welcome Screen
  → createOrShow(uri, withIntro: false)`,
    },
    {
      type: 'p',
      text: 'localResourceRoots = resources only.',
    },

    { type: 'h3', text: 'Packaging' },
    {
      type: 'table',
      headers: ['Step', 'Output'],
      rows: [
        ['npm run vendor:sync', 'resources/vendor/**'],
        ['npm run compile', 'out/extension.js'],
        [
          'vsce package',
          'Slim VSIX; no src, coverage, or node_modules tree',
        ],
      ],
    },

    { type: 'h3', text: 'Testing' },
    {
      type: 'table',
      headers: ['Layer', 'Examples'],
      rows: [
        [
          'Unit',
          'SSRF, redaction, detectors, handleFailure, i18n, sound path',
        ],
        ['Integration smoke', 'activate() and command registration'],
        ['CI', 'Multi-OS lint/test/compile, VSIX checks'],
        ['Release', 'Tag v* attaches faultline.vsix'],
      ],
    },

    { type: 'h3', text: 'Extension points' },
    {
      type: 'table',
      headers: ['Want to…', 'Start here'],
      rows: [
        [
          'New detector',
          'infrastructure/detectors/ + runtime register',
        ],
        ['New explainer provider', 'aiProviders.ts + tests'],
        [
          'New setting',
          'package.json + ConfigManager + types',
        ],
        [
          'New command',
          'presentation/commands/* + package.nls.json',
        ],
      ],
    },
  ],
}
