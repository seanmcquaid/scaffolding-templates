import { render, screen } from '@testing-library/react';
import { ThemedText } from '@/components/ui/ThemedText';

describe('ThemedText', () => {
  it('renders its children', () => {
    render(<ThemedText>Hello World</ThemedText>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies a custom color via lightColor and darkColor props', () => {
    render(
      <ThemedText lightColor="#FF0000" darkColor="#00FF00">
        Colored text
      </ThemedText>
    );
    expect(screen.getByText('Colored text')).toBeInTheDocument();
  });
});
