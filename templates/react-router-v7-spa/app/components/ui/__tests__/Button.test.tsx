import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders as a native button element by default', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button').tagName).toBe('BUTTON');
  });

  it('renders as the child element when asChild is true', () => {
    render(
      <Button asChild>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <a href="/test">Link button</a>
      </Button>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link').tagName).toBe('A');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      // eslint-disable-next-line i18next/no-literal-string
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies the destructive variant class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button').className).toContain('bg-destructive');
  });

  it('applies the outline variant class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button').className).toContain('border-input');
  });

  it('applies the secondary variant class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button').className).toContain('bg-secondary');
  });

  it('applies the ghost variant class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button').className).toContain(
      'hover:bg-accent',
    );
  });

  it('applies the link variant class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button').className).toContain(
      'underline-offset-4',
    );
  });

  it('applies the sm size class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button').className).toContain('h-9');
  });

  it('applies the lg size class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button').className).toContain('h-11');
  });

  it('applies the icon size class', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button size="icon">Icon</Button>);
    expect(screen.getByRole('button').className).toContain('h-10 w-10');
  });

  it('applies a custom className', () => {
    render(
      // eslint-disable-next-line i18next/no-literal-string
      <Button className="custom-class">Custom</Button>,
    );
    expect(screen.getByRole('button').className).toContain('custom-class');
  });
});
