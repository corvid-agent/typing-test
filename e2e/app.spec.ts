import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should load with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Typing/i);
  });

  test('should show text display', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#text-display')).toBeVisible();
  });

  test('should show stats', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#stat-wpm')).toBeVisible();
    await expect(page.locator('#stat-accuracy')).toBeVisible();
  });

  test('should show mode buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.mode-btn').first()).toBeVisible();
  });

  test('should show virtual keyboard', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.key').first()).toBeVisible();
  });
});
