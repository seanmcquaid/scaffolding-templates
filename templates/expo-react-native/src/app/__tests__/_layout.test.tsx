import { render } from '@testing-library/react-native';
import RootLayout from '@/app/_layout';

jest.mock('expo-router', () => ({
  Stack: Object.assign(
    function Stack() {
      return null;
    },
    {
      Screen: function Screen() {
        return null;
      },
    }
  ),
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

jest.mock('react-native-reanimated', () => ({}));

describe('RootLayout', () => {
  it('renders without crashing', () => {
    render(<RootLayout />);
  });

  it('exports the correct unstable_settings anchor', () => {
    const { unstable_settings } = jest.requireActual('@/app/_layout') as {
      unstable_settings: { anchor: string };
    };
    expect(unstable_settings).toEqual({ anchor: '(tabs)' });
  });
});
