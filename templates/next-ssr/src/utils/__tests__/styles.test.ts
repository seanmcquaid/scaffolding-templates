import { cn } from '../styles';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes with false', () => {
    const condition = false;
    expect(cn('foo', condition && 'bar')).toBe('foo');
  });

  it('handles conditional classes with undefined', () => {
    expect(cn('foo', undefined)).toBe('foo');
  });

  it('deduplicates conflicting tailwind classes', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles array of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });
});
