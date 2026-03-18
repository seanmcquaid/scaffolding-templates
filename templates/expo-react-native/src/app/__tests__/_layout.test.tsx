import { unstable_settings } from '@/app/_layout';

describe('RootLayout', () => {
  it('exports unstable_settings with the correct anchor', () => {
    expect(unstable_settings).toEqual({ anchor: '(tabs)' });
  });
});
