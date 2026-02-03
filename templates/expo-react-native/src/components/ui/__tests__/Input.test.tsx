import { render, screen } from '@/utils/testing/reactNativeTestingLibraryUtils';
import { Input } from '../Input';

describe('Input', () => {
  it('renders without label or error', () => {
    render(<Input placeholder="Common.enterText" />);
    expect(screen.getByPlaceholderText('Common.enterText')).toBeTruthy();
  });

  it('renders with label', () => {
    render(<Input label="Form.emailLabel" />);
    expect(screen.getByText('Form.emailLabel')).toBeTruthy();
  });

  it('renders with error message', () => {
    render(<Input errorMessage="Form.validation.required" />);
    expect(screen.getByText('Form.validation.required')).toBeTruthy();
  });

  it('renders with both label and error message', () => {
    render(<Input label="Form.emailLabel" errorMessage="Form.validation.invalidEmail" />);
    expect(screen.getByText('Form.emailLabel')).toBeTruthy();
    expect(screen.getByText('Form.validation.invalidEmail')).toBeTruthy();
  });

  it('applies placeholder text', () => {
    render(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
  });
});
