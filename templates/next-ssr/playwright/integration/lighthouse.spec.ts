import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Lighthouse audits', () => {
  test('should pass lighthouse performance audit', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Run Lighthouse audit
    const report = await playAudit({
      page,
      port: 3000,
      thresholds: {
        performance: 75,
        accessibility: 90,
        'best-practices': 80,
        seo: 80,
      },
      reports: {
        formats: {
          html: true,
        },
        directory: './lighthouse-reports',
      },
    });

    expect(report.lhr.categories.performance.score).toBeGreaterThan(0.75);
    expect(report.lhr.categories.accessibility.score).toBeGreaterThan(0.9);
  });
});
