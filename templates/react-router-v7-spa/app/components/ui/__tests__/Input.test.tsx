import { Input } from '@/components/ui/Input';
import { InputField } from '@/components/ui/InputField';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('Input', () => {
  it('renders a textbox by default', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with the correct type attribute', () => {
    const { container } = render(<Input type="password" />);
    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('passes through HTML input attributes', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Enter text',
    );
  });
});

describe('InputField', () => {
  it('displays an error message when provided', () => {
    render(<InputField errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('renders with a label when label is provided', () => {
    render(<InputField id="test-input" label="My Label" />);
    expect(screen.getByLabelText('My Label')).toBeInTheDocument();
  });

  it('applies wrapperClassName to the wrapper div', () => {
    const { container } = render(
      <InputField wrapperClassName="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
