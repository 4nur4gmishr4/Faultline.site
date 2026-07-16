import { useEffect, useState } from 'react'
import {
  type CurrencyCode,
  CURRENCIES,
  currencyForCountry,
} from '../data/donate'

export type GeoState = {
  loading: boolean
  error: string | null
  countryCode: string | null
  countryName: string | null
  /** Detected from IP / locale */
  suggestedCurrency: CurrencyCode
  /**
   * Units of each currency per 1 INR.
   * INR is always 1. Missing keys fall back to approx static rates.
   */
  ratesFromInr: Partial<Record<CurrencyCode, number>>
}

/** Offline fallback if APIs fail (approx; only for UX until fetch works). */
const FALLBACK_FROM_INR: Partial<Record<CurrencyCode, number>> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  JPY: 1.8,
  AUD: 0.018,
  CAD: 0.016,
  SGD: 0.016,
  AED: 0.044,
  NPR: 1.6,
  PKR: 3.3,
  BDT: 1.4,
  LKR: 3.6,
}

function withTimeout(ms: number): AbortSignal {
  const c = new AbortController()
  window.setTimeout(() => c.abort(), ms)
  return c.signal
}

async function fetchGeo(): Promise<{
  countryCode: string | null
  countryName: string | null
}> {
  try {
    const res = await fetch('https://ipwho.is/', {
      signal: withTimeout(6000),
    })
    if (!res.ok) throw new Error('geo http')
    const data = (await res.json()) as {
      success?: boolean
      country_code?: string
      country?: string
    }
    if (data.success === false) throw new Error('geo fail')
    return {
      countryCode: data.country_code ?? null,
      countryName: data.country ?? null,
    }
  } catch {
    // Locale heuristic
    const lang = navigator.language || 'en-US'
    if (lang.toLowerCase().includes('-in') || lang.toLowerCase() === 'hi') {
      return { countryCode: 'IN', countryName: 'India' }
    }
    const region = lang.split('-')[1]?.toUpperCase() ?? null
    return {
      countryCode: region,
      countryName: region,
    }
  }
}

async function fetchRatesFromInr(): Promise<Partial<Record<CurrencyCode, number>>> {
  // Frankfurter subset (ECB) — fill others from fallback
  const frankfurter = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD'] as const
  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=INR&to=${frankfurter.join(',')}`,
      { signal: withTimeout(7000) }
    )
    if (!res.ok) throw new Error('fx http')
    const data = (await res.json()) as { rates?: Record<string, number> }
    const rates: Partial<Record<CurrencyCode, number>> = {
      ...FALLBACK_FROM_INR,
      INR: 1,
    }
    for (const [k, v] of Object.entries(data.rates ?? {})) {
      if (k in CURRENCIES && typeof v === 'number') {
        rates[k as CurrencyCode] = v
      }
    }
    return rates
  } catch {
    return { ...FALLBACK_FROM_INR, INR: 1 }
  }
}

export function useGeoCurrency(): GeoState {
  const [state, setState] = useState<GeoState>({
    loading: true,
    error: null,
    countryCode: null,
    countryName: null,
    suggestedCurrency: 'USD',
    ratesFromInr: { INR: 1, ...FALLBACK_FROM_INR },
  })

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const [geo, rates] = await Promise.all([fetchGeo(), fetchRatesFromInr()])
        if (cancelled) return
        const suggested = currencyForCountry(geo.countryCode)
        setState({
          loading: false,
          error: null,
          countryCode: geo.countryCode,
          countryName: geo.countryName,
          suggestedCurrency: suggested,
          ratesFromInr: rates,
        })
      } catch {
        if (cancelled) return
        setState((s) => ({
          ...s,
          loading: false,
          error: 'Could not detect location. Using USD defaults.',
          suggestedCurrency: 'USD',
          ratesFromInr: { INR: 1, ...FALLBACK_FROM_INR },
        }))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
