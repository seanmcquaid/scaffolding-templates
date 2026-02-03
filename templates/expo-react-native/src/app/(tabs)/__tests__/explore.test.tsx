/**
 * @jest-environment jsdom
 */
import ExploreScreen from '../explore';

describe('ExploreScreen', () => {
  it('exports ExploreScreen component', () => {
    expect(ExploreScreen).toBeDefined();
    expect(typeof ExploreScreen).toBe('function');
  });

  it('renders ExploreScreen component', () => {
    const result = ExploreScreen({});
    expect(result).toBeDefined();
  });
});
