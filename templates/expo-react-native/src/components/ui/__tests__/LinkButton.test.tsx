import { LinkButton } from '../LinkButton';
import { render, screen } from '@/utils/testing/reactNativeTestingLibraryUtils';

describe('LinkButton', () => {
  it('renders children text', () => {
    render(<LinkButton href="/">Common.goHome</LinkButton>);
    expect(screen.getByText('Common.goHome')).toBeTruthy();
  });

  it('renders with default variant', () => {
    render(
      <LinkButton href="/" variant="default">
        Common.navigate
      </LinkButton>
    );
    expect(screen.getByText('Common.navigate')).toBeTruthy();
  });

  it('renders with secondary variant', () => {
    render(
      <LinkButton href="/" variant="secondary">
        Common.secondary
      </LinkButton>
    );
    expect(screen.getByText('Common.secondary')).toBeTruthy();
  });

  it('renders with outline variant', () => {
    render(
      <LinkButton href="/" variant="outline">
        Common.outline
      </LinkButton>
    );
    expect(screen.getByText('Common.outline')).toBeTruthy();
  });

  it('accepts string href', () => {
    render(<LinkButton href="/explore">Common.explore</LinkButton>);
    expect(screen.getByText('Common.explore')).toBeTruthy();
  });

  it('accepts object href with pathname', () => {
    render(
      <LinkButton href={{ pathname: '/explore', params: { id: '1' } }}>Common.explore</LinkButton>
    );
    expect(screen.getByText('Common.explore')).toBeTruthy();
  });
});
