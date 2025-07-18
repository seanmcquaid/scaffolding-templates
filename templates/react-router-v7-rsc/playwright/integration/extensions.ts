import { createNetworkFixture, type NetworkFixture } from '@msw/playwright';
import { test as base, expect } from '@playwright/test';
import handlers from '@/mocks/handlers';

const test = base.extend<{
  network: NetworkFixture;
}>({
  network: createNetworkFixture({
    initialHandlers: handlers,
  }),
});

export { test, expect };
