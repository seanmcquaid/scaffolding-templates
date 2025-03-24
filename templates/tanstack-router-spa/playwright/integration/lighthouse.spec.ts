import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Lighthouse tests', () => {
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(
    ({ browserName }) => browserName !== 'chromium',
    'Lighthouse only supports Chromium',
  );
  // eslint-disable-next-line playwright/expect-expect
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
        performance: 0,
        accessibility: 50,
        'best-practices': 50,
        seo: 50,
        pwa: 0,
      },
    });

    await browser.close();
  });
});
