import { render, screen } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    render(<HomeScreen />);
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders the home page title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.title')).toBeTruthy();
  });

  it('renders the home page subtitle', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.subtitle')).toBeTruthy();
  });

  it('renders navigation link buttons', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.reactQuery')).toBeTruthy();
    expect(screen.getByText('HomePage.reactHookFormZod')).toBeTruthy();
    expect(screen.getByText('HomePage.kitchenSink')).toBeTruthy();
  });
});
