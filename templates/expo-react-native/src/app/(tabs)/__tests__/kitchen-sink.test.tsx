import { Alert } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { render, screen, waitFor } from '@/utils/testing/reactNativeTestingLibraryUtils';
import KitchenSinkScreen from '@/app/(tabs)/kitchen-sink';

jest.mock('usehooks-ts', () => {
  const actual = jest.requireActual('usehooks-ts');
  return {
    ...actual,
    useCopyToClipboard: () => ['', jest.fn()],
  };
});

describe('KitchenSinkScreen', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows advanced settings when the toggle button is clicked', async () => {
    await render(<KitchenSinkScreen />);
    expect(screen.queryByText(/KitchenSinkPage\.enableAutoSave/)).toBeNull();
    await fireEvent.press(screen.getByText(/KitchenSinkPage\.advancedSettings/));
    expect(screen.getByText(/KitchenSinkPage\.enableAutoSave/)).toBeTruthy();
  });

  it('increments the counter when + is pressed', async () => {
    await render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
    await fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage\.count.*1/)).toBeTruthy();
  });

  it('decrements the counter when - is pressed', async () => {
    await render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
    await fireEvent.press(screen.getByText('-'));
    expect(screen.getByText(/KitchenSinkPage\.count.*-1/)).toBeTruthy();
  });

  it('resets the counter when reset is pressed', async () => {
    await render(<KitchenSinkScreen />);
    await fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage\.count.*1/)).toBeTruthy();
    await fireEvent.press(screen.getByText(/KitchenSinkPage\.reset/));
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
  });

  it('toggles the theme when the theme button is pressed', async () => {
    await render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.currentTheme.*light/)).toBeTruthy();
    await fireEvent.press(screen.getByText(/KitchenSinkPage\.switchTo/));
    expect(screen.getByText(/KitchenSinkPage\.currentTheme.*dark/)).toBeTruthy();
  });

  it('shows no posts found when search term does not match any posts', async () => {
    await render(<KitchenSinkScreen />);
    const searchInput = await screen.findByPlaceholderText('KitchenSinkPage.typeToSearch');
    await fireEvent.changeText(searchInput, 'xyznotfound');
    await waitFor(() => expect(screen.getByText(/KitchenSinkPage\.noPostsFound/)).toBeTruthy(), {
      timeout: 600,
    });
  });

  it('shows an alert with the submitted name when the form is submitted with a valid name', async () => {
    jest.spyOn(Alert, 'alert');
    await render(<KitchenSinkScreen />);
    const inputs = screen.getAllByDisplayValue('');
    await fireEvent.changeText(inputs[0], 'Alice');
    await fireEvent.press(screen.getByText('KitchenSinkPage.submit'));
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith('KitchenSinkPage.title', 'Common.helloWorld Alice!')
    );
  });

  it('toggles autoSave off when the auto-save switch is turned off', async () => {
    await render(<KitchenSinkScreen />);
    await fireEvent.press(screen.getByText(/KitchenSinkPage\.advancedSettings/));
    expect(screen.getByText(/KitchenSinkPage\.autoSave.*KitchenSinkPage\.on/)).toBeTruthy();
    const autoSaveSwitch = screen.getByRole('switch');
    await fireEvent(autoSaveSwitch, 'valueChange', false);
    expect(screen.getByText(/KitchenSinkPage\.autoSave.*KitchenSinkPage\.off/)).toBeTruthy();
  });

  it('shows the copy posts count alert when the copy button is pressed', async () => {
    jest.spyOn(Alert, 'alert');
    await render(<KitchenSinkScreen />);
    await waitFor(() => expect(screen.getByText(/KitchenSinkPage\.copyPostsCount/)).toBeTruthy());
    await fireEvent.press(screen.getByText('KitchenSinkPage.copyPostsCount'));
    expect(Alert.alert).toHaveBeenCalledWith('KitchenSinkPage.copied', expect.any(String));
  });
});
