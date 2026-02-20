import { test, expect } from '@playwright/test';

test.describe('App loading and layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Typing Speed Test');
  });

  test('should display the header with app name', async ({ page }) => {
    const heading = page.locator('.header h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('typing test');
  });

  test('should display the blinking cursor in the header', async ({ page }) => {
    await expect(page.locator('.cursor-blink')).toBeVisible();
  });

  test('should show three mode selector buttons (30s, 60s, 120s)', async ({ page }) => {
    const modeBtns = page.locator('.mode-btn');
    await expect(modeBtns).toHaveCount(3);
    await expect(modeBtns.nth(0)).toHaveText('30s');
    await expect(modeBtns.nth(1)).toHaveText('60s');
    await expect(modeBtns.nth(2)).toHaveText('120s');
  });

  test('should have 30s mode active by default', async ({ page }) => {
    const activeBtn = page.locator('.mode-btn.active');
    await expect(activeBtn).toHaveCount(1);
    await expect(activeBtn).toHaveText('30s');
    await expect(activeBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('should display all four stat cards', async ({ page }) => {
    await expect(page.locator('#stat-wpm')).toBeVisible();
    await expect(page.locator('#stat-accuracy')).toBeVisible();
    await expect(page.locator('#stat-time')).toBeVisible();
    await expect(page.locator('#stat-errors')).toBeVisible();
  });

  test('should show initial stat values', async ({ page }) => {
    await expect(page.locator('#stat-wpm')).toHaveText('0');
    await expect(page.locator('#stat-accuracy')).toHaveText('100%');
    await expect(page.locator('#stat-time')).toHaveText('30');
    await expect(page.locator('#stat-errors')).toHaveText('0');
  });

  test('should display the text area with character spans', async ({ page }) => {
    await expect(page.locator('#text-display')).toBeVisible();
    // After init, the text display should contain character spans
    const chars = page.locator('#text-display .char');
    expect(await chars.count()).toBeGreaterThan(10);
  });

  test('should have a hidden input for capturing keystrokes', async ({ page }) => {
    await expect(page.locator('#hidden-input')).toBeAttached();
  });

  test('should display restart and new text buttons', async ({ page }) => {
    await expect(page.locator('#btn-restart')).toBeVisible();
    await expect(page.locator('#btn-restart')).toHaveText('restart');
    await expect(page.locator('#btn-new-text')).toBeVisible();
    await expect(page.locator('#btn-new-text')).toHaveText('new text');
  });

  test('should display the virtual keyboard', async ({ page }) => {
    await expect(page.locator('#virtual-keyboard')).toBeVisible();
    const keys = page.locator('.key');
    // There should be many keys rendered
    expect(await keys.count()).toBeGreaterThan(20);
  });

  test('should have a space bar key', async ({ page }) => {
    const spaceKey = page.locator('.key.space');
    await expect(spaceKey).toBeVisible();
    await expect(spaceKey).toHaveText('space');
  });

  test('should display the personal bests section', async ({ page }) => {
    await expect(page.locator('.personal-bests h2')).toHaveText('personal bests');
    await expect(page.locator('#bests-grid')).toBeVisible();
  });

  test('should have the results overlay hidden initially', async ({ page }) => {
    const overlay = page.locator('#results-overlay');
    await expect(overlay).toHaveClass(/hidden/);
  });

  test('should display the footer', async ({ page }) => {
    await expect(page.locator('.footer')).toBeVisible();
    await expect(page.locator('.footer')).toContainText('built with pixels and patience');
  });
});
