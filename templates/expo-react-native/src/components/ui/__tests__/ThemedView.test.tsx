import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ThemedView } from '../ThemedView';

describe('ThemedView', () => {
  it('renders children', () => {
    render(
      <ThemedView>
        <Text>Common.content</Text>
      </ThemedView>
    );
    expect(screen.getByText('Common.content')).toBeTruthy();
  });

  it('renders with light color', () => {
    render(
      <ThemedView lightColor="#FFFFFF">
        <Text>Content</Text>
      </ThemedView>
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders with dark color', () => {
    render(
      <ThemedView darkColor="#000000">
        <Text>Content</Text>
      </ThemedView>
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(<ThemedView testID="themed-view" />);
    expect(screen.getByTestId('themed-view')).toBeTruthy();
  });
});
