import { render, screen } from '@testing-library/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

describe('IconSymbol', () => {
  it('renders without crashing with a string color', () => {
    render(<IconSymbol name="house.fill" color="#000000" />);
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders with a function color', () => {
    const colorFn = jest.fn().mockReturnValue('#FF0000');
    render(<IconSymbol name="house.fill" color={colorFn} />);
    expect(colorFn).toHaveBeenCalledWith({ focused: false, color: '#000' });
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders with a custom size', () => {
    render(<IconSymbol name="paperplane.fill" size={32} color="#333333" />);
    expect(screen.toJSON()).toBeTruthy();
  });
});
