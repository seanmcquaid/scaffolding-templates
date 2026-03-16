import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ReactHookFormZodScreen from '@/app/(tabs)/react-hook-form-zod';

describe('ReactHookFormZodScreen', () => {
  it('shows a validation error when an invalid email is submitted', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormZodScreen />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'not-a-valid-email');
    await user.tab();
    await screen.findByText('Please enter a valid email');
  });

  it('shows a validation error when the password is too short', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormZodScreen />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[1], 'ab');
    await user.tab();
    await screen.findByText('Too small: expected string to have >=3 characters');
  });
});
