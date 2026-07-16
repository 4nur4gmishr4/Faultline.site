import type { DocPageContent } from './types'

/** Text from FaultLine CHANGELOG.md. */
export const changelogDoc: DocPageContent = {
  id: 'changelog',
  title: 'Changelog',
  description: 'Release notes for FaultLine.',
  blocks: [
    {
      type: 'lead',
      text: 'Notable changes to FaultLine. Newest first. Plain language first, technical detail second.',
    },

    { type: 'h2', text: '3.5.0 — Production release' },
    {
      type: 'p',
      text: 'Focus: debugger and fault explainer first; error notifier second.',
    },
    {
      type: 'callout',
      text: 'Marketplace identity (do not change): users install FaultLine (displayName). Extension id stays 4nur4gmishr4.fahh so downloads and updates keep working. The package name is fahh on purpose.',
    },
    {
      type: 'p',
      text: 'Release: v3.5.0 on GitHub (tag v3.5.0).',
    },

    { type: 'h3', text: 'For everyone' },
    {
      type: 'list',
      items: [
        'Stronger capture of terminal and task failures',
        'Analyze Last Failure keeps command and output for explanation',
        'Auto-open analysis stays off unless you enable it',
        'Optional sounds, status bar, snooze (notifier features, secondary)',
        'Factory Reset clears settings, history, and stored API keys',
        'Slimmer install package',
        'First install: typed greeting from Anurag Mishra, then welcome screen, with Skip',
        'Commands and Settings stay available even if a detector or VS Code API is missing',
        'Settings UI: sounds, notifications, status bar, and explanation privacy toggles',
        'Activation no longer rethrows after commands register (avoids dead palette commands)',
        'Explicit onCommand activation for reliable palette use; emergency handlers if startup fails hard',
        'Commands use safe fire-and-forget registration; workspace extension host only',
        'README badges no longer hit Marketplace “retired” false positives when listing is empty',
      ],
    },

    { type: 'h3', text: 'For power users' },
    {
      type: 'list',
      items: [
        'Webhooks: HTTPS only; private hosts blocked unless allowlisted',
        'Ignore patterns, cooldowns, max-per-minute, quiet hours, branch filters',
        'Branch filter fails closed if the git branch cannot be read',
        'Jira is opt-in, rate limited, Atlassian hosts only',
      ],
    },

    { type: 'h3', text: 'For engineers' },
    {
      type: 'table',
      headers: ['Area', 'Highlights'],
      rows: [
        [
          'Terminal',
          'execution.read(), commandLine, end exitCode, WeakMap concurrency, output cap',
        ],
        [
          'Explainer',
          'Last failure context, provider registry, redaction, payload caps',
        ],
        [
          'Security',
          'SSRF DNS re-check, connect IP pin and SNI, SecretStorage',
        ],
        [
          'Privacy',
          'errorExplanation.autoShow default false; aiSummary.enabled default false',
        ],
        [
          'Reliability',
          'Commands registered before detectors; API guards; runCommand error boundary',
        ],
        [
          'Packaging',
          'resources/vendor/*, VSIX without node_modules tree, CI package smoke',
        ],
        [
          'Tests',
          'Detectors, handleFailure, command e2e, SSRF/Jira, factory reset, AI, activate smoke',
        ],
        [
          'Welcome',
          'Typing intro on first install only; Skip; command palette skips intro',
        ],
      ],
    },

    { type: 'h3', text: 'Upgrade notes' },
    {
      type: 'table',
      headers: ['If you used…', 'Do this'],
      rows: [
        ['HTTP webhooks', 'Use https://'],
        [
          'Auto analysis popups',
          'Set faultline.errorExplanation.autoShow to true if you still want them',
        ],
        ['Factory Reset', 'Re-enter provider and Jira keys'],
        ['Settings sound test', 'Built-in pack file names only'],
        [
          'Cooldown',
          'Default cooldownMs is 2000; set 0 for none',
        ],
      ],
    },

    { type: 'divider' },
    { type: 'h2', text: '3.1.0' },
    { type: 'h3', text: 'Added' },
    {
      type: 'list',
      items: [
        'Interactive chat in Error Explanation',
        'Failure context (command and output) for analysis',
        'Updated Error Analysis layout',
      ],
    },
  ],
}
