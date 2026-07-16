import { useEffect, useMemo, useState } from 'react'
import {
  bankDetailsForCopy,
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
  maskAccountNumber,
  maskIfsc,
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
  const upiHref = buildUpiHref(selectedInr > 0 ? selectedInr : undefined)

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
      return (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-body-md text-secondary">Pay to</p>
            <p className="text-body-md text-primary">{p.upiDisplayName}</p>
            <p className="mt-1 break-all">
              <code className="text-mono-code text-primary">{p.upiId}</code>
            </p>
          </div>

          {p.upiQrSrc ? (
            <div className="flex justify-center sm:justify-start">
              <img
                src={p.upiQrSrc}
                alt="UPI QR code for Anurag Mishra"
                width={176}
                height={176}
                className="h-44 w-44 border border-primary/85 bg-white p-2"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  // Hide broken image if path still wrong
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          ) : null}

          {/* Primary CTA — opens GPay / PhonePe / Paytm / BHIM / bank UPI apps */}
          {upiHref ? (
            <a
              href={upiHref}
              className="brutal-btn brutal-btn-solid w-full min-h-12"
              aria-label={
                selectedInr > 0
                  ? `Pay ${formatMoney(selectedInr, 'INR')} via UPI apps`
                  : 'Pay via UPI apps'
              }
            >
              {selectedInr > 0
                ? `Pay via UPI apps · ${formatMoney(selectedInr, 'INR')}`
                : 'Pay via UPI apps'}
            </a>
          ) : null}

          <p className="text-body-md text-secondary">
            Opens PhonePe, Google Pay, Paytm, BHIM, or your bank UPI app with
            the same VPA
            {selectedInr > 0
              ? ` and amount ${formatMoney(selectedInr, 'INR')}`
              : ''}
            . On desktop, scan the QR or copy the ID.
          </p>

          <button
            type="button"
            className="brutal-btn w-full min-h-12"
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
      )
    }

    if (methodId === 'bank') {
      return (
        <div className="flex flex-col gap-4">
          <p className="text-body-md text-secondary">
            Account numbers are hidden. Copy full details for IMPS / NEFT.
          </p>
          <dl className="space-y-2 text-body-md">
            <div>
              <dt className="text-secondary">Account name</dt>
              <dd className="text-primary">{p.bank.accountName}</dd>
            </div>
            <div>
              <dt className="text-secondary">Account number</dt>
              <dd
                className="text-mono-code text-primary tracking-wider"
                aria-label="Account number masked"
              >
                {maskAccountNumber(p.bank.accountNumber)}
              </dd>
            </div>
            <div>
              <dt className="text-secondary">IFSC</dt>
              <dd
                className="text-mono-code text-primary tracking-wider"
                aria-label="IFSC masked"
              >
                {maskIfsc(p.bank.ifsc)}
              </dd>
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
            className="brutal-btn brutal-btn-solid w-full min-h-12"
            onClick={() =>
              void copyText(
                'Bank details',
                bankDetailsForCopy(selectedInr > 0 ? selectedInr : undefined)
              )
            }
          >
            Copy full bank details
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
            className="brutal-btn brutal-btn-solid w-full min-h-12"
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
            Network:{' '}
            <strong className="text-primary">{p.crypto.network}</strong>
          </p>
          <p className="break-all text-mono-code text-primary">
            {p.crypto.address}
          </p>
          <button
            type="button"
            className="brutal-btn brutal-btn-solid w-full min-h-12"
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
    <div className="section-pad flex w-full min-w-0 flex-col gap-8 md:gap-12">
      <header className="max-w-2xl">
        <p className="mb-4 text-mono-label uppercase tracking-[0.14em] text-secondary md:mb-5">
          Support
        </p>
        <h1 className="text-display-xl mb-4 text-primary md:mb-5">
          Free forever. Donate if you can.
        </h1>
        <p className="text-body-lg text-secondary">
          FaultLine is completely free. Optional support goes to{' '}
          {DEVELOPER_NAME}. Students: from{' '}
          <strong className="text-primary">₹50</strong>. Prefer{' '}
          <strong className="text-primary">0% cut</strong> (UPI, bank).
        </p>
        <p className="mt-3 text-body-md text-secondary md:mt-4">
          {DONATE_THANK_YOU}
        </p>
      </header>

      {/* Payment methods — cards on mobile, table on md+ */}
      <section aria-labelledby="methods-title">
        <h2 id="methods-title" className="mb-3 text-headline-lg text-primary md:mb-4">
          How you can pay
        </h2>
        <p className="mb-4 max-w-2xl text-body-md text-secondary md:mb-6">
          Cut = taken before funds reach the developer. Zero-fee first.
        </p>

        {/* Mobile: stacked cards */}
        <ul className="flex flex-col gap-2 md:hidden" aria-label="Payment methods">
          {methods.map((m) => {
            const active = methodId === m.id
            return (
              <li key={m.id}>
                <button
                  type="button"
                  className={[
                    'flex w-full min-h-14 flex-col items-start gap-1 border border-primary/85 px-4 py-3.5 text-left transition-colors',
                    active
                      ? 'bg-signal text-white'
                      : 'bg-background text-primary',
                  ].join(' ')}
                  aria-pressed={active}
                  onClick={() => setMethodId(m.id)}
                >
                  <span className="text-body-md font-medium">{m.title}</span>
                  <span
                    className={[
                      'text-mono-label tracking-[0.08em]',
                      active ? 'text-white/85' : 'text-signal',
                    ].join(' ')}
                  >
                    Cut: {m.cutLabel}
                  </span>
                  <span
                    className={[
                      'text-body-md',
                      active ? 'text-white/75' : 'text-secondary',
                    ].join(' ')}
                  >
                    {m.cutDetail}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Desktop: table */}
        <div className="hidden w-full min-w-0 overflow-x-auto border border-primary/85 md:block">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead className="brutal-invert">
              <tr>
                <th className="border border-primary/85 px-4 py-3 text-mono-label font-medium tracking-[0.08em]">
                  Method
                </th>
                <th className="border border-primary/85 px-4 py-3 text-mono-label font-medium tracking-[0.08em]">
                  Cut on what you receive
                </th>
                <th className="border border-primary/85 px-4 py-3 text-mono-label font-medium tracking-[0.08em]">
                  Notes
                </th>
                <th className="border border-primary/85 px-4 py-3 text-mono-label font-medium tracking-[0.08em]">
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
                    <td className="border border-primary/85 px-4 py-3 text-body-md text-primary">
                      {m.title}
                    </td>
                    <td className="border border-primary/85 px-4 py-3">
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
                    <td className="border border-primary/85 px-4 py-3 text-body-md text-secondary">
                      {m.notes}
                    </td>
                    <td className="border border-primary/85 px-4 py-3">
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
        <aside className="border-b border-primary/85 p-4 sm:p-5 md:p-8 lg:col-span-4 lg:border-r lg:border-b-0">
          <p className="mb-3 text-mono-label uppercase tracking-[0.12em] text-secondary md:mb-4">
            Location
          </p>
          {geo.loading ? (
            <p className="text-body-md text-secondary" aria-live="polite">
              Detecting region…
            </p>
          ) : (
            <div className="space-y-2">
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

          <div className="mt-6 md:mt-8">
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

          <div className="mt-6 border border-primary/85 p-3 md:mt-10 md:p-4">
            <p className="mb-2 text-mono-label uppercase tracking-[0.12em] text-secondary">
              Active method
            </p>
            <p className="text-body-md text-primary">{activeMethod?.title}</p>
            <p className="mt-1 text-mono-label tracking-[0.08em] text-signal">
              Cut: {activeMethod?.cutLabel}
            </p>
          </div>

          <p className="mt-6 break-all text-body-md text-secondary md:mt-8">
            Questions?{' '}
            <a
              className="text-signal underline underline-offset-2"
              href={`mailto:${DEVELOPER_EMAIL}?subject=FaultLine%20support`}
            >
              {DEVELOPER_EMAIL}
            </a>
          </p>
        </aside>

        <div className="min-w-0 p-4 sm:p-5 md:p-8 lg:col-span-8">
          <p className="mb-3 text-mono-label uppercase tracking-[0.12em] text-secondary md:mb-4">
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

          <div className="mt-6 border border-primary/85 p-4 md:mt-8 md:p-5">
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
                min={
                  currency === 'INR'
                    ? CUSTOM_MIN_INR
                    : meta.decimals === 0
                      ? 1
                      : 0.5
                }
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
              <p
                id="custom-err"
                className="mt-3 text-body-md text-fault"
                role="alert"
              >
                {customError}
              </p>
            ) : (
              <p className="mt-3 text-body-md text-secondary">
                Custom min ₹{CUSTOM_MIN_INR}. Presets from ₹50 for students.
              </p>
            )}
          </div>

          <div className="mt-6 border border-primary/85 bg-surface p-4 md:mt-8 md:p-5">
            <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
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

          {/* Sticky-style mobile UPI shortcut when UPI selected */}
          {methodId === 'upi' && upiHref ? (
            <div className="mt-4 md:hidden">
              <a
                href={upiHref}
                className="brutal-btn brutal-btn-solid w-full min-h-12"
              >
                {selectedInr > 0
                  ? `Pay via UPI apps · ${formatMoney(selectedInr, 'INR')}`
                  : 'Pay via UPI apps'}
              </a>
            </div>
          ) : null}

          <p className="mt-6 text-body-md text-secondary">
            Donations are voluntary. FaultLine stays free either way.
          </p>
        </div>
      </div>
    </div>
  )
}
