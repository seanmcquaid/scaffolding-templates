import { Colors } from '@/hooks/useThemeColor';

// Mock the useColorScheme hook to avoid React Native imports
jest.mock('@/hooks/useColorScheme');

describe('useThemeColor', () => {
  it('Colors constant has all required properties for light theme', () => {
    expect(Colors.light).toHaveProperty('text');
    expect(Colors.light).toHaveProperty('background');
    expect(Colors.light).toHaveProperty('tint');
    expect(Colors.light).toHaveProperty('icon');
    expect(Colors.light).toHaveProperty('tabIconDefault');
    expect(Colors.light).toHaveProperty('tabIconSelected');
  });

  it('Colors constant has all required properties for dark theme', () => {
    expect(Colors.dark).toHaveProperty('text');
    expect(Colors.dark).toHaveProperty('background');
    expect(Colors.dark).toHaveProperty('tint');
    expect(Colors.dark).toHaveProperty('icon');
    expect(Colors.dark).toHaveProperty('tabIconDefault');
    expect(Colors.dark).toHaveProperty('tabIconSelected');
  });

  it('Colors constant has valid hex color values for light theme', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{3,6}$/;

    Object.values(Colors.light).forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });
  });

  it('Colors constant has valid hex color values for dark theme', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{3,6}$/;

    Object.values(Colors.dark).forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });
  });

  it('light and dark themes have matching keys', () => {
    const lightKeys = Object.keys(Colors.light).sort();
    const darkKeys = Object.keys(Colors.dark).sort();

    expect(lightKeys).toEqual(darkKeys);
  });

  it('Colors have different values for light and dark themes', () => {
    // At least some colors should be different
    const hasDifferentColors = Object.keys(Colors.light).some(
      (key) =>
        Colors.light[key as keyof typeof Colors.light] !==
        Colors.dark[key as keyof typeof Colors.dark]
    );

    expect(hasDifferentColors).toBe(true);
  });
});
