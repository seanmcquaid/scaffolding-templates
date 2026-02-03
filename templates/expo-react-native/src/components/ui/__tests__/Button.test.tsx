/**
 * @jest-environment jsdom
 */
import { Button } from '../Button';

describe('Button', () => {
  it('exports Button component', () => {
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('function');
  });

  it('accepts variant prop - default', () => {
    const result = Button({
      children: 'Test',
      variant: 'default',
    });
    expect(result).toBeDefined();
  });

  it('accepts variant prop - secondary', () => {
    const result = Button({
      children: 'Test',
      variant: 'secondary',
    });
    expect(result).toBeDefined();
  });

  it('accepts variant prop - outline', () => {
    const result = Button({
      children: 'Test',
      variant: 'outline',
    });
    expect(result).toBeDefined();
  });

  it('accepts variant prop - destructive', () => {
    const result = Button({
      children: 'Test',
      variant: 'destructive',
    });
    expect(result).toBeDefined();
  });

  it('accepts disabled prop', () => {
    const result = Button({
      children: 'Test',
      disabled: true,
    });
    expect(result).toBeDefined();
  });

  it('accepts style prop', () => {
    const result = Button({
      children: 'Test',
      style: { margin: 10 },
    });
    expect(result).toBeDefined();
  });

  it('accepts TouchableOpacity props', () => {
    const result = Button({
      children: 'Test',
      onPress: jest.fn(),
    });
    expect(result).toBeDefined();
  });
});
