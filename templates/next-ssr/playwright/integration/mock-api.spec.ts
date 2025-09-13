import { expect, test } from './extensions';

test('Tests against a mocked API in the browser', async ({ page }) => {
  await page.goto('http://localhost:3000/react-query');

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded');

  // Test that mocked data is displayed (adapt based on your Next.js app routes)
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
});
