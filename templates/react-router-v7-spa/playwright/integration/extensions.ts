import { defineNetworkFixture, type NetworkFixture } from '@msw/playwright';
import { test as base, expect } from '@playwright/test';
import { type AnyHandler } from 'msw';
import initialHandlers from '@/mocks/handlers';

interface Fixtures {
  handlers: Array<AnyHandler>;
  network: NetworkFixture;
}

const test = base.extend<Fixtures>({
  handlers: [initialHandlers, { option: true }],
  network: [
    async ({ context, handlers }, use) => {
      const network = defineNetworkFixture({
        context,
        handlers,
      });
      await network.enable();
      await use(network);
      await network.disable();
    },
    { auto: true },
  ],
});

export { test, expect };
