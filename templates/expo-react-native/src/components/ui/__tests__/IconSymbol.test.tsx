import { render } from '@/utils/testing/reactNativeTestingLibraryUtils';
import { IconSymbol } from '../IconSymbol';

describe('IconSymbol', () => {
  it('renders with house.fill icon', () => {
    const result = render(<IconSymbol name="house.fill" color="#000" />);
    expect(result).toBeTruthy();
  });

  it('renders with paperplane.fill icon', () => {
    const result = render(<IconSymbol name="paperplane.fill" color="#000" />);
    expect(result).toBeTruthy();
  });

  it('renders with chevron.left.forwardslash.chevron.right icon', () => {
    const result = render(
      <IconSymbol name="chevron.left.forwardslash.chevron.right" color="#000" />
    );
    expect(result).toBeTruthy();
  });

  it('renders with chevron.right icon', () => {
    const result = render(<IconSymbol name="chevron.right" color="#000" />);
    expect(result).toBeTruthy();
  });

  it('renders with custom size', () => {
    const result = render(<IconSymbol name="house.fill" color="#000" size={32} />);
    expect(result).toBeTruthy();
  });

  it('handles function color prop', () => {
    const colorFunction = ({ focused, color }: { focused: boolean; color: string }) =>
      focused ? '#007AFF' : color;
    const result = render(<IconSymbol name="house.fill" color={colorFunction} />);
    expect(result).toBeTruthy();
  });
});
