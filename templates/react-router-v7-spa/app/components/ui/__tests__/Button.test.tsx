import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders as a button element by default', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders as a child element when asChild is true', () => {
    render(
      <Button asChild>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <a href="/test">Link button</a>
      </Button>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders with different size variants', () => {
    render(
      <>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button size="sm">Small</Button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button size="lg">Large</Button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button size="icon">Icon</Button>
      </>,
    );
    expect(screen.getByText('Small')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('renders with different variant styles', () => {
    render(
      <>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button variant="destructive">Destructive</Button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button variant="outline">Outline</Button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button variant="secondary">Secondary</Button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button variant="ghost">Ghost</Button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Button variant="link">Link</Button>
      </>,
    );
    expect(screen.getByText('Destructive')).toBeInTheDocument();
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });
});
