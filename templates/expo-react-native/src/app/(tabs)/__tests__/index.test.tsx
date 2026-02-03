/**
 * @jest-environment jsdom
 */
import HomeScreen from '../index';

describe('HomeScreen', () => {
  it('exports HomeScreen component', () => {
    expect(HomeScreen).toBeDefined();
    expect(typeof HomeScreen).toBe('function');
  });

  it('renders HomeScreen component', () => {
    const result = HomeScreen({});
    expect(result).toBeDefined();
  });
});
