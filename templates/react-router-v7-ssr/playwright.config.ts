import { defineConfig, devices } from '@playwright/test';

/**
 * Note: For environment-specific Playwright configuration,
 * use environment variables or pass config via --config flag.
 * https://playwright.dev/docs/test-configuration
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  forbidOnly: !!process.env.CI,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /**
     * Mobile testing is disabled by default.
     * Rationale: Templates focus on desktop web development. Mobile testing
     * requires additional setup (device emulation, performance considerations).
     * To enable mobile testing, uncomment the configurations below.
     * See: https://playwright.dev/docs/emulation
     */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /**
     * Branded browser testing is disabled by default.
     * Rationale: Chromium, Firefox, and WebKit provide comprehensive coverage
     * for testing modern web applications. Branded browsers (Edge, Chrome)
     * require additional browser channels to be installed.
     * To enable branded browser testing, uncomment below and install channels.
     * See: https://playwright.dev/docs/browsers
     */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  /* Retry on CI only */
  reporter: 'html',
  /* Run with single worker on CI for stability */
  workers: process.env.CI ? 1 : undefined,
  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  testDir: './playwright',

  /* Configure projects for major browsers */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm dev',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:3000/',
  },
});
