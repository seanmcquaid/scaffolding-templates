/**
 * @jest-environment jsdom
 */
import { IconSymbol } from '../IconSymbol';

describe('IconSymbol', () => {
  it('exports IconSymbol component', () => {
    expect(IconSymbol).toBeDefined();
    expect(typeof IconSymbol).toBe('function');
  });

  it('accepts house.fill icon name', () => {
    const result = IconSymbol({ name: 'house.fill', color: '#000' });
    expect(result).toBeDefined();
  });

  it('accepts paperplane.fill icon name', () => {
    const result = IconSymbol({ name: 'paperplane.fill', color: '#000' });
    expect(result).toBeDefined();
  });

  it('accepts chevron.left.forwardslash.chevron.right icon name', () => {
    const result = IconSymbol({
      name: 'chevron.left.forwardslash.chevron.right',
      color: '#000',
    });
    expect(result).toBeDefined();
  });

  it('accepts chevron.right icon name', () => {
    const result = IconSymbol({ name: 'chevron.right', color: '#000' });
    expect(result).toBeDefined();
  });

  it('accepts size prop', () => {
    const result = IconSymbol({
      name: 'house.fill',
      color: '#000',
      size: 32,
    });
    expect(result).toBeDefined();
  });

  it('uses default size when not specified', () => {
    const result = IconSymbol({ name: 'house.fill', color: '#000' });
    expect(result).toBeDefined();
  });

  it('handles function color prop', () => {
    const colorFunction = ({ focused, color }: { focused: boolean; color: string }) =>
      focused ? '#007AFF' : color;
    const result = IconSymbol({
      name: 'house.fill',
      color: colorFunction,
    });
    expect(result).toBeDefined();
  });

  it('accepts style prop', () => {
    const result = IconSymbol({
      name: 'house.fill',
      color: '#000',
      style: { marginLeft: 10 },
    });
    expect(result).toBeDefined();
  });
});
