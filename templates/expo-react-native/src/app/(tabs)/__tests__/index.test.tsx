import { render, screen } from '@testing-library/react';
import HomeScreen from '@/app/(tabs)/index';

describe('HomeScreen', () => {
  it('renders navigation links for all main routes', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.reactQuery')).toBeInTheDocument();
    expect(screen.getByText('HomePage.reactHookFormZod')).toBeInTheDocument();
    expect(screen.getByText('HomePage.kitchenSink')).toBeInTheDocument();
  });
});
