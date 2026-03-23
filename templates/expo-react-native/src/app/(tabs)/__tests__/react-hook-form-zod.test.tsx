import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import ReactHookFormZodScreen from '@/app/(tabs)/react-hook-form-zod';

describe('ReactHookFormZodScreen', () => {
  it('Displays an error message if the passwords do not match', async () => {
    render(<ReactHookFormZodScreen />);
    const inputs = screen.getAllByDisplayValue('');
    fireEvent.changeText(inputs[0], 'test@example.com');
    fireEvent.changeText(inputs[1], 'password');
    fireEvent.changeText(inputs[2], 'password1');
    await waitFor(() => expect(screen.getByText('Passwords do not match')).toBeTruthy());
  });
});
