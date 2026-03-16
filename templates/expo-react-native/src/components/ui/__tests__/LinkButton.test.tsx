import { render, screen } from '@testing-library/react';
import { LinkButton } from '@/components/ui/LinkButton';

describe('LinkButton', () => {
  it('renders children text with the given href', () => {
    render(<LinkButton href="/home">Go Home</LinkButton>);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('renders with the secondary variant', () => {
    render(
      <LinkButton href="/home" variant="secondary">
        Secondary Link
      </LinkButton>
    );
    expect(screen.getByText('Secondary Link')).toBeInTheDocument();
  });

  it('renders with the outline variant', () => {
    render(
      <LinkButton href="/home" variant="outline">
        Outline Link
      </LinkButton>
    );
    expect(screen.getByText('Outline Link')).toBeInTheDocument();
  });
});
