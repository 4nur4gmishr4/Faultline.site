# FaultLine — Developer payment details

Fill every field you want live on `/donate`.  
Leave a line blank or write `SKIP` to omit that method.  
When done, paste this whole file back in chat (or only the filled sections).

**Privacy:** Do not commit real account numbers to a public repo unless you intend them to be public. Prefer env vars (`VITE_DONATE_*`) for production.

---

## A. Identity

| Field | Your answer |
|-------|-------------|
| Display name on page | Anurag Mishra |
| Public email (optional) | |

---

## B. UPI — **0% cut** (recommended primary for India)

| Field | Your answer |
|-------|-------------|
| UPI VPA (e.g. `name@oksbi`) | |
| UPI display name (optional) | |
| QR image path under `public/` (optional, e.g. `/donate/upi-qr.png`) | |
| Enable UPI deep link with amount? (`yes` / `no`) | yes |

---

## C. Bank transfer (IMPS / NEFT) — **0% app cut**

| Field | Your answer |
|-------|-------------|
| Account holder name | |
| Account number | |
| IFSC | |
| Bank name | |
| Branch (optional) | |
| Account type (savings / current, optional) | |

---

## D. Crypto — **0% platform** (sender pays network fee only)

| Field | Your answer |
|-------|-------------|
| Network / coin (e.g. `BTC`, `ETH`, `USDT-TRC20`, `USDT-ERC20`) | |
| Wallet address | |
| Second network (optional) | |
| Second address (optional) | |
| Warning text extra (optional) | |

---

## E. GitHub Sponsors — **0% GitHub fee** (personal sponsors)

| Field | Your answer |
|-------|-------------|
| Sponsors URL (e.g. `https://github.com/sponsors/4nur4gmishr4`) | https://github.com/sponsors/4nur4gmishr4 |
| Sponsors profile enabled? (`yes` / `no` / `not yet`) | |

---

## F. Razorpay / India PG — **~2% + GST on fee** (optional)

| Field | Your answer |
|-------|-------------|
| Payment link URL | |
| Show on page? (`yes` / `no`) | no |

---

## G. Stripe — **~2.9% + fixed** (optional, country-dependent)

| Field | Your answer |
|-------|-------------|
| Payment link URL | |
| Show on page? (`yes` / `no`) | no |

---

## H. Amounts (defaults already on site)

| Field | Your answer (or leave default) |
|-------|--------------------------------|
| Presets INR | 50, 100, 200, 500, 1000 |
| Default selected | 100 |
| Allow custom amount | yes |
| Soft minimum custom INR (optional) | 10 |

---

## I. Page copy (optional overrides)

| Field | Your answer |
|-------|-------------|
| One-line thank-you | |
| Prefer zero-fee methods first? (`yes` / `no`) | yes |

---

## Env map (for later / CI)

```bash
VITE_DONATE_UPI=
VITE_DONATE_UPI_QR=
VITE_DONATE_BANK_NAME=
VITE_DONATE_BANK_ACCOUNT=
VITE_DONATE_BANK_IFSC=
VITE_DONATE_BANK_BANK=
VITE_DONATE_CRYPTO_NETWORK=
VITE_DONATE_CRYPTO_ADDRESS=
VITE_DONATE_GITHUB_SPONSORS=https://github.com/sponsors/4nur4gmishr4
VITE_DONATE_RAZORPAY=
VITE_DONATE_STRIPE=
```

---

## Checklist before go-live

- [ ] UPI tested with ₹1 to yourself  
- [ ] Bank IFSC double-checked  
- [ ] Crypto network matches address type  
- [ ] GitHub Sponsors page is public  
- [ ] You accept that UPI/bank/crypto details will be visible to anyone on the site  

Paste the filled form when ready — I’ll wire everything into `src/data/donate.ts`.
