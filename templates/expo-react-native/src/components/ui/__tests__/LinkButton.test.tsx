/**
 * @jest-environment jsdom
 */
import { LinkButton } from '../LinkButton';

describe('LinkButton', () => {
  it('exports LinkButton component', () => {
    expect(LinkButton).toBeDefined();
    expect(typeof LinkButton).toBe('function');
  });

  it('accepts href and children props', () => {
    const result = LinkButton({
      href: '/',
      children: 'Navigate',
    });
    expect(result).toBeDefined();
  });

  it('accepts variant prop - default', () => {
    const result = LinkButton({
      href: '/',
      children: 'Navigate',
      variant: 'default',
    });
    expect(result).toBeDefined();
  });

  it('accepts variant prop - secondary', () => {
    const result = LinkButton({
      href: '/',
      children: 'Navigate',
      variant: 'secondary',
    });
    expect(result).toBeDefined();
  });

  it('accepts variant prop - outline', () => {
    const result = LinkButton({
      href: '/',
      children: 'Navigate',
      variant: 'outline',
    });
    expect(result).toBeDefined();
  });

  it('accepts string href', () => {
    const result = LinkButton({
      href: '/explore',
      children: 'Explore',
    });
    expect(result).toBeDefined();
  });

  it('accepts object href with pathname', () => {
    const result = LinkButton({
      href: { pathname: '/explore', params: { id: '1' } },
      children: 'Explore',
    });
    expect(result).toBeDefined();
  });
});
