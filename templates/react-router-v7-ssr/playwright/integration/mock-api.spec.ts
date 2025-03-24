import { test, expect } from './extensions';

test('Tests against a mocked API in the browser', async ({ page }) => {
  await page.goto('http://localhost:3000/kitchen-sink');
  const post = page.getByText('sunt');
  await expect(post).toBeHidden();
});
