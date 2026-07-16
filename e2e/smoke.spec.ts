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

  test('primary nav has Home Docs Security', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Docs' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Security' })).toBeVisible()
  })
})
