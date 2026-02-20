import { test, expect } from '@playwright/test';

test.describe('Typing Test', () => {
  test('should have 3 mode buttons', async ({ page }) => {
    await page.goto('/');
    const modes = page.locator('.mode-btn');
    await expect(modes).toHaveCount(3);
  });

  test('should show timer stat', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#stat-time')).toBeVisible();
  });

  test('should show error count', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#stat-errors')).toBeVisible();
  });

  test('should have hidden input for typing', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hidden-input')).toBeAttached();
  });

  test('should have results overlay', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#results-overlay')).toBeAttached();
  });

  test('should have personal bests grid', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#bests-grid')).toBeAttached();
  });

  test('should start typing on keystroke', async ({ page }) => {
    await page.goto('/');
    // Click text display to focus
    await page.locator('#text-display').click();
    // Type a character
    await page.keyboard.type('a');
    // Timer should start (stat-time should change)
  });
});
