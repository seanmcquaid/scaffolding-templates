import { expect, test } from '@playwright/test';

test('renders the starter home page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByRole('heading', {
      name: 'Welcome to a project scaffolded out with the McQuaid Stack!',
    }),
  ).toBeVisible();
});
