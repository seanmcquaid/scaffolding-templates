import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Lighthouse tests', () => {
  test.skip(
    ({ browserName }) => browserName !== 'chromium',
    'Lighthouse only supports Chromium',
  );
  test('Home', async ({ playwright }) => {
    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 50,
        'best-practices': 50,
        performance: 0,
        pwa: 0,
        seo: 50,
      },
    });

    await browser.close();
  });
});
