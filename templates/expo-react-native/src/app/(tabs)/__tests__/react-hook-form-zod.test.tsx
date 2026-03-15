/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ReactHookFormZodScreen from '@/app/(tabs)/react-hook-form-zod';

describe('ReactHookFormZodScreen', () => {
  it('renders without crashing', () => {
    render(<ReactHookFormZodScreen />);
  });

  it('renders the page title', () => {
    render(<ReactHookFormZodScreen />);
    expect(screen.getByText('ReactHookFormZodPage.title')).toBeInTheDocument();
  });

  it('renders username input label', () => {
    render(<ReactHookFormZodScreen />);
    expect(screen.getByText('ReactHookFormZodPage.username')).toBeInTheDocument();
  });

  it('renders password input label', () => {
    render(<ReactHookFormZodScreen />);
    expect(screen.getByText('ReactHookFormZodPage.password')).toBeInTheDocument();
  });

  it('renders confirm password input label', () => {
    render(<ReactHookFormZodScreen />);
    expect(screen.getByText('ReactHookFormZodPage.confirmPassword')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormZodScreen />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'not-a-valid-email');
    await user.tab();
    await screen.findByText('Please enter a valid email');
  });

  it('shows validation error for short password', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormZodScreen />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[1], 'ab');
    await user.tab();
    await screen.findByText('Too small: expected string to have >=3 characters');
  });
});
