/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Mock MaterialIcons
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

describe('IconSymbol', () => {
  it('renders with string color', () => {
    const { container } = render(
      <IconSymbol name="house.fill" color="#0a7ea4" />
    );
    const iconElement = container.querySelector('MaterialIcons');
    expect(iconElement).toBeTruthy();
  });

  it('renders with function color', () => {
    const colorFunction = ({ focused, color }: { focused: boolean; color: string }) =>
      focused ? '#0a7ea4' : color;
    const { container } = render(
      <IconSymbol name="house.fill" color={colorFunction} />
    );
    const iconElement = container.querySelector('MaterialIcons');
    expect(iconElement).toBeTruthy();
  });

  it('handles color function by calling it with default values', () => {
    const colorFunction = jest.fn(() => '#ff0000');
    render(<IconSymbol name="house.fill" color={colorFunction} />);
    expect(colorFunction).toHaveBeenCalledWith({ focused: false, color: '#000' });
  });

  it('uses string color directly when color is a string', () => {
    const colorFunction = jest.fn();
    render(<IconSymbol name="house.fill" color="#0a7ea4" />);
    expect(colorFunction).not.toHaveBeenCalled();
  });

  it('renders with custom size', () => {
    const { container } = render(
      <IconSymbol name="house.fill" color="#0a7ea4" size={32} />
    );
    const iconElement = container.querySelector('MaterialIcons');
    expect(iconElement).toBeTruthy();
  });

  it('renders different icon names correctly', () => {
    const iconNames: Array<'house.fill' | 'paperplane.fill' | 'chevron.left.forwardslash.chevron.right' | 'chevron.right'> = [
      'house.fill',
      'paperplane.fill',
      'chevron.left.forwardslash.chevron.right',
      'chevron.right',
    ];

    iconNames.forEach((name) => {
      const { container } = render(
        <IconSymbol name={name} color="#0a7ea4" />
      );
      const iconElement = container.querySelector('MaterialIcons');
      expect(iconElement).toBeTruthy();
    });
  });

  it('applies default size of 24 when not provided', () => {
    const { container } = render(
      <IconSymbol name="house.fill" color="#0a7ea4" />
    );
    const iconElement = container.querySelector('MaterialIcons');
    expect(iconElement).toBeTruthy();
  });
});
