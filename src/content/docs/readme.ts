import type { DocPageContent } from './types'

/** Text from FaultLine README.md — product overview. */
export const readmeDoc: DocPageContent = {
  id: 'readme',
  title: 'Overview',
  description: 'What FaultLine is, install, commands, and settings.',
  blocks: [
    {
      type: 'lead',
      text: 'Debugger and fault explainer for VS Code. Understand terminal and task failures first. Optional sounds and notifications second.',
    },
    {
      type: 'p',
      text: 'Version 3.5.0 · Extension id 4nur4gmishr4.fahh · VS Code ^1.93 · By Anurag Mishra',
    },

    { type: 'h2', text: 'What FaultLine is' },
    {
      type: 'p',
      text: 'First: a debugger and fault explainer. When a terminal command or task fails, FaultLine keeps the failure context and helps you understand it — including optional model-backed explanation when you ask.',
    },
    {
      type: 'p',
      text: 'Second: an error notifier. Optional sounds, status bar, toasts, webhooks, and Jira so you notice failures without staring at the panel.',
    },
    {
      type: 'p',
      text: 'Built by Anurag Mishra for developers who ship.',
    },

    { type: 'h3', text: 'Primary job: catch the fault and explain it' },
    {
      type: 'ol',
      items: [
        'Detects failing terminals, tasks, and optionally diagnostics',
        'Stores a sanitized copy of the last failure (command + output when available)',
        'Opens Analyze Last Failure when you want a clear explanation and follow-up chat',
        'Supports GitHub Copilot (no key) or other providers you configure',
        'Redacts common secrets before any outbound explanation request',
      ],
    },

    { type: 'h3', text: 'Secondary job: notify you' },
    {
      type: 'list',
      items: [
        'Optional failure and success sounds',
        'Status bar + daily fail count',
        'Snooze, quiet hours, cooldowns',
        'Optional HTTPS webhooks and opt-in Jira',
      ],
    },
    {
      type: 'p',
      text: 'Auto-open of the analysis panel stays off by default. You choose when to open it.',
    },

    { type: 'h2', text: 'What you get' },
    {
      type: 'table',
      headers: ['You want…', 'FaultLine does…'],
      rows: [
        ['Understand a failed command', 'Keeps last failure and opens analysis on demand'],
        ['Debug without copy-paste', 'Passes command + output (redacted) into the explainer'],
        [
          'Pick your model backend',
          'Copilot, OpenRouter, Groq, Gemini, OpenAI, Anthropic, and more',
        ],
        ['Notice fails while coding', 'Optional sounds, status bar, notifications'],
        [
          'Stay careful with data',
          'Auto analysis off; keys in SecretStorage; HTTPS webhooks only',
        ],
      ],
    },

    { type: 'h2', text: 'Install' },
    { type: 'h3', text: 'Marketplace' },
    {
      type: 'ol',
      items: [
        'Open VS Code',
        'Extensions, search FaultLine',
        'Install',
      ],
    },
    {
      type: 'p',
      text: 'You will see FaultLine as the title. Under the hood the extension id is 4nur4gmishr4.fahh (kept stable so updates and download history stay on the same listing).',
    },
    {
      type: 'callout',
      text: 'Install from the GitHub Release VSIX if the Marketplace page is not live yet in your region. An old “retired” badge was a shields.io false positive when the listing is empty — not the product status.',
    },

    { type: 'h3', text: 'GitHub Release (VSIX)' },
    {
      type: 'ol',
      items: [
        'Download fahh-3.5.0.vsix or faultline.vsix from Releases v3.5.0',
        'Extensions view → menu → Install from VSIX…',
      ],
    },

    { type: 'h3', text: 'First install' },
    {
      type: 'p',
      text: 'On first install you see a short typed greeting from Anurag Mishra, then the welcome screen. Press Skip anytime under the text to jump to the welcome screen.',
    },
    {
      type: 'p',
      text: 'Reopen later with FaultLine: Show Welcome Screen (no typing intro).',
    },

    { type: 'h3', text: 'First setup' },
    {
      type: 'ol',
      items: [
        'Command Palette',
        'FaultLine: Open Configuration',
        'Keep Copilot or pick a provider and save a key',
        'Test a sound if you want notifications',
        'Run a failing command, then FaultLine: Analyze Last Failure',
      ],
    },

    { type: 'h2', text: 'Commands' },
    {
      type: 'table',
      headers: ['Command', 'What it does'],
      rows: [
        ['FaultLine: Analyze Last Failure', 'Open the fault explainer for the last error'],
        ['FaultLine: Open Configuration', 'Settings (providers, sounds, basics)'],
        ['FaultLine: Toggle Enable / Disable', 'Master on/off'],
        ['FaultLine: Toggle Sounds', 'Sounds only'],
        ['FaultLine: Snooze', 'Quiet notifications for a while'],
        ['FaultLine: Show Output Log', 'Extension log channel'],
        ['FaultLine: Factory Reset', 'Clear settings, history, and stored keys'],
        ['FaultLine: Show Welcome Screen', 'Welcome UI without typing intro'],
      ],
    },

    { type: 'h2', text: 'Settings you will use most' },
    {
      type: 'p',
      text: 'Open FaultLine: Open Configuration, or search settings: @ext:4nur4gmishr4.fahh',
    },
    {
      type: 'table',
      headers: ['Setting', 'Meaning', 'Default'],
      rows: [
        ['faultline.enabled', 'Master switch', 'on'],
        ['faultline.errorExplanation.enabled', 'Allow fault explanation panel', 'on'],
        [
          'faultline.errorExplanation.autoShow',
          'Open explainer automatically on fail',
          'off',
        ],
        ['faultline.aiProvider', 'Explanation backend', 'copilot'],
        [
          'faultline.ai.model',
          'Model id when not using Copilot',
          'free OpenRouter default',
        ],
        ['faultline.aiSummary.enabled', 'Short summary line in the log', 'off'],
        ['faultline.soundsEnabled', 'Play sounds', 'on'],
        ['faultline.volume', 'Volume 0 to 100', '100'],
        ['faultline.soundPack', 'Failure sound file', 'built-in pack'],
        ['faultline.successEnabled', 'Success sound', 'configurable'],
        ['faultline.cooldownMs', 'Min gap between sounds', '2000'],
        ['faultline.ignorePatterns', 'Skip matching failures (regex)', 'empty'],
        ['faultline.webhookUrl', 'Outbound notify URL', 'empty (https only)'],
        ['faultline.jiraEnabled', 'Create Jira issues on fail', 'off'],
      ],
    },
    {
      type: 'p',
      text: 'More options (quiet hours, sources, branch filters, allowlists) are in VS Code Settings via Open all FaultLine settings.',
    },

    { type: 'h2', text: 'Privacy and safety' },
    {
      type: 'list',
      items: [
        'Explanation auto-open is off. You open analysis when you want.',
        'API keys use VS Code SecretStorage.',
        'Common secrets are redacted before outbound explanation calls (best effort).',
        'Webhooks require https://. Private hosts need an allowlist.',
        'Jira is off until you enable it; Atlassian hosts only.',
        'Factory Reset deletes stored keys.',
      ],
    },

    { type: 'h2', text: 'What is new in 3.5.0' },
    {
      type: 'list',
      items: [
        'Reliable terminal and task failure capture',
        'Fault explainer with last-failure context and optional providers',
        'Safer defaults for auto-open analysis and Jira',
        'Stronger outbound URL checks (HTTPS, DNS, IP pin)',
        'Slim VSIX, automated tests, multi-OS CI, GitHub Releases',
        'First-install greeting with Skip',
      ],
    },

    { type: 'divider' },
    { type: 'h2', text: 'For developers and contributors' },
    {
      type: 'p',
      text: 'Build, review, or extend FaultLine.',
    },

    { type: 'h3', text: 'Architecture at a glance' },
    {
      type: 'code',
      text: `Terminal / Task / Diagnostics
            |
            v
     FaultLineRuntime.handleFailure
            |
    +-------+--------+----------+----------+
    v       v        v          v          v
  Mute?   PII     History    Sound     Webhook
  Branch  sanitize (capped)  (optional) / Jira
  Ignore
            |
            v
     Explainer panel (on demand, or auto if enabled)`,
    },
    {
      type: 'table',
      headers: ['Layer', 'Folder', 'Role'],
      rows: [
        ['Entry', 'src/extension.ts', 'Activate, config reload, migrations'],
        ['Runtime', 'src/application/runtime/', 'Failure and success handling'],
        ['Detectors', 'src/infrastructure/detectors/', 'Terminal, task, diagnostics'],
        [
          'Services',
          'src/infrastructure/services/',
          'Explainer backends, webhooks, Jira',
        ],
        ['Security', 'src/infrastructure/security/', 'Redaction helpers'],
        ['UI', 'src/presentation/', 'Commands, webviews, status bar'],
        ['Shared', 'src/shared/', 'Config, secrets, scheduler, i18n'],
      ],
    },

    { type: 'h3', text: 'Local development' },
    {
      type: 'code',
      text: `git clone https://github.com/4nur4gmishr4/vscode-FaultLine-Extension.git
cd vscode-FaultLine-Extension
npm ci
npm run vendor:sync
npm run lint
npm test -- --coverage
npm run compile`,
    },
    {
      type: 'p',
      text: 'Press F5 for the Extension Development Host, or npm run package:prod.',
    },
    {
      type: 'table',
      headers: ['Script', 'Purpose'],
      rows: [
        ['vendor:sync', 'Copy webview assets into resources/vendor'],
        ['lint', 'Typecheck and ESLint'],
        ['test', 'Jest tests'],
        ['test:integration', 'Activate smoke tests'],
        ['compile', 'Bundle to out/extension.js'],
        ['package:prod', 'Clean, vendor, compile, package VSIX'],
        ['docs:gifs', 'Regenerate docs media GIFs'],
      ],
    },

    { type: 'h3', text: 'Security notes for engineers' },
    {
      type: 'table',
      headers: ['Control', 'Behavior'],
      rows: [
        ['Secrets', 'SecretStorage'],
        [
          'Webhooks',
          'HTTPS only, private host block, DNS re-check, connect IP pin and SNI',
        ],
        ['Jira', 'Opt-in, HTTPS, Atlassian hosts, origin-only URL'],
        ['Explainer egress', 'Redaction plus payload size caps'],
        ['Settings webview', 'Allowlisted keys, key format checks'],
        ['Pack sound test', 'Basename only under resources/packs'],
      ],
    },

    { type: 'h3', text: 'Tests and CI' },
    {
      type: 'list',
      items: [
        'Jest unit and integration smoke tests',
        'GitHub Actions on Windows, Linux, macOS',
        'Release workflow on v* tags packages the Marketplace VSIX (fahh-*.vsix)',
        'CodeQL and pinned TruffleHog',
      ],
    },

    { type: 'h3', text: 'Project links' },
    {
      type: 'table',
      headers: ['', 'URL'],
      rows: [
        [
          'Marketplace',
          'https://marketplace.visualstudio.com/items?itemName=4nur4gmishr4.fahh',
        ],
        ['Source', 'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension'],
        [
          'Releases',
          'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension/releases',
        ],
        [
          'Issues',
          'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension/issues',
        ],
        ['License', 'MIT'],
      ],
    },
  ],
}
