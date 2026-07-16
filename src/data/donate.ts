/**
 * Donation config — free product, optional support for Anurag Mishra.
 * Presets in INR (student floor ₹50). Other currencies convert from INR.
 *
 * Live details from DONATE_DETAILS form. Override any field with VITE_DONATE_*.
 */

/** Student-friendly INR ladder. */
export const INR_PRESETS = [50, 100, 200, 500, 1000] as const

export type InrPreset = (typeof INR_PRESETS)[number]

/** Default selected preset (₹100 coffee). */
export const DEFAULT_PRESET_INR = 100

/** Soft floor for custom INR entry (typo guard; still student-friendly). */
export const CUSTOM_MIN_INR = 10

export const DEVELOPER_NAME = 'Anurag Mishra'
export const DEVELOPER_EMAIL = 'anuragmishrasnag06082004@gmail.com'

export const DONATE_THANK_YOU =
  'Thank you for supporting FaultLine. Every contribution helps keep the project free, improves debugging for thousands of developers, and funds future releases.'

function env(key: string): string {
  if (typeof import.meta === 'undefined') return ''
  const v = import.meta.env?.[key]
  return typeof v === 'string' && v.trim() ? v.trim() : ''
}

/**
 * Payout details (public on /donate).
 * Env wins when set; otherwise defaults from developer form.
 */
export const DEVELOPER_PAYMENTS = {
  upiId: env('VITE_DONATE_UPI') || 'anuragmishrasnag06082004@ybl',
  upiDisplayName: 'Anurag Mishra',
  upiQrSrc: env('VITE_DONATE_UPI_QR') || '/donate/upi-qr.png',
  upiDeepLink: true,

  bank: {
    accountName: env('VITE_DONATE_BANK_NAME') || 'ANURAG MISHRA',
    accountNumber: env('VITE_DONATE_BANK_ACCOUNT') || '41259966938',
    ifsc: env('VITE_DONATE_BANK_IFSC') || 'SBIN0010170',
    bankName: env('VITE_DONATE_BANK_BANK') || 'State Bank of India (SBI)',
    accountType: 'Savings',
  },

  crypto: {
    network: env('VITE_DONATE_CRYPTO_NETWORK') || '',
    address: env('VITE_DONATE_CRYPTO_ADDRESS') || '',
  },

  githubSponsors:
    env('VITE_DONATE_GITHUB_SPONSORS') ||
    'https://github.com/sponsors/4nur4gmishr4',

  razorpayLink: env('VITE_DONATE_RAZORPAY') || '',
  stripeLink: env('VITE_DONATE_STRIPE') || '',
} as const

/** @deprecated use DEVELOPER_PAYMENTS */
export const DONATE_LINKS = {
  githubSponsors: DEVELOPER_PAYMENTS.githubSponsors,
  upiId: DEVELOPER_PAYMENTS.upiId,
  paypalMe: '',
  buyMeACoffee: '',
} as const

export type PaymentMethodId =
  | 'upi'
  | 'bank'
  | 'crypto'
  | 'github'
  | 'razorpay'
  | 'stripe'

export type PaymentMethod = {
  id: PaymentMethodId
  title: string
  cutLabel: string
  cutDetail: string
  tier: 'zero' | 'low' | 'gateway'
  notes: string
  configured: boolean
}

