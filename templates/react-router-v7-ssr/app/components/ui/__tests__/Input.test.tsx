import { Input } from '@/components/ui/Input';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('Input', () => {
  it('Displays error message if provided', () => {
    render(<Input errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('Does not display error message when not provided', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('Renders with label when provided', () => {
    render(<Input id="name-input" label="Full Name" />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
  });

  it('Renders with label and error message together', () => {
    render(
      <Input
        errorMessage="Field is required"
        id="name-input"
        label="Full Name"
      />,
    );
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });
});
