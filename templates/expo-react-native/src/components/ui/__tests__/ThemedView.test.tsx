import { render, screen } from '@testing-library/react';
import { ThemedView } from '@/components/ui/ThemedView';

describe('ThemedView', () => {
  it('renders its children', () => {
    render(
      <ThemedView>
        <span>Child content</span>
      </ThemedView>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('applies custom light and dark background colors', () => {
    render(
      <ThemedView lightColor="#FFFFFF" darkColor="#000000">
        <span>Themed content</span>
      </ThemedView>
    );
    expect(screen.getByText('Themed content')).toBeInTheDocument();
  });
});
