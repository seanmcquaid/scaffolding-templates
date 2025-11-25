/**
 * Simple test to verify Jest configuration
 * Full React Native component testing requires a complete Expo environment
 */
describe('Template Setup', () => {
  it('should have jest configured correctly', () => {
    expect(true).toBe(true);
  });

  it('should support TypeScript', () => {
    const greeting: string = 'Hello, Expo!';
    expect(greeting).toBe('Hello, Expo!');
  });
});
