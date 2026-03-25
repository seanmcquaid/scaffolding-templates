/* eslint-disable i18next/no-literal-string */
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import { Button, buttonVariants } from '@/components/ui/Button';

describe('Button', () => {
  it('renders as a button element by default', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="my-custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });

  describe('variants', () => {
    it('applies default variant styles', () => {
      render(<Button variant="default">Default</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-primary');
    });

    it('applies destructive variant styles', () => {
      render(<Button variant="destructive">Destructive</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-destructive');
    });

    it('applies outline variant styles', () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button')).toHaveClass('border');
    });

    it('applies secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-secondary');
    });

    it('applies ghost variant styles', () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('hover:bg-accent');
    });

    it('applies link variant styles', () => {
      render(<Button variant="link">Link</Button>);
      expect(screen.getByRole('button')).toHaveClass('underline-offset-4');
    });
  });

  describe('sizes', () => {
    it('applies default size styles', () => {
      expect(buttonVariants({ size: 'default' })).toContain('h-10');
    });

    it('applies sm size styles', () => {
      expect(buttonVariants({ size: 'sm' })).toContain('h-9');
    });

    it('applies lg size styles', () => {
      expect(buttonVariants({ size: 'lg' })).toContain('h-11');
    });

    it('applies icon size styles', () => {
      expect(buttonVariants({ size: 'icon' })).toContain('w-10');
    });
  });

  describe('asChild', () => {
    it('renders as child element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link button</a>
        </Button>,
      );
      expect(
        screen.getByRole('link', { name: 'Link button' }),
      ).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
