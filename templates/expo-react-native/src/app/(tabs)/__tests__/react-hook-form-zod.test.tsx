import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import ReactHookFormZodScreen from '@/app/(tabs)/react-hook-form-zod';

describe('ReactHookFormZodScreen', () => {
  it('shows a validation error when an invalid email is submitted', async () => {
    render(<ReactHookFormZodScreen />);
    const inputs = screen.getAllByDisplayValue('');
    fireEvent.changeText(inputs[0], 'not-a-valid-email');
    await waitFor(
      () => {
        expect(screen.getByText('Please enter a valid email')).toBeTruthy();
      },
      { timeout: 10000 }
    );
  }, 15000);

  it('shows a validation error when the password is too short', async () => {
    render(<ReactHookFormZodScreen />);
    const inputs = screen.getAllByDisplayValue('');
    fireEvent.changeText(inputs[1], 'ab');
    await waitFor(
      () => {
        expect(screen.getByText(/Too small: expected string to have >=3 characters/)).toBeTruthy();
      },
      { timeout: 10000 }
    );
  }, 15000);
});
