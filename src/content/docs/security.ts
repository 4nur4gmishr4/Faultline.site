import type { DocPageContent } from './types'

/** Text from FaultLine SECURITY.md. */
export const securityDoc: DocPageContent = {
  id: 'security',
  title: 'Security',
  description: 'Privacy defaults, webhooks, secrets, and reporting.',
  blocks: [
    {
      type: 'lead',
      text: 'FaultLine is a VS Code debugger and fault explainer first, and an optional error notifier second. It runs locally and may read terminal or task failure output. Security is part of the product, not an add-on.',
    },
    {
      type: 'p',
      text: 'Built by Anurag Mishra for developers who ship.',
    },

    { type: 'h2', text: 'For everyone' },

    { type: 'h3', text: 'What FaultLine can see' },
    {
      type: 'list',
      items: [
        'Terminal commands and output (when shell integration is available)',
        'Task names and exit codes',
        'Optionally, diagnostic errors in open files',
      ],
    },
    {
      type: 'p',
      text: 'Install does not need your cloud passwords. If you use explanation providers or Jira, you supply those credentials.',
    },

    { type: 'h3', text: 'Safe defaults' },
    {
      type: 'table',
      headers: ['Feature', 'Default', 'Why'],
      rows: [
        [
          'Auto-open fault explainer on every fail',
          'Off',
          'No surprise outbound requests',
        ],
        ['Short log summaries', 'Off', 'Same reason'],
        ['Jira create', 'Off', 'Opt-in only'],
        [
          'Webhooks',
          'Empty',
          'Nothing sent until you set an https URL',
        ],
      ],
    },
    {
      type: 'p',
      text: 'To explain a failure anytime: FaultLine: Analyze Last Failure.',
    },

    { type: 'h3', text: 'Where API keys live' },
    {
      type: 'list',
      items: [
        'VS Code SecretStorage (handled by the editor and OS)',
        'Not stored as plain secrets in normal settings for provider keys',
        'Factory Reset deletes those keys; you must enter them again',
      ],
    },

    { type: 'h3', text: 'What is redacted before explanation requests' },
    {
      type: 'p',
      text: 'Before text leaves for a configured provider, FaultLine tries to mask common secrets:',
    },
    {
      type: 'list',
      items: [
        'Vendor API keys (OpenAI, Anthropic, OpenRouter, Groq, Google, Hugging Face, AWS-style IDs)',
        'GitHub tokens (ghp_, gho_, and similar)',
        'JWTs, PEM private keys, Azure-style keys',
        'Emails and password / token style assignments',
        'Credentials embedded in URLs',
      ],
    },
    {
      type: 'callout',
      text: 'Redaction is best effort. If logs contain unusual secrets, turn explanation features off or avoid printing those secrets.',
    },

    { type: 'h3', text: 'Webhooks and Jira' },
    {
      type: 'list',
      items: [
        'Webhooks must use https://. HTTP is rejected.',
        'Private or local hosts are blocked unless you allowlist the host.',
        'Jira only uses Atlassian hosts (*.atlassian.net, *.jira.com) when enabled.',
      ],
    },

    { type: 'h3', text: 'Report a problem' },
    {
      type: 'ol',
      items: [
        'Do not post exploit details in a public issue.',
        'Contact Anurag Mishra (4nur4gmishr4) privately, or use GitHub Security Advisories.',
      ],
    },

    { type: 'divider' },
    { type: 'h2', text: 'For engineers' },

    { type: 'h3', text: 'Threat model' },
    {
      type: 'table',
      headers: ['Asset', 'Risk', 'Mitigation'],
      rows: [
        [
          'Terminal output',
          'Leak to explanation provider',
          'Redaction, auto-open off, size caps',
        ],
        [
          'API keys',
          'Theft via settings or disk',
          'SecretStorage, factory reset wipe',
        ],
        [
          'Webhook URL',
          'SSRF to LAN or metadata',
          'HTTPS, private host block, DNS re-check, IP pin and SNI',
        ],
        [
          'Jira URL',
          'Credential phishing',
          'Domain allowlist, HTTPS, origin-only URL',
        ],
        [
          'Settings webview',
          'Config injection',
          'Allowlisted keys, key format checks',
        ],
        [
          'Error Analysis webview',
          'Oversized or hostile payloads',
          'Schema and length caps',
        ],
        [
          'Pack sound test',
          'Path traversal',
          'Basename only under resources/packs',
        ],
      ],
    },

    { type: 'h3', text: 'Controls in code' },
    {
      type: 'table',
      headers: ['Area', 'Location / behavior'],
      rows: [
        [
          'Redaction',
          'src/infrastructure/security/pii.ts (runtime and egress)',
        ],
        [
          'Webhook gate',
          'evaluateWebhookUrl / evaluateWebhookUrlResolved',
        ],
        [
          'Jira gate',
          'evaluateJiraUrl; POST {origin}/rest/api/3/issue',
        ],
        ['Secrets', 'src/shared/config/secretManager.ts'],
        ['Settings trust', 'ALLOWED_SETTINGS_KEYS in settings panel'],
        [
          'Explainer payload caps',
          'Error Analysis and VALIDATION.AI_PAYLOAD',
        ],
      ],
    },

    { type: 'h3', text: 'Webhook connect pin' },
    {
      type: 'p',
      text: 'After DNS resolves only to public addresses:',
    },
    {
      type: 'ol',
      items: [
        'Connect TCP to the resolved IP (connectHost)',
        'Use the original hostname for TLS SNI (servername)',
        'Re-run the full check on every retry',
      ],
    },

    { type: 'h3', text: 'CI security jobs' },
    {
      type: 'table',
      headers: ['Workflow', 'Role'],
      rows: [
        [
          'ci.yml',
          'Lint, tests with coverage, compile, VSIX content checks',
        ],
        ['security.yml', 'CodeQL and pinned TruffleHog'],
        ['dependency-review.yml', 'PR dependency review'],
        [
          'release.yml',
          'Tag v* builds and attaches faultline.vsix',
        ],
      ],
    },

    { type: 'h3', text: 'Supported versions' },
    {
      type: 'p',
      text: 'Security fixes target the current release line (3.5.0 and later). Please upgrade before reporting.',
    },

    { type: 'h3', text: 'Safe testing tips' },
    {
      type: 'list',
      items: [
        'Use throwaway keys in development.',
        'Prefer Copilot or mocks in CI.',
        'Never commit tokens or real customer logs.',
        'Keep *.vsix, out/, and coverage/ out of git.',
      ],
    },
  ],
}