/** Zero-fee first; gateway/crypto only if configured. */
export function getPaymentMethods(): PaymentMethod[] {
  const p = DEVELOPER_PAYMENTS
  const bankOk = Boolean(
    p.bank.accountName && p.bank.accountNumber && p.bank.ifsc
  )
  const cryptoOk = Boolean(p.crypto.address && p.crypto.network)

  const all: PaymentMethod[] = [
    {
      id: 'upi',
      title: 'UPI (VPA / QR)',
      cutLabel: '0%',
      cutDetail: 'No platform fee — full amount to you',
      tier: 'zero',
      notes: 'Best for India. Peer-to-peer to your VPA.',
      configured: Boolean(p.upiId),
    },
    {
      id: 'bank',
      title: 'Bank transfer (IMPS / NEFT)',
      cutLabel: '0%',
      cutDetail: 'No app commission',
      tier: 'zero',
      notes: 'SBI · Savings. Full amount (bank rules may apply).',
      configured: bankOk,
    },
    {
      id: 'crypto',
      title: 'Crypto to your wallet',
      cutLabel: '0% platform',
      cutDetail: 'Only network / gas fee for the sender',
      tier: 'zero',
      notes: 'Self-custody address. No tip-jar middleman.',
      configured: cryptoOk,
    },
    {
      id: 'github',
      title: 'GitHub Sponsors (person → you)',
      cutLabel: '0% GitHub fee',
      cutDetail: 'Personal sponsors — best product option abroad',
      tier: 'low',
      notes: 'Org sponsors may pay up to ~6%. Payout setup required.',
      configured: Boolean(p.githubSponsors),
    },
    {
      id: 'razorpay',
      title: 'Razorpay / India payment gateway',
      cutLabel: '~2% + GST on fee',
      cutDetail: 'Gateway fee (not free like personal UPI)',
      tier: 'gateway',
      notes: 'Cards / UPI via gateway. Optional if you need receipts.',
      configured: Boolean(p.razorpayLink),
    },
    {
      id: 'stripe',
      title: 'Stripe (if available)',
      cutLabel: '~2.9% + fixed',
      cutDetail: 'Country-dependent card processing',
      tier: 'gateway',
      notes: 'Useful for international cards. Not zero-fee.',
      configured: Boolean(p.stripeLink),
    },
  ]

  // Prefer zero-fee: hide unconfigured optional methods (crypto / gateways)
  return all.filter((m) => {
    if (m.id === 'crypto' || m.id === 'razorpay' || m.id === 'stripe') {
      return m.configured
    }
    return true
  })
}

export type CurrencyCode =
  | 'INR'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'AUD'
  | 'CAD'
  | 'SGD'
  | 'AED'
  | 'NPR'
  | 'PKR'
  | 'BDT'
  | 'LKR'

export type CurrencyMeta = {
  code: CurrencyCode
  symbol: string
  name: string
  decimals: number
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', decimals: 0 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', decimals: 2 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', decimals: 0 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', decimals: 2 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', decimals: 2 },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', decimals: 2 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', decimals: 2 },
  NPR: { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee', decimals: 0 },
  PKR: { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', decimals: 0 },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', decimals: 0 },
  LKR: { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', decimals: 0 },
}

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  UK: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  IE: 'EUR',
  PT: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  FI: 'EUR',
  JP: 'JPY',
  AU: 'AUD',
  CA: 'CAD',
  SG: 'SGD',
  AE: 'AED',
  NP: 'NPR',
  PK: 'PKR',
  BD: 'BDT',
  LK: 'LKR',
}

export function currencyForCountry(
  countryCode: string | null | undefined
): CurrencyCode {
  if (!countryCode) return 'USD'
  return COUNTRY_CURRENCY[countryCode.toUpperCase()] ?? 'USD'
}

export function roundDonateAmount(amount: number, decimals: number): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0
  if (decimals === 0) {
    if (amount < 5) return Math.max(1, Math.round(amount))
    if (amount < 50) return Math.round(amount)
    if (amount < 200) return Math.round(amount / 5) * 5
    if (amount < 1000) return Math.round(amount / 10) * 10
    return Math.round(amount / 50) * 50
  }
  const rounded = Math.round(amount * 100) / 100
  if (rounded > 0 && rounded < 0.5) return 0.5
  return rounded
}

export function formatMoney(
  amount: number,
  currency: CurrencyCode,
  locale = 'en'
): string {
  const meta = CURRENCIES[currency]
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: meta.decimals,
      maximumFractionDigits: meta.decimals,
    }).format(amount)
  } catch {
    return `${meta.symbol}${amount.toFixed(meta.decimals)}`
  }
}

export function buildUpiHref(amountInr: number): string | null {
  const upiId = DEVELOPER_PAYMENTS.upiId
  if (!upiId || !DEVELOPER_PAYMENTS.upiDeepLink || amountInr <= 0) return null
  const am = encodeURIComponent(String(Math.round(amountInr)))
  const pa = encodeURIComponent(upiId)
  const tn = encodeURIComponent('FaultLine support')
  const pn = encodeURIComponent(DEVELOPER_PAYMENTS.upiDisplayName || DEVELOPER_NAME)
  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`
}
