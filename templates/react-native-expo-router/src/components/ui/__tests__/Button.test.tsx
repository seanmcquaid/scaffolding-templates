import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders button with title', () => {
    const mockOnPress = jest.fn();

    render(
      <Button title="Test Button" onPress={mockOnPress} testID="test-button" />
    );

    expect(screen.getByTestId('test-button')).toBeTruthy();
    expect(screen.getByText('Test Button')).toBeTruthy();
  });

  it('shows loading state', () => {
    const mockOnPress = jest.fn();

    render(
      <Button
        title="Test Button"
        onPress={mockOnPress}
        loading={true}
        testID="test-button"
      />
    );

    expect(screen.getByTestId('test-button')).toBeTruthy();
    // When loading, title text should not be visible
    expect(screen.queryByText('Test Button')).toBeNull();
  });
});
