/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import HomeScreen from '@/app/(tabs)/index';

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    render(<HomeScreen />);
  });

  it('renders the page title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.title')).toBeInTheDocument();
  });

  it('renders the page subtitle', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.subtitle')).toBeInTheDocument();
  });

  it('renders navigation link for React Query', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.reactQuery')).toBeInTheDocument();
  });

  it('renders navigation link for React Hook Form', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.reactHookFormZod')).toBeInTheDocument();
  });

  it('renders navigation link for Kitchen Sink', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.kitchenSink')).toBeInTheDocument();
  });
});
