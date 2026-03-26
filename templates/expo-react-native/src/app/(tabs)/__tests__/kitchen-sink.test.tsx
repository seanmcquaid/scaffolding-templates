import { Alert } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { render, screen, waitFor } from '@/utils/testing/reactNativeTestingLibraryUtils';
import KitchenSinkScreen from '@/app/(tabs)/kitchen-sink';

describe('KitchenSinkScreen', () => {
  it('shows advanced settings when the toggle button is clicked', async () => {
    render(<KitchenSinkScreen />);
    expect(screen.queryByText(/KitchenSinkPage\.enableAutoSave/)).toBeNull();
    fireEvent.press(screen.getByText(/KitchenSinkPage\.advancedSettings/));
    expect(screen.getByText(/KitchenSinkPage\.enableAutoSave/)).toBeTruthy();
  });

  it('increments the counter when + is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
    fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage\.count.*1/)).toBeTruthy();
  });

  it('decrements the counter when - is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
    fireEvent.press(screen.getByText('-'));
    expect(screen.getByText(/KitchenSinkPage\.count.*-1/)).toBeTruthy();
  });

  it('resets the counter when reset is pressed', () => {
    render(<KitchenSinkScreen />);
    fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage\.count.*1/)).toBeTruthy();
    fireEvent.press(screen.getByText(/KitchenSinkPage\.reset/));
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
  });

  it('toggles the theme when the theme button is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.currentTheme.*light/)).toBeTruthy();
    fireEvent.press(screen.getByText(/KitchenSinkPage\.switchTo/));
    expect(screen.getByText(/KitchenSinkPage\.currentTheme.*dark/)).toBeTruthy();
  });

  it('shows no posts found when search term does not match any posts', async () => {
    render(<KitchenSinkScreen />);
    const searchInput = await screen.findByPlaceholderText('KitchenSinkPage.typeToSearch');
    fireEvent.changeText(searchInput, 'xyznotfound');
    await waitFor(() => expect(screen.getByText(/KitchenSinkPage\.noPostsFound/)).toBeTruthy(), {
      timeout: 600,
    });
  });

  it('shows an alert with the submitted name when the form is submitted with a valid name', async () => {
    jest.spyOn(Alert, 'alert');
    render(<KitchenSinkScreen />);
    const inputs = screen.getAllByDisplayValue('');
    fireEvent.changeText(inputs[0], 'Alice');
    fireEvent.press(screen.getByText('KitchenSinkPage.submit'));
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith('KitchenSinkPage.title', 'Common.helloWorld Alice!')
    );
  });

  it('toggles autoSave off when the auto-save switch is turned off', async () => {
    render(<KitchenSinkScreen />);
    fireEvent.press(screen.getByText(/KitchenSinkPage\.advancedSettings/));
    expect(screen.getByText(/KitchenSinkPage\.autoSave.*KitchenSinkPage\.on/)).toBeTruthy();
    const autoSaveSwitch = screen.getByRole('switch');
    fireEvent(autoSaveSwitch, 'valueChange', false);
    expect(screen.getByText(/KitchenSinkPage\.autoSave.*KitchenSinkPage\.off/)).toBeTruthy();
  });

  it('shows the copy posts count alert when the copy button is pressed', async () => {
    jest.spyOn(Alert, 'alert');
    render(<KitchenSinkScreen />);
    await waitFor(() => expect(screen.getByText(/KitchenSinkPage\.copyPostsCount/)).toBeTruthy());
    fireEvent.press(screen.getByText('KitchenSinkPage.copyPostsCount'));
    expect(Alert.alert).toHaveBeenCalledWith('KitchenSinkPage.copied', expect.any(String));
  });
});
