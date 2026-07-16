/** Mirrors FaultLine package.nls command titles (category FaultLine). */
export const FAULTLINE_COMMANDS = [
  { id: 'faultline.explainError', title: 'Analyze Last Failure', desc: 'Open the fault explainer for the latest captured failure.' },
  { id: 'faultline.openSettings', title: 'Open Configuration', desc: 'Providers, sounds, notifications, and privacy toggles.' },
  { id: 'faultline.toggle', title: 'Toggle Enable / Disable', desc: 'Master switch for detection and notifications.' },
  { id: 'faultline.toggleSounds', title: 'Toggle Sounds (Success & Error)', desc: 'Sounds only — capture still works when muted.' },
  { id: 'faultline.toggleWorkspace', title: 'Toggle (This Workspace)', desc: 'Enable or disable for the current workspace only.' },
  { id: 'faultline.snooze', title: 'Snooze for Configured Minutes', desc: 'Quiet notifications for a while.' },
  { id: 'faultline.showOutput', title: 'Show Output Log', desc: 'FaultLine output channel for diagnostics.' },
  { id: 'faultline.showWelcome', title: 'Show Welcome Screen', desc: 'Welcome UI without the first-install typing intro.' },
  { id: 'faultline.factoryReset', title: 'Factory Reset (Clear All Data & Settings)', desc: 'Clear settings, history, and stored API keys.' },
  { id: 'faultline.resetSettings', title: 'Reset All Settings to Default', desc: 'Reset configuration without wiping secrets history alone.' },
  { id: 'faultline.test', title: 'Play Test Sound', desc: 'Play a sample failure sound from the current pack.' },
  { id: 'faultline.testSuccess', title: 'Play Test Success Sound', desc: 'Play a sample success sound.' },
  { id: 'faultline.selectSound', title: 'Select Custom Sound File...', desc: 'Pick a custom failure sound file.' },
  { id: 'faultline.selectSoundFolder', title: 'Select Sound Folder (Random)', desc: 'Random pick from a folder of sounds.' },
  { id: 'faultline.pickSoundPack', title: 'Pick Sound Pack', desc: 'Choose a built-in sound pack.' },
  { id: 'faultline.resetSound', title: 'Reset Sound to Default', desc: 'Clear custom sound path.' },
  { id: 'faultline.stop', title: 'Stop Currently Playing Sound', desc: 'Stop audio playback immediately.' },
] as const

export const MARKETPLACE_URL =
  'https://marketplace.visualstudio.com/items?itemName=4nur4gmishr4.fahh'
export const GITHUB_URL =
  'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension'
export const RELEASES_URL =
  'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension/releases/tag/v3.5.0'
export const SECURITY_URL =
  'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension/blob/main/SECURITY.md'
export const LICENSE_URL =
  'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension/blob/main/LICENSE'
export const CHANGELOG_URL =
  'https://github.com/4nur4gmishr4/vscode-FaultLine-Extension/blob/main/CHANGELOG.md'
export const EXTENSION_ID = '4nur4gmishr4.fahh'
export const VERSION = '3.5.0'

// titles match package.nls FaultLine category
