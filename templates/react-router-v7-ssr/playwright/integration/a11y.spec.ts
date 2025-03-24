import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip('homepage', () => {
  // 2
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('https://playwright.dev/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
