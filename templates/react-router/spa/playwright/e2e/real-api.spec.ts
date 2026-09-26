import test, { expect } from '@playwright/test';

test('Tests the real API in the browser', async ({ page }) => {
  await page.goto('http://localhost:3000/kitchen-sink');
  const post = page.getByText('sunt aut facere');
  await expect(post).toBeVisible();
});
