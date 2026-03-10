import type { ReactNode } from 'react';
import Providers from '../Providers';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

vi.mock('@/i18n/i18next', () => ({ default: {} }));

vi.mock('@tanstack/react-query-next-experimental', () => ({
  ReactQueryStreamedHydration: ({ children }: { children: ReactNode }) =>
    children,
}));

describe('Providers', () => {
  it('renders children', () => {
    render(
      <Providers lang="en-US">
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <div>Test children</div>
      </Providers>,
    );
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });
});
