/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { ThemedView } from '@/components/ui/ThemedView';

describe('ThemedView', () => {
  it('renders children', () => {
    render(
      <ThemedView>
        <span>Child content</span>
      </ThemedView>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders with light color override', () => {
    render(
      <ThemedView lightColor="#FF0000">
        <span>Light colored</span>
      </ThemedView>
    );
    expect(screen.getByText('Light colored')).toBeInTheDocument();
  });

  it('renders with dark color override', () => {
    render(
      <ThemedView darkColor="#000000">
        <span>Dark colored</span>
      </ThemedView>
    );
    expect(screen.getByText('Dark colored')).toBeInTheDocument();
  });

  it('renders with both light and dark color overrides', () => {
    render(
      <ThemedView lightColor="#FFFFFF" darkColor="#000000">
        <span>Themed content</span>
      </ThemedView>
    );
    expect(screen.getByText('Themed content')).toBeInTheDocument();
  });

  it('renders with dark color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(
      <ThemedView lightColor="#FFFFFF" darkColor="#000000">
        <span>Dark scheme</span>
      </ThemedView>
    );
    expect(screen.getByText('Dark scheme')).toBeInTheDocument();
  });
});
