/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { ThemedText } from '@/components/ui/ThemedText';

// Mock useThemeColor to return predictable values
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#000000'),
}));

describe('ThemedText', () => {
  it('renders with default type', () => {
    const { container } = render(<ThemedText>Test text</ThemedText>);
    const textElement = container.querySelector('Text');
    expect(textElement).toBeTruthy();
  });

  it('applies title style when type is title', () => {
    const { container } = render(<ThemedText type="title">Title text</ThemedText>);
    const textElement = container.querySelector('Text');
    expect(textElement).toBeTruthy();
  });

  it('applies defaultSemiBold style when type is defaultSemiBold', () => {
    const { container } = render(<ThemedText type="defaultSemiBold">Bold text</ThemedText>);
    const textElement = container.querySelector('Text');
    expect(textElement).toBeTruthy();
  });

  it('applies subtitle style when type is subtitle', () => {
    const { container } = render(<ThemedText type="subtitle">Subtitle text</ThemedText>);
    const textElement = container.querySelector('Text');
    expect(textElement).toBeTruthy();
  });

  it('applies link style when type is link', () => {
    const { container } = render(<ThemedText type="link">Link text</ThemedText>);
    const textElement = container.querySelector('Text');
    expect(textElement).toBeTruthy();
  });

  it('passes custom lightColor to useThemeColor', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    render(<ThemedText lightColor="#ffffff">Custom color</ThemedText>);
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: '#ffffff', dark: undefined },
      'text'
    );
  });

  it('passes custom darkColor to useThemeColor', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    render(<ThemedText darkColor="#000000">Custom color</ThemedText>);
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: undefined, dark: '#000000' },
      'text'
    );
  });

  it('passes both light and dark colors to useThemeColor', () => {
    const { useThemeColor } = require('@/hooks/useThemeColor');
    render(<ThemedText lightColor="#ffffff" darkColor="#000000">Both colors</ThemedText>);
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: '#ffffff', dark: '#000000' },
      'text'
    );
  });
});
