import { createWorkerFixture, type WorkerFixture } from '@msw/playwright';
import { test as base, expect } from '@playwright/test';
import handlers from '@/mocks/handlers';

const test = base.extend<{
  worker: WorkerFixture;
}>({
  worker: createWorkerFixture({
    initialHandlers: handlers,
  }),
});

export { test, expect };
