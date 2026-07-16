/**
 * Donation config — free product, optional support for the developer.
 * Presets are defined in INR (student-friendly floor ₹50).
 * Other currencies convert from these INR anchors.
 */

/** Student-friendly INR ladder (best for India). */
export const INR_PRESETS = [50, 100, 200, 500, 1000] as const

export type InrPreset = (typeof INR_PRESETS)[number]

export const DEVELOPER_NAME = 'Anurag Mishra'

/** Optional payment endpoints — override with Vite env when you go live. */
export const DONATE_LINKS = {
  /** e.g. github.com/sponsors/username */
  githubSponsors:
    (typeof import.meta !== 'undefined' &&
      import.meta.env?.VITE_DONATE_GITHUB_SPONSORS) ||
    'https://github.com/sponsors/4nur4gmishr4',
  /** PayPal.me handle only, no URL — e.g. "anurag" → paypal.me/anurag/10 */
  paypalMe:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DONATE_PAYPAL_ME) ||
    '',
  /** UPI VPA for India, e.g. name@upi */
  upiId:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DONATE_UPI) ||
    '',
  buyMeACoffee:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DONATE_BMC) ||
    '',
} as const

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
  /** Zero = whole units only (JPY) */
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

/** ISO country → default currency (common traffic). Unknown → USD. */
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

export function currencyForCountry(countryCode: string | null | undefined): CurrencyCode {
  if (!countryCode) return 'USD'
  return COUNTRY_CURRENCY[countryCode.toUpperCase()] ?? 'USD'
}

/**
 * Round converted amounts for display / payment.
 * Keeps student-scale values (from ₹50) readable; never invents huge jumps.
 */
export function roundDonateAmount(amount: number, decimals: number): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0
  if (decimals === 0) {
    // Whole units: prefer nice steps near student amounts
    if (amount < 5) return Math.max(1, Math.round(amount))
    if (amount < 50) return Math.round(amount)
    if (amount < 200) return Math.round(amount / 5) * 5
    if (amount < 1000) return Math.round(amount / 10) * 10
    return Math.round(amount / 50) * 50
  }
  // Major currencies with cents: keep 2dp, floor at 0.50 for tiny conversions
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

/** Build external donate URL for the selected amount (best effort, static site). */
export function buildDonateHref(
  amount: number,
  currency: CurrencyCode
): { href: string; label: string } | null {
  const { paypalMe, githubSponsors, buyMeACoffee, upiId } = DONATE_LINKS

  if (currency === 'INR' && upiId) {
    const am = encodeURIComponent(String(Math.round(amount)))
    const pa = encodeURIComponent(upiId)
    const tn = encodeURIComponent('FaultLine support')
    return {
      href: `upi://pay?pa=${pa}&am=${am}&cu=INR&tn=${tn}`,
      label: 'Pay with UPI',
    }
  }

  if (paypalMe) {
    // PayPal.me: /handle/amountCURRENCYCODE for non-USD in some regions; USD is bare amount
    const cleaned = amount.toFixed(CURRENCIES[currency].decimals)
    const path =
      currency === 'USD'
        ? `https://paypal.me/${paypalMe}/${cleaned}`
        : `https://paypal.me/${paypalMe}/${cleaned}${currency}`
    return { href: path, label: 'Pay with PayPal' }
  }

  if (buyMeACoffee) {
    return { href: buyMeACoffee, label: 'Buy Me a Coffee' }
  }

  if (githubSponsors) {
    return { href: githubSponsors, label: 'GitHub Sponsors' }
  }

  return null
}
