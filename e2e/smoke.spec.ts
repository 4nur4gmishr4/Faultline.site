// Playwright smoke suite for showcase
import { test, expect } from '@playwright/test'

test.describe('FaultLine showcase', () => {
  test('home loads without debug chrome labels', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Debugger|fault/i
    )
    await expect(page.getByText('3D_LAPTOP_CANVAS')).toHaveCount(0)
    await expect(page.getByText('SYS.STATUS')).toHaveCount(0)
  })

  test('hero CTAs and product sections', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Install' }).first()).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Keep the context. Open analysis when you choose.',
      })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Two ways in' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'FaultLine in the palette' })
    ).toBeVisible()
    await expect(page.getByText('Analyze Last Failure').first()).toBeVisible()
  })

  test('docs index and embedded readme', async ({ page }) => {
    await page.goto('/docs')
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible()
    await page.goto('/docs/readme')
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText(
      /Overview/i
    )
    await expect(page.getByText(/Could not load/i)).toHaveCount(0)
  })

  test('security and architecture docs', async ({ page }) => {
    await page.goto('/docs/security')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Security/i)
    await page.goto('/docs/architecture')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Architecture/i
    )
  })

  test('changelog contributing troubleshooting license', async ({ page }) => {
    for (const [path, title] of [
      ['/docs/changelog', /Changelog/i],
      ['/docs/contributing', /Contributing/i],
      ['/docs/troubleshooting', /Troubleshooting/i],
      ['/docs/license', /License/i],
    ] as const) {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toContainText(title)
    }
  })

  test('credits and 404', async ({ page }) => {
    await page.goto('/credits')
    await expect(page.getByRole('heading', { name: 'Credits' })).toBeVisible()
    await expect(page.getByText(/Ksenia Kondrashova/i).first()).toBeVisible()
    await page.goto('/this-route-does-not-exist-xyz')
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await expect(page.locator('a.brutal-btn', { hasText: 'Home' })).toBeVisible()
  })

  test('legacy redirects', async ({ page }) => {
    await page.goto('/security')
    await expect(page).toHaveURL(/\/docs\/security/)
    await page.goto('/changelog')
    await expect(page).toHaveURL(/\/docs\/changelog/)
  })

  test('og image asset exists', async ({ request }) => {
    const res = await request.get('/og.png')
    expect(res.ok()).toBeTruthy()
    const ct = res.headers()['content-type'] || ''
    expect(ct).toMatch(/image\/(png|jpeg|jpg)/i)
  })

  test('primary nav has Home Docs only', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Docs' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Security' })).toHaveCount(0)
    // secondary stays in footer
    const footer = page.getByRole('navigation', { name: 'Footer' })
    await expect(footer.getByRole('link', { name: 'Security' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Credits' })).toBeVisible()
  })

  test('no lid angle marketing copy on home', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/lid opens|95°|95 degrees/i)).toHaveCount(0)
    await expect(page.getByText('Drag to rotate')).toBeVisible()
  })

  test('end install CTA without re-pitch body', async ({ page }) => {
    await page.goto('/')
    const end = page.getByRole('heading', { name: 'Install FaultLine' })
    await expect(end).toBeVisible()
    const section = page.locator('section').filter({ has: end })
    await expect(section.getByRole('link', { name: /Install/i }).first()).toBeVisible()
    await expect(section.getByRole('link', { name: 'Documentation' })).toBeVisible()
  })

  test('mobile 375: menu opens and no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const overflow = await page.evaluate(() => {
      const el = document.documentElement
      return el.scrollWidth > el.clientWidth + 1
    })
    expect(overflow).toBe(false)
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.locator('#mobile-nav').getByRole('link', { name: 'Install' })).toBeVisible()
    await page.getByRole('button', { name: 'Close menu' }).click()
  })

  test('mobile 375: laptop stage stays short', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const box = await page.locator('.hero-laptop').boundingBox()
    expect(box).toBeTruthy()
    // phone stage capped ~260px — must not dominate 812 viewport
    expect(box!.height).toBeLessThanOrEqual(280)
    expect(box!.height).toBeGreaterThanOrEqual(180)
  })

  test('theme toggle switches data-theme', async ({ page }) => {
    await page.goto('/')
    const root = page.locator('html')
    const before = await root.getAttribute('data-theme')
    await page.getByRole('button', { name: /Switch to light mode|Switch to dark mode/i }).click()
    const after = await root.getAttribute('data-theme')
    expect(after).toBeTruthy()
    expect(after).not.toBe(before)
  })

  test('donate page has free pitch and student presets', async ({ page }) => {
    await page.goto('/donate')
    await expect(
      page.getByRole('heading', { name: /Free forever/i })
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: /How you can pay/i })).toBeVisible()
    await expect(page.getByText(/UPI \(VPA/i).first()).toBeVisible()
    await expect(page.getByText('0%').first()).toBeVisible()
    await page.getByRole('button', { name: 'INR', exact: true }).click()
    await expect(page.getByRole('option', { name: /₹50|₹\s*50/i }).first()).toBeVisible()
    await expect(page.getByLabel(/Custom amount/i)).toBeVisible()
    // UPI apps CTA present (intent href)
    const upiCta = page.getByRole('link', { name: /Pay via UPI apps/i }).first()
    await expect(upiCta).toBeVisible()
    await expect(upiCta).toHaveAttribute('href', /upi:\/\/pay/)
  })
})
