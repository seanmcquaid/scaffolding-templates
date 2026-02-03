/**
 * @jest-environment jsdom
 */
import { Input } from '../Input';

describe('Input', () => {
  it('exports Input component', () => {
    expect(Input).toBeDefined();
    expect(typeof Input).toBe('function');
  });

  it('accepts placeholder prop', () => {
    const result = Input({ placeholder: 'Enter text' });
    expect(result).toBeDefined();
  });

  it('accepts label prop', () => {
    const result = Input({ label: 'Email' });
    expect(result).toBeDefined();
  });

  it('accepts errorMessage prop', () => {
    const result = Input({ errorMessage: 'Required field' });
    expect(result).toBeDefined();
  });

  it('accepts both label and errorMessage', () => {
    const result = Input({
      label: 'Email',
      errorMessage: 'Invalid email',
    });
    expect(result).toBeDefined();
  });

  it('accepts style prop', () => {
    const result = Input({ style: { width: 200 } });
    expect(result).toBeDefined();
  });

  it('accepts TextInput props', () => {
    const result = Input({
      placeholder: 'Search',
      autoCapitalize: 'none',
    });
    expect(result).toBeDefined();
  });
});
