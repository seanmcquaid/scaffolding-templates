import { render } from '@testing-library/react-native';
import TabLayout from '@/app/(tabs)/_layout';

interface TabScreenOptions {
  title?: string;
  tabBarIcon?: (props: { color: string }) => unknown;
}

const capturedScreenOptions: TabScreenOptions[] = [];

jest.mock('expo-router', () => ({
  Tabs: Object.assign(
    function Tabs({ children }: { children: unknown }) {
      return children as never;
    },
    {
      Screen: function Screen({ options }: { options?: TabScreenOptions }) {
        if (options) {
          capturedScreenOptions.push(options);
        }
        return null;
      },
    }
  ),
}));

describe('TabLayout', () => {
  beforeEach(() => {
    capturedScreenOptions.length = 0;
  });

  it('renders without crashing', () => {
    render(<TabLayout />);
    expect(capturedScreenOptions).toHaveLength(5);
  });

  it('renders tab icons when tabBarIcon functions are invoked', () => {
    render(<TabLayout />);
    capturedScreenOptions.forEach((options) => {
      if (options.tabBarIcon) {
        const icon = options.tabBarIcon({ color: '#000000' });
        expect(icon).toBeTruthy();
      }
    });
  });
});
