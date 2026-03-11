import LinkButton from '../LinkButton';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('LinkButton', () => {
  it('renders children', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<LinkButton href="/example">Go to example</LinkButton>);
    expect(
      screen.getByRole('link', { name: 'Go to example' }),
    ).toBeInTheDocument();
  });

  it('renders with the correct href', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<LinkButton href="/about">About</LinkButton>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
  });

  it('renders with destructive variant', () => {
    render(
      // eslint-disable-next-line i18next/no-literal-string
      <LinkButton href="/" variant="destructive">
        Delete
      </LinkButton>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
