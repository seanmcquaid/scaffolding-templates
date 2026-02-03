/**
 * @jest-environment jsdom
 */
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
  it('exports TabLayout component', () => {
    expect(TabLayout).toBeDefined();
    expect(typeof TabLayout).toBe('function');
  });

  it('renders TabLayout component', () => {
    const result = TabLayout({});
    expect(result).toBeDefined();
  });
});
