import { render } from '@testing-library/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

describe('IconSymbol', () => {
  it('calls a function color with the expected arguments', () => {
    const colorFn = jest.fn().mockReturnValue('#FF0000');
    render(<IconSymbol name="house.fill" color={colorFn} />);
    expect(colorFn).toHaveBeenCalledWith({ focused: false, color: '#000' });
  });

  it('uses a string color directly without invoking it as a function', () => {
    const colorFn = jest.fn();
    render(<IconSymbol name="house.fill" color="#FF0000" />);
    expect(colorFn).not.toHaveBeenCalled();
  });
});
