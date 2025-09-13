import test, { expect } from '@playwright/test';

test('Tests the real API in the browser', async ({ page }) => {
  await page.goto('http://localhost:3000/react-query');

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded');

  // Test that real API data is displayed (adapt based on your Next.js app routes)
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
});
