/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { IconSymbol } from '@/components/ui/IconSymbol';

describe('IconSymbol', () => {
  it('renders with house.fill icon', () => {
    render(<IconSymbol name="house.fill" color="#000" />);
  });

  it('renders with paperplane.fill icon', () => {
    render(<IconSymbol name="paperplane.fill" color="#000" />);
  });

  it('renders with chevron.right icon', () => {
    render(<IconSymbol name="chevron.right" color="#000" />);
  });

  it('renders with chevron.left.forwardslash.chevron.right icon', () => {
    render(<IconSymbol name="chevron.left.forwardslash.chevron.right" color="#000" />);
  });

  it('renders with a custom size', () => {
    render(<IconSymbol name="house.fill" color="#000" size={32} />);
  });

  it('renders with a function color prop', () => {
    const colorFn = ({ color }: { focused: boolean; color: string }) => color;
    render(<IconSymbol name="house.fill" color={colorFn} />);
  });

  it('renders with a hex color string', () => {
    render(<IconSymbol name="house.fill" color="#FF0000" />);
  });
});
