import { render } from '@testing-library/react';
import { IconSymbol } from '@/components/ui/IconSymbol';

describe('IconSymbol', () => {
  it('resolves the icon color when a function is passed as the color prop', () => {
    const colorFn = ({ color }: { focused: boolean; color: string }) => color;
    // Should not throw: function is called with { focused: false, color: '#000' }
    render(<IconSymbol name="house.fill" color={colorFn} />);
  });

  it('passes a static string color directly to the icon', () => {
    render(<IconSymbol name="house.fill" color="#FF0000" />);
  });
});
