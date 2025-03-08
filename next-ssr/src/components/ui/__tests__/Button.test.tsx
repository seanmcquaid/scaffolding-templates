import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('applies custom className', () => {
    render(<Button className="test-class">Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('test-class');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);

    let button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('bg-destructive');

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveClass('border-input');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toHaveClass('bg-secondary');

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('hover:bg-accent');

    rerender(<Button variant="link">Link</Button>);
    button = screen.getByRole('button', { name: 'Link' });
    expect(button).toHaveClass('text-primary');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="default">Default</Button>);

    let button = screen.getByRole('button', { name: 'Default' });
    expect(button).toHaveClass('h-10');

    rerender(<Button size="sm">Small</Button>);
    button = screen.getByRole('button', { name: 'Small' });
    expect(button).toHaveClass('h-9');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: 'Large' });
    expect(button).toHaveClass('h-11');

    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole('button', { name: 'Icon' });
    expect(button).toHaveClass('w-10');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });
});
