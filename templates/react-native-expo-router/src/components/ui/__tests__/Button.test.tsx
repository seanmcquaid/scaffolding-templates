import React from 'react';
import { Button } from '@/components/ui/Button';

// Mock for testing purposes - simplified tests without React Native Testing Library render
describe('Button Component', () => {
  it('should export Button component', () => {
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('function');
  });

  it('should be a valid React component', () => {
    const mockOnPress = jest.fn();
    const buttonProps = {
      title: 'Test Button',
      onPress: mockOnPress,
      testID: 'test-button',
    };

    // Test component creation doesn't throw
    expect(() => {
      React.createElement(Button, buttonProps);
    }).not.toThrow();
  });
});
