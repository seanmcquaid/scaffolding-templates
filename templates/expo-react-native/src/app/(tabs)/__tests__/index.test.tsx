import { render, screen } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('HomeScreen', () => {
  it('renders the home page title', async () => {
    await render(<HomeScreen />);
    expect(screen.getByText('HomePage.title')).toBeTruthy();
  });

  it('renders the home page subtitle', async () => {
    await render(<HomeScreen />);
    expect(screen.getByText('HomePage.subtitle')).toBeTruthy();
  });

  it('renders navigation link buttons', async () => {
    await render(<HomeScreen />);
    expect(screen.getByText('HomePage.reactQuery')).toBeTruthy();
    expect(screen.getByText('HomePage.reactHookFormZod')).toBeTruthy();
    expect(screen.getByText('HomePage.kitchenSink')).toBeTruthy();
  });
});
