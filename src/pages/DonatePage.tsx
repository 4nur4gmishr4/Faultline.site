import { useEffect, useMemo, useState } from 'react'
import {
  buildUpiHref,
  CURRENCIES,
  type CurrencyCode,
  CUSTOM_MIN_INR,
  DEFAULT_PRESET_INR,
  DEVELOPER_EMAIL,
  DEVELOPER_NAME,
  DEVELOPER_PAYMENTS,
  DONATE_THANK_YOU,
  formatMoney,
  getPaymentMethods,
  INR_PRESETS,
  type PaymentMethodId,
  roundDonateAmount,
} from '../data/donate'
import { useGeoCurrency } from '../hooks/useGeoCurrency'

type Mode = 'preset' | 'custom'

export function DonatePage() {
  const geo = useGeoCurrency()
  const methods = useMemo(() => getPaymentMethods(), [])
  const [currency, setCurrency] = useState<CurrencyCode>('INR')
  const [mode, setMode] = useState<Mode>('preset')
  const [presetInr, setPresetInr] = useState<number>(DEFAULT_PRESET_INR)
  const [customRaw, setCustomRaw] = useState('')
  const [methodId, setMethodId] = useState<PaymentMethodId>('upi')
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!geo.loading) setCurrency(geo.suggestedCurrency)
  }, [geo.loading, geo.suggestedCurrency])

  useEffect(() => {
    const preferred: PaymentMethodId[] = ['upi', 'bank', 'github', 'crypto']
    const hit = preferred.find((id) =>
      methods.find((m) => m.id === id && m.configured)
    )
    if (hit) setMethodId(hit)
  }, [methods])

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

  const customError = useMemo(() => {
    if (mode !== 'custom' || !customRaw.trim()) return null
    const n = Number.parseFloat(customRaw.replace(/,/g, ''))
    if (!Number.isFinite(n) || n <= 0) return 'Enter a valid amount.'
    if (currency === 'INR' && n < CUSTOM_MIN_INR) {
      return `Minimum custom amount is ₹${CUSTOM_MIN_INR} (or pick a preset).`
    }
    return null
  }, [mode, customRaw, currency])

  const selectedAmount = useMemo(() => {
    if (mode === 'custom') {
      const n = Number.parseFloat(customRaw.replace(/,/g, ''))
      if (!Number.isFinite(n) || n <= 0) return 0
      if (currency === 'INR' && n < CUSTOM_MIN_INR) return 0
      return roundDonateAmount(n, meta.decimals)
    }
    return presetsLocal.find((p) => p.inr === presetInr)?.local ?? 0
  }, [mode, customRaw, presetInr, presetsLocal, meta.decimals, currency])

  const selectedInr = useMemo(() => {
    if (currency === 'INR') return selectedAmount
    if (rate <= 0) return 0
    return Math.round(selectedAmount / rate)
  }, [selectedAmount, currency, rate])

  const activeMethod = methods.find((m) => m.id === methodId) ?? methods[0]

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

  async function copyText(label: string, text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopyMsg(`${label} copied`)
      window.setTimeout(() => setCopyMsg(null), 2000)
    } catch {
      setCopyMsg('Could not copy')
    }
  }

  function methodActions() {
    const p = DEVELOPER_PAYMENTS
    if (!activeMethod?.configured) {
      return (
        <p className="text-body-md text-secondary">
          This method is not available yet. Choose UPI, bank, or GitHub Sponsors.
        </p>
      )
    }

    if (methodId === 'upi') {
      const href = buildUpiHref(selectedInr > 0 ? selectedInr : 0)
      return (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-body-md text-secondary">Pay to</p>
            <p className="text-body-md text-primary">{p.upiDisplayName}</p>
            <p className="mt-1">
              <code className="text-mono-code text-primary">{p.upiId}</code>
            </p>
          </div>
          {p.upiQrSrc ? (
            <img
              src={p.upiQrSrc}
              alt="UPI QR code for Anurag Mishra"
              width={192}
              height={192}
              className="max-w-[12rem] border border-primary/85 bg-white p-2"
            />
          ) : null}
          <div className="flex flex-col gap-2 sm:flex-row">
            {href && selectedInr > 0 ? (
              <a
                href={href}
                className="brutal-btn brutal-btn-solid w-full sm:w-auto"
              >
                Open UPI · {formatMoney(selectedInr, 'INR')}
              </a>
            ) : null}
            <button
              type="button"
              className="brutal-btn w-full sm:w-auto"
              onClick={() =>
                void copyText(
                  'UPI',
                  `UPI: ${p.upiId}\nName: ${p.upiDisplayName}\nAmount: ${
                    selectedInr > 0
                      ? formatMoney(selectedInr, 'INR')
                      : '(choose amount)'
                  }\nNote: FaultLine support`
                )
              }
            >
              Copy UPI details
            </button>
          </div>
        </div>
      )
    }

    if (methodId === 'bank') {
      const block = [
        `Account name: ${p.bank.accountName}`,
        `Account number: ${p.bank.accountNumber}`,
        `IFSC: ${p.bank.ifsc}`,
        `Bank: ${p.bank.bankName}`,
        `Type: ${p.bank.accountType}`,
        selectedInr > 0
          ? `Amount: ${formatMoney(selectedInr, 'INR')}`
          : '',
        'Note: FaultLine support',
      ]
        .filter(Boolean)
        .join('\n')
      return (
        <div className="flex flex-col gap-3">
          <dl className="space-y-2 text-body-md">
            <div>
              <dt className="text-secondary">Account name</dt>
              <dd className="text-primary">{p.bank.accountName}</dd>
            </div>
            <div>
              <dt className="text-secondary">Account number</dt>
              <dd className="text-mono-code text-primary">
                {p.bank.accountNumber}
              </dd>
            </div>
            <div>
              <dt className="text-secondary">IFSC</dt>
              <dd className="text-mono-code text-primary">{p.bank.ifsc}</dd>
            </div>
            <div>
              <dt className="text-secondary">Bank</dt>
              <dd className="text-primary">{p.bank.bankName}</dd>
            </div>
            <div>
              <dt className="text-secondary">Type</dt>
              <dd className="text-primary">{p.bank.accountType}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="brutal-btn brutal-btn-solid w-full sm:w-auto"
            onClick={() => void copyText('Bank details', block)}
          >
            Copy bank details
          </button>
        </div>
      )
    }

    if (methodId === 'github') {
      return (
        <div className="flex flex-col gap-3">
          <p className="text-body-md text-secondary">
            Personal GitHub accounts: 0% GitHub fee. Best option outside India.
          </p>
          <a
            href={p.githubSponsors}
            target="_blank"
            rel="noreferrer"
            className="brutal-btn brutal-btn-solid w-full sm:w-auto"
          >
            Open GitHub Sponsors
          </a>
        </div>
      )
    }

    if (methodId === 'crypto' && p.crypto.address) {
      const block = `${p.crypto.network}\n${p.crypto.address}`
      return (
        <div className="flex flex-col gap-3">
          <p className="text-body-md text-secondary">
            Network: <strong className="text-primary">{p.crypto.network}</strong>
          </p>
          <p className="break-all text-mono-code text-primary">
            {p.crypto.address}
          </p>
          <button
            type="button"
            className="brutal-btn brutal-btn-solid w-full sm:w-auto"
            onClick={() => void copyText('Wallet', block)}
          >
            Copy address
          </button>
        </div>
      )
    }

    return null
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
          FaultLine is completely free. Optional support goes to{' '}
          {DEVELOPER_NAME}. Students: from{' '}
          <strong className="text-primary">₹50</strong>. Prefer{' '}
          <strong className="text-primary">0% cut</strong> methods (UPI, bank)
          so the full amount reaches the developer.
        </p>
        <p className="mt-4 text-body-md text-secondary">{DONATE_THANK_YOU}</p>
      </header>

      <section aria-labelledby="methods-title">
        <h2 id="methods-title" className="mb-4 text-headline-lg text-primary">
          How you can pay
        </h2>
        <p className="mb-6 max-w-2xl text-body-md text-secondary">
          Cut = taken before the developer receives funds. Zero-fee methods
          first.
        </p>
        <div className="w-full min-w-0 overflow-x-auto border border-primary/85">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead className="brutal-invert">
              <tr>
                <th className="border border-primary/85 px-3 py-3 text-mono-label font-medium tracking-[0.08em] md:px-4">
                  Method
                </th>
                <th className="border border-primary/85 px-3 py-3 text-mono-label font-medium tracking-[0.08em] md:px-4">
                  Cut on what you receive
                </th>
                <th className="border border-primary/85 px-3 py-3 text-mono-label font-medium tracking-[0.08em] md:px-4">
                  Notes
                </th>
                <th className="border border-primary/85 px-3 py-3 text-mono-label font-medium tracking-[0.08em] md:px-4">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {methods.map((m) => {
                const active = methodId === m.id
                return (
                  <tr
                    key={m.id}
                    className={active ? 'bg-signal-soft' : undefined}
                  >
                    <td className="border border-primary/85 px-3 py-3 text-body-md text-primary md:px-4">
                      {m.title}
                    </td>
                    <td className="border border-primary/85 px-3 py-3 md:px-4">
                      <span
                        className={[
                          'text-mono-label tracking-[0.08em]',
                          m.tier === 'zero' ? 'text-signal' : 'text-primary',
                        ].join(' ')}
                      >
                        {m.cutLabel}
                      </span>
                      <span className="mt-1 block text-body-md text-secondary">
                        {m.cutDetail}
                      </span>
                    </td>
                    <td className="border border-primary/85 px-3 py-3 text-body-md text-secondary md:px-4">
                      {m.notes}
                    </td>
                    <td className="border border-primary/85 px-3 py-3 md:px-4">
                      <button
                        type="button"
                        className={[
                          'brutal-btn !min-h-11 !px-4 !py-2',
                          active ? 'brutal-btn-solid' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        aria-pressed={active}
                        onClick={() => setMethodId(m.id)}
                      >
                        {active ? 'Selected' : 'Use'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid w-full min-w-0 grid-cols-1 gap-0 border border-primary/85 lg:grid-cols-12">
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
                Amounts in <strong className="text-primary">{meta.name}</strong>
                . Ladder ₹50–₹1000.
              </p>
            </div>
          )}

          <div className="mt-8">
            <p className="mb-3 text-mono-label uppercase tracking-[0.12em] text-secondary">
              Currency
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Currency">
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

          <div className="mt-10 border border-primary/85 p-4">
            <p className="mb-2 text-mono-label uppercase tracking-[0.12em] text-secondary">
              Active method
            </p>
            <p className="text-body-md text-primary">{activeMethod?.title}</p>
            <p className="mt-1 text-mono-label tracking-[0.08em] text-signal">
              Cut: {activeMethod?.cutLabel}
            </p>
          </div>

          <p className="mt-8 text-body-md text-secondary">
            Questions?{' '}
            <a
              className="text-signal underline underline-offset-2"
              href={`mailto:${DEVELOPER_EMAIL}?subject=FaultLine%20support`}
            >
              {DEVELOPER_EMAIL}
            </a>
          </p>
        </aside>

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
                  <span
                    className={[
                      'mt-1 text-mono-label tracking-[0.08em]',
                      active ? 'text-white/80' : 'text-secondary',
                    ].join(' ')}
                  >
                    {currency !== 'INR'
                      ? `≈ ₹${inr}`
                      : inr === 50
                        ? 'Student'
                        : inr === 100
                          ? 'Coffee'
                          : inr === 200
                            ? 'Snack'
                            : inr === 500
                              ? 'Lunch'
                              : 'Hero'}
                  </span>
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
                min={currency === 'INR' ? CUSTOM_MIN_INR : meta.decimals === 0 ? 1 : 0.5}
                step={meta.decimals === 0 ? 1 : 0.01}
                placeholder={
                  currency === 'INR' ? `min ₹${CUSTOM_MIN_INR}` : 'Any amount'
                }
                value={mode === 'custom' ? customRaw : ''}
                onChange={(e) => {
                  setMode('custom')
                  setCustomRaw(e.target.value)
                }}
                onFocus={() => setMode('custom')}
                className="w-full min-w-0 border-0 bg-transparent px-3 text-body-md text-primary outline-none placeholder:text-secondary"
                aria-invalid={Boolean(customError)}
                aria-describedby={customError ? 'custom-err' : undefined}
              />
            </div>
            {customError ? (
              <p id="custom-err" className="mt-3 text-body-md text-fault" role="alert">
                {customError}
              </p>
            ) : (
              <p className="mt-3 text-body-md text-secondary">
                Custom min ₹{CUSTOM_MIN_INR} in India. Presets start at ₹50 for
                students.
              </p>
            )}
          </div>

          <div className="mt-8 border border-primary/85 bg-surface p-5">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
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
                    ≈ ₹{selectedInr.toLocaleString('en-IN')}
                  </p>
                ) : null}
              </div>
              {copyMsg ? (
                <p
                  className="text-mono-label tracking-[0.1em] text-signal"
                  role="status"
                >
                  {copyMsg}
                </p>
              ) : null}
            </div>
            {methodActions()}
          </div>

          <p className="mt-6 text-body-md text-secondary">
            Donations are voluntary. FaultLine stays free either way.
          </p>
        </div>
      </div>
    </div>
  )
}
