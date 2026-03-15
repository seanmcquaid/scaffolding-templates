/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { LinkButton } from '@/components/ui/LinkButton';

describe('LinkButton', () => {
  it('renders children text', () => {
    render(<LinkButton href="/home">Go Home</LinkButton>);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<LinkButton href="/home">Default Link</LinkButton>);
    expect(screen.getByText('Default Link')).toBeInTheDocument();
  });

  it('renders with secondary variant', () => {
    render(
      <LinkButton href="/home" variant="secondary">
        Secondary Link
      </LinkButton>
    );
    expect(screen.getByText('Secondary Link')).toBeInTheDocument();
  });

  it('renders with outline variant', () => {
    render(
      <LinkButton href="/home" variant="outline">
        Outline Link
      </LinkButton>
    );
    expect(screen.getByText('Outline Link')).toBeInTheDocument();
  });

  it('renders with a dynamic href', () => {
    render(<LinkButton href="/posts/123">View Post</LinkButton>);
    expect(screen.getByText('View Post')).toBeInTheDocument();
  });

  it('renders with dark color scheme - default variant', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(<LinkButton href="/home">Dark default</LinkButton>);
    expect(screen.getByText('Dark default')).toBeInTheDocument();
  });

  it('renders with dark color scheme - secondary variant', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(
      <LinkButton href="/home" variant="secondary">
        Dark secondary
      </LinkButton>
    );
    expect(screen.getByText('Dark secondary')).toBeInTheDocument();
  });

  it('renders with dark color scheme - outline variant', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(
      <LinkButton href="/home" variant="outline">
        Dark outline
      </LinkButton>
    );
    expect(screen.getByText('Dark outline')).toBeInTheDocument();
  });
});
