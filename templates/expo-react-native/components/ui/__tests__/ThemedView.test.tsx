/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { ThemedView } from '@/components/ui/ThemedView';

// Mock useThemeColor to return predictable values
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#ffffff'),
}));

describe('ThemedView', () => {
  it('renders successfully', () => {
    const { container } = render(<ThemedView />);
    const viewElement = container.querySelector('View');
    expect(viewElement).toBeTruthy();
  });

  it('calls useThemeColor with default background color name', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    render(<ThemedView />);
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: undefined, dark: undefined },
      'background'
    );
  });

  it('passes custom lightColor to useThemeColor', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    render(<ThemedView lightColor="#f0f0f0" />);
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: '#f0f0f0', dark: undefined },
      'background'
    );
  });

  it('passes custom darkColor to useThemeColor', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    render(<ThemedView darkColor="#1a1a1a" />);
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: undefined, dark: '#1a1a1a' },
      'background'
    );
  });

  it('passes both light and dark colors to useThemeColor', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    render(<ThemedView lightColor="#f0f0f0" darkColor="#1a1a1a" />);
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: '#f0f0f0', dark: '#1a1a1a' },
      'background'
    );
  });
});
