import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-input');
  });

  it('renders with label', () => {
    render(<Input label="Email" id="email" />);

    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('renders with error message', () => {
    render(<Input errorMessage="This field is required" />);

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="test-class" />);

    // The className is applied to the wrapper div
    const input = screen.getByRole('textbox');
    expect(input.parentElement?.parentElement).toHaveClass('test-class');
  });

  it('handles user input', async () => {
    render(<Input id="test-input" />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test value');

    expect(input).toHaveValue('test value');
  });

  it('handles disabled state', () => {
    render(<Input disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('passes through other props', () => {
    render(
      <Input
        placeholder="Enter your name"
        name="username"
        required
        maxLength={50}
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('maxLength', '50');
  });
});
