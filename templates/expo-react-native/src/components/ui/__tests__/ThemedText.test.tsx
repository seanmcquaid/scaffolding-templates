/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { ThemedText } from '@/components/ui/ThemedText';

describe('ThemedText', () => {
  it('renders children text', () => {
    render(<ThemedText>Hello World</ThemedText>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with default type', () => {
    render(<ThemedText>Default text</ThemedText>);
    expect(screen.getByText('Default text')).toBeInTheDocument();
  });

  it('renders with title type', () => {
    render(<ThemedText type="title">Title text</ThemedText>);
    expect(screen.getByText('Title text')).toBeInTheDocument();
  });

  it('renders with defaultSemiBold type', () => {
    render(<ThemedText type="defaultSemiBold">SemiBold text</ThemedText>);
    expect(screen.getByText('SemiBold text')).toBeInTheDocument();
  });

  it('renders with subtitle type', () => {
    render(<ThemedText type="subtitle">Subtitle text</ThemedText>);
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('renders with link type', () => {
    render(<ThemedText type="link">Link text</ThemedText>);
    expect(screen.getByText('Link text')).toBeInTheDocument();
  });

  it('renders with custom light and dark colors', () => {
    render(
      <ThemedText lightColor="#FF0000" darkColor="#00FF00">
        Colored text
      </ThemedText>
    );
    expect(screen.getByText('Colored text')).toBeInTheDocument();
  });

  it('applies custom style', () => {
    render(<ThemedText style={{ opacity: 0.5 }}>Styled text</ThemedText>);
    expect(screen.getByText('Styled text')).toBeInTheDocument();
  });
});
