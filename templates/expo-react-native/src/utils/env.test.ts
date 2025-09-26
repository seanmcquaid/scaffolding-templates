describe('Environment Configuration', () => {
  it('should have environment variables defined', () => {
    expect(process.env.NODE_ENV).toBeDefined();
    expect(['development', 'production', 'test']).toContain(process.env.NODE_ENV);
  });

  it('should pass basic environment test', () => {
    // Simple test to verify Jest is working
    expect(true).toBe(true);
  });
});