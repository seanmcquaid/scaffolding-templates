/**
 * @jest-environment jsdom
 */
import { ThemedView } from '../ThemedView';

describe('ThemedView', () => {
  it('exports ThemedView component', () => {
    expect(ThemedView).toBeDefined();
    expect(typeof ThemedView).toBe('function');
  });

  it('accepts children prop', () => {
    const result = ThemedView({ children: 'Content' });
    expect(result).toBeDefined();
  });

  it('accepts lightColor prop', () => {
    const result = ThemedView({ lightColor: '#FFFFFF' });
    expect(result).toBeDefined();
  });

  it('accepts darkColor prop', () => {
    const result = ThemedView({ darkColor: '#000000' });
    expect(result).toBeDefined();
  });

  it('accepts both light and dark colors', () => {
    const result = ThemedView({
      lightColor: '#FFFFFF',
      darkColor: '#000000',
    });
    expect(result).toBeDefined();
  });

  it('accepts style prop', () => {
    const result = ThemedView({ style: { padding: 10 } });
    expect(result).toBeDefined();
  });

  it('accepts View props', () => {
    const result = ThemedView({ testID: 'themed-view' });
    expect(result).toBeDefined();
  });
});
