/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
  });

  it('renders with a label', () => {
    render(<Input label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('renders without a label when not provided', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.queryByText('Email Address')).not.toBeInTheDocument();
  });

  it('renders an error message', () => {
    render(<Input errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders without an error message when not provided', () => {
    render(<Input label="Name" />);
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('renders with both label and error message', () => {
    render(<Input label="Password" errorMessage="Password is too short" />);
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Password is too short')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChangeText={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('renders with a controlled value', () => {
    render(<Input value="test value" onChangeText={jest.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('renders with dark color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(<Input label="Dark input" />);
    expect(screen.getByText('Dark input')).toBeInTheDocument();
  });

  it('renders with error border when errorMessage is present', () => {
    render(<Input errorMessage="Error!" label="Test" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
