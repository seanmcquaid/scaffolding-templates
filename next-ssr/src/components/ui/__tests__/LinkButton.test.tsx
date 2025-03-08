import { render, screen } from '@testing-library/react';
import LinkButton from '../LinkButton';

describe('LinkButton', () => {
  it('renders with default variant and size', () => {
    render(<LinkButton href="/test">Click me</LinkButton>);

    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('bg-primary');
  });

  it('applies custom className', () => {
    render(
      <LinkButton href="/test" className="test-class">
        Click me
      </LinkButton>,
    );

    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toHaveClass('test-class');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <LinkButton href="/test" variant="destructive">
        Delete
      </LinkButton>,
    );

    let link = screen.getByRole('link', { name: 'Delete' });
    expect(link).toHaveClass('bg-destructive');

    rerender(
      <LinkButton href="/test" variant="outline">
        Outline
      </LinkButton>,
    );
    link = screen.getByRole('link', { name: 'Outline' });
    expect(link).toHaveClass('border-input');

    rerender(
      <LinkButton href="/test" variant="secondary">
        Secondary
      </LinkButton>,
    );
    link = screen.getByRole('link', { name: 'Secondary' });
    expect(link).toHaveClass('bg-secondary');

    rerender(
      <LinkButton href="/test" variant="ghost">
        Ghost
      </LinkButton>,
    );
    link = screen.getByRole('link', { name: 'Ghost' });
    expect(link).toHaveClass('hover:bg-accent');

    rerender(
      <LinkButton href="/test" variant="link">
        Link
      </LinkButton>,
    );
    link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveClass('text-primary');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <LinkButton href="/test" size="default">
        Default
      </LinkButton>,
    );

    let link = screen.getByRole('link', { name: 'Default' });
    expect(link).toHaveClass('h-10');

    rerender(
      <LinkButton href="/test" size="sm">
        Small
      </LinkButton>,
    );
    link = screen.getByRole('link', { name: 'Small' });
    expect(link).toHaveClass('h-9');

    rerender(
      <LinkButton href="/test" size="lg">
        Large
      </LinkButton>,
    );
    link = screen.getByRole('link', { name: 'Large' });
    expect(link).toHaveClass('h-11');

    rerender(
      <LinkButton href="/test" size="icon">
        Icon
      </LinkButton>,
    );
    link = screen.getByRole('link', { name: 'Icon' });
    expect(link).toHaveClass('w-10');
  });
});
