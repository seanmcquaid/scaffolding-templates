import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import React from 'react';

import HomePage from './index';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};

describe('HomePage', () => {
  it('renders welcome message', () => {
    const { getByText } = renderWithQueryClient(<HomePage />);
    expect(getByText('Welcome to React Native Expo Router')).toBeTruthy();
  });

  it('renders edit link', () => {
    const { getByText } = renderWithQueryClient(<HomePage />);
    expect(getByText('Edit src/app/(tabs)/index.tsx to edit this screen.')).toBeTruthy();
  });
});
