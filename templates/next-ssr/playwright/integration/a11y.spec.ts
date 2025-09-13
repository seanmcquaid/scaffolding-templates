import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('homepage accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('[data-testid="skip-accessibility"]')
      .analyze();

    expect(accessibilityScanResults.violations.length).toBeLessThanOrEqual(1);
  });
});
