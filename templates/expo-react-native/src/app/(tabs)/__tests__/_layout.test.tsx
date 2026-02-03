import { render } from '@testing-library/react-native';
import TabLayout from '../_layout';

// Mock Colors from useThemeColor
jest.mock('@/hooks/useThemeColor', () => ({
  Colors: {
    light: { tint: '#007AFF' },
    dark: { tint: '#0A84FF' },
  },
  useThemeColor: () => '#007AFF',
}));

describe('TabLayout', () => {
  it('renders tab layout', () => {
    const result = render(<TabLayout />);
    expect(result).toBeTruthy();
  });
});
