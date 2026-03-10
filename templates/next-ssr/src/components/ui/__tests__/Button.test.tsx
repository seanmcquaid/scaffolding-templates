import { Button } from '../Button';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('Button', () => {
  it('renders children', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with destructive variant', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with outline variant', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('forwards additional HTML button props', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button data-testid="my-button">Custom</Button>);
    expect(screen.getByTestId('my-button')).toBeInTheDocument();
  });
});
