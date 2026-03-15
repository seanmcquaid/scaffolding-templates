/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<Button>Default</Button>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText('Destructive')).toBeInTheDocument();
  });

  it('renders as disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('calls onPress when clicked', async () => {
    const user = userEvent.setup();
    const handlePress = jest.fn();
    render(<Button onPress={handlePress}>Press me</Button>);
    await user.click(screen.getByText('Press me'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const user = userEvent.setup();
    const handlePress = jest.fn();
    render(
      <Button disabled onPress={handlePress}>
        Disabled
      </Button>
    );
    await user.click(screen.getByText('Disabled'));
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('renders with dark color scheme - default variant', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(<Button>Dark default</Button>);
    expect(screen.getByText('Dark default')).toBeInTheDocument();
  });

  it('renders with dark color scheme - secondary variant', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(<Button variant="secondary">Dark secondary</Button>);
    expect(screen.getByText('Dark secondary')).toBeInTheDocument();
  });

  it('renders with dark color scheme - outline variant', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(<Button variant="outline">Dark outline</Button>);
    expect(screen.getByText('Dark outline')).toBeInTheDocument();
  });

  it('renders with dark color scheme - destructive variant', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValueOnce('dark');
    render(<Button variant="destructive">Dark destructive</Button>);
    expect(screen.getByText('Dark destructive')).toBeInTheDocument();
  });
});
