import { useEffect, useMemo, useState } from 'react'
import {
  buildDonateHref,
  CURRENCIES,
  type CurrencyCode,
  DEVELOPER_NAME,
  DONATE_LINKS,
  formatMoney,
  INR_PRESETS,
  roundDonateAmount,
} from '../data/donate'
import { useGeoCurrency } from '../hooks/useGeoCurrency'

type Mode = 'preset' | 'custom'

export function DonatePage() {
  const geo = useGeoCurrency()
  const [currency, setCurrency] = useState<CurrencyCode>('INR')
  const [mode, setMode] = useState<Mode>('preset')
  const [presetInr, setPresetInr] = useState<number>(100)
  const [customRaw, setCustomRaw] = useState('')
  const [copied, setCopied] = useState(false)

  // Apply geo-suggested currency once loaded
  useEffect(() => {
    if (!geo.loading) {
      setCurrency(geo.suggestedCurrency)
    }
  }, [geo.loading, geo.suggestedCurrency])

  const rate = geo.ratesFromInr[currency] ?? (currency === 'INR' ? 1 : 0.012)
  const meta = CURRENCIES[currency]

  const presetsLocal = useMemo(
    () =>
      INR_PRESETS.map((inr) => ({
        inr,
        local: roundDonateAmount(inr * rate, meta.decimals),
      })),
    [rate, meta.decimals]
  )

  const selectedAmount = useMemo(() => {
    if (mode === 'custom') {
      const n = Number.parseFloat(customRaw.replace(/,/g, ''))
      if (!Number.isFinite(n) || n <= 0) return 0
      return roundDonateAmount(n, meta.decimals)
    }
    const hit = presetsLocal.find((p) => p.inr === presetInr)
    return hit?.local ?? 0
  }, [mode, customRaw, presetInr, presetsLocal, meta.decimals])

  const selectedInrApprox = useMemo(() => {
    if (currency === 'INR') return selectedAmount
    if (rate <= 0) return 0
    return Math.round(selectedAmount / rate)
  }, [selectedAmount, currency, rate])

  const pay = selectedAmount > 0 ? buildDonateHref(selectedAmount, currency) : null

  const currencyChoices = useMemo(() => {
    const base: CurrencyCode[] = ['INR', 'USD']
    if (
      geo.suggestedCurrency !== 'INR' &&
      geo.suggestedCurrency !== 'USD' &&
      !base.includes(geo.suggestedCurrency)
    ) {
      base.push(geo.suggestedCurrency)
    }
    return base
  }, [geo.suggestedCurrency])

  async function copyUpi() {
    if (!DONATE_LINKS.upiId) return
    const text = `UPI: ${DONATE_LINKS.upiId}\nAmount: ${formatMoney(selectedAmount, 'INR')}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="section-pad flex w-full min-w-0 flex-col gap-10 md:gap-12">
      <header className="max-w-2xl">
        <p className="mb-5 text-mono-label uppercase tracking-[0.14em] text-secondary">
          Support
        </p>
        <h1 className="text-display-xl mb-5 text-primary">
          Free forever. Donate if you can.
        </h1>
        <p className="text-body-lg text-secondary">
          FaultLine is completely free — no paywall, no premium tier. If it
          helped you debug a bad night, you can send {DEVELOPER_NAME} a small
          thank-you. Students: start at{' '}
          <strong className="text-primary">₹50</strong> (or the local
          equivalent). Any amount is appreciated; nothing is required.
        </p>
      </header>

      <div className="grid w-full min-w-0 grid-cols-1 gap-0 border border-primary/85 lg:grid-cols-12">
        {/* Context column */}
        <aside className="border-b border-primary/85 p-5 md:p-8 lg:col-span-4 lg:border-r lg:border-b-0">
          <p className="mb-4 text-mono-label uppercase tracking-[0.12em] text-secondary">
            Location
          </p>
          {geo.loading ? (
            <p className="text-body-md text-secondary" aria-live="polite">
              Detecting region…
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-body-md text-primary">
                {geo.countryName ?? 'Unknown region'}
                {geo.countryCode ? (
                  <span className="text-secondary"> · {geo.countryCode}</span>
                ) : null}
              </p>
              <p className="text-body-md text-secondary">
                Showing amounts in{' '}
                <strong className="text-primary">{meta.name}</strong>. Presets are
                anchored to ₹50–₹1000 and converted for your currency.
              </p>
              {geo.error ? (
                <p className="text-body-md text-secondary" role="status">
                  {geo.error}
                </p>
              ) : null}
            </div>
          )}

          <div className="mt-8">
            <p className="mb-3 text-mono-label uppercase tracking-[0.12em] text-secondary">
              Currency
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Currency"
            >
              {currencyChoices.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={[
                    'brutal-btn !min-h-11 !px-4 !py-2',
                    currency === code ? 'brutal-btn-solid' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={currency === code}
                  onClick={() => {
                    setCurrency(code)
                    setMode('preset')
                    setCustomRaw('')
                  }}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-10 space-y-2 text-body-md text-secondary">
            <li>· MIT licensed · no ads</li>
            <li>· Student-friendly floor (₹50 ladder)</li>
            <li>· Custom amount anytime</li>
          </ul>
        </aside>

        {/* Amount picker */}
        <div className="min-w-0 p-5 md:p-8 lg:col-span-8">
          <p className="mb-4 text-mono-label uppercase tracking-[0.12em] text-secondary">
            Choose an amount
          </p>

          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5"
            role="listbox"
            aria-label="Suggested amounts"
          >
            {presetsLocal.map(({ inr, local }) => {
              const active = mode === 'preset' && presetInr === inr
              return (
                <button
                  key={inr}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={[
                    'flex min-h-14 flex-col items-center justify-center border border-primary/85 px-2 py-3 text-center transition-colors',
                    active
                      ? 'bg-signal text-white'
                      : 'bg-background text-primary hover:bg-primary hover:text-on-primary',
                  ].join(' ')}
                  onClick={() => {
                    setMode('preset')
                    setPresetInr(inr)
                    setCustomRaw('')
                  }}
                >
                  <span className="text-headline-md tabular-nums">
                    {formatMoney(local, currency)}
                  </span>
                  {currency !== 'INR' ? (
                    <span
                      className={[
                        'mt-1 text-mono-label tracking-[0.08em]',
                        active ? 'text-white/80' : 'text-secondary',
                      ].join(' ')}
                    >
                      ≈ ₹{inr}
                    </span>
                  ) : (
                    <span
                      className={[
                        'mt-1 text-mono-label tracking-[0.08em]',
                        active ? 'text-white/80' : 'text-secondary',
                      ].join(' ')}
                    >
                      {inr === 50
                        ? 'Student'
                        : inr === 100
                          ? 'Coffee'
                          : inr === 200
                            ? 'Snack'
                            : inr === 500
                              ? 'Lunch'
                              : 'Hero'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-8 border border-primary/85 p-4 md:p-5">
            <label
              htmlFor="custom-amount"
              className="mb-3 block text-mono-label uppercase tracking-[0.12em] text-secondary"
            >
              Custom amount ({meta.symbol} {currency})
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex min-h-12 flex-1 items-stretch border border-primary/85">
                <span
                  className="flex min-w-12 items-center justify-center border-r border-primary/85 px-3 text-mono-code text-secondary"
                  aria-hidden
                >
                  {meta.symbol}
                </span>
                <input
                  id="custom-amount"
                  type="number"
                  inputMode="decimal"
                  min={meta.decimals === 0 ? 1 : 0.5}
                  step={meta.decimals === 0 ? 1 : 0.01}
                  placeholder={
                    currency === 'INR'
                      ? 'e.g. 75'
                      : currency === 'USD'
                        ? 'e.g. 3'
                        : 'Any amount'
                  }
                  value={mode === 'custom' ? customRaw : ''}
                  onChange={(e) => {
                    setMode('custom')
                    setCustomRaw(e.target.value)
                  }}
                  onFocus={() => setMode('custom')}
                  className="w-full min-w-0 border-0 bg-transparent px-3 text-body-md text-primary outline-none placeholder:text-secondary"
                  aria-describedby="custom-hint"
                />
              </div>
            </div>
            <p id="custom-hint" className="mt-3 text-body-md text-secondary">
              Type any amount — including less than the presets if that fits your
              budget.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 border border-primary/85 bg-surface p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-mono-label uppercase tracking-[0.12em] text-secondary">
                You&apos;re sending
              </p>
              <p className="mt-2 text-headline-lg text-primary tabular-nums">
                {selectedAmount > 0
                  ? formatMoney(selectedAmount, currency)
                  : '—'}
              </p>
              {selectedAmount > 0 && currency !== 'INR' ? (
                <p className="mt-1 text-body-md text-secondary">
                  ≈ ₹{selectedInrApprox.toLocaleString('en-IN')}
                </p>
              ) : null}
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[12rem]">
              {pay ? (
                <a
                  href={pay.href}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    'brutal-btn brutal-btn-solid w-full',
                    selectedAmount <= 0 ? 'pointer-events-none opacity-40' : '',
                  ].join(' ')}
                  aria-disabled={selectedAmount <= 0}
                >
                  {pay.label}
                </a>
              ) : (
                <p className="text-body-md text-secondary">
                  Add payment links via env (
                  <code className="text-mono-code text-primary">
                    VITE_DONATE_*
                  </code>
                  ) to enable checkout.
                </p>
              )}

              {currency === 'INR' && DONATE_LINKS.upiId ? (
                <button
                  type="button"
                  className="brutal-btn w-full"
                  onClick={() => void copyUpi()}
                  disabled={selectedAmount <= 0}
                >
                  {copied ? 'Copied UPI details' : 'Copy UPI details'}
                </button>
              ) : null}
            </div>
          </div>

          <p className="mt-6 text-body-md text-secondary">
            Donations are voluntary and go to {DEVELOPER_NAME} for coffee,
            hosting, and late-night bug hunts. FaultLine stays free either way.
          </p>
        </div>
      </div>
    </div>
  )
}
