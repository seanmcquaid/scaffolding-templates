import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import KitchenSinkScreen from '@/app/(tabs)/kitchen-sink';
import server from '@/mocks/server';

jest.mock('usehooks-ts', () => ({
  useLocalStorage: jest.fn(() => [{ theme: 'light', autoSave: true }, jest.fn()]),
  useToggle: jest.fn(() => [false, jest.fn()]),
  useCounter: jest.fn(() => ({
    count: 0,
    increment: jest.fn(),
    decrement: jest.fn(),
    reset: jest.fn(),
  })),
  useDebounceValue: jest.fn((val: string) => [val]),
  useCopyToClipboard: jest.fn(() => [null, jest.fn()]),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('KitchenSinkScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders advanced settings when toggled', async () => {
    const usehooksts = require('usehooks-ts');
    usehooksts.useToggle.mockReturnValue([true, jest.fn()]);
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText('KitchenSinkPage.enableAutoSave')).toBeInTheDocument();
    });
  });

  it('calls handleSubmit when submit button is pressed with valid data', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText('KitchenSinkPage.submit')).toBeInTheDocument();
    });
    const nameInputs = screen.getAllByRole('textbox');
    const nameInput = nameInputs[0];
    await user.type(nameInput, 'ValidName');
    const submitButton = screen.getByText('KitchenSinkPage.submit');
    await user.click(submitButton);
  });

  it('calls handleCopyPostsCount when copy button is clicked', async () => {
    const user = userEvent.setup();
    const usehooksts = require('usehooks-ts');
    const mockCopyToClipboard = jest.fn();
    usehooksts.useCopyToClipboard.mockReturnValue([null, mockCopyToClipboard]);
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText('KitchenSinkPage.copyPostsCount')).toBeInTheDocument();
    });
    const copyButton = screen.getByText('KitchenSinkPage.copyPostsCount');
    await user.click(copyButton);
    expect(mockCopyToClipboard).toHaveBeenCalled();
  });

  it('calls toggleTheme when theme button is clicked', async () => {
    const user = userEvent.setup();
    const usehooksts = require('usehooks-ts');
    const mockSetPreferences = jest.fn();
    usehooksts.useLocalStorage.mockReturnValue([
      { theme: 'light', autoSave: true },
      mockSetPreferences,
    ]);
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText(/KitchenSinkPage.switchTo/)).toBeInTheDocument();
    });
    const themeButton = screen.getByText(/KitchenSinkPage.switchTo/);
    await user.click(themeButton);
    expect(mockSetPreferences).toHaveBeenCalled();
  });

  it('calls counter increment when + is pressed', async () => {
    const user = userEvent.setup();
    const usehooksts = require('usehooks-ts');
    const mockIncrement = jest.fn();
    usehooksts.useCounter.mockReturnValue({
      count: 0,
      increment: mockIncrement,
      decrement: jest.fn(),
      reset: jest.fn(),
    });
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText('+')).toBeInTheDocument();
    });
    await user.click(screen.getByText('+'));
    expect(mockIncrement).toHaveBeenCalled();
  });

  it('calls counter decrement when - is pressed', async () => {
    const user = userEvent.setup();
    const usehooksts = require('usehooks-ts');
    const mockDecrement = jest.fn();
    usehooksts.useCounter.mockReturnValue({
      count: 0,
      increment: jest.fn(),
      decrement: mockDecrement,
      reset: jest.fn(),
    });
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText('-')).toBeInTheDocument();
    });
    await user.click(screen.getByText('-'));
    expect(mockDecrement).toHaveBeenCalled();
  });

  it('calls counter reset when reset button is pressed', async () => {
    const user = userEvent.setup();
    const usehooksts = require('usehooks-ts');
    const mockReset = jest.fn();
    usehooksts.useCounter.mockReturnValue({
      count: 5,
      increment: jest.fn(),
      decrement: jest.fn(),
      reset: mockReset,
    });
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText('KitchenSinkPage.reset')).toBeInTheDocument();
    });
    await user.click(screen.getByText('KitchenSinkPage.reset'));
    expect(mockReset).toHaveBeenCalled();
  });

  it('updates search term on text input change', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('KitchenSinkPage.typeToSearch')).toBeInTheDocument();
    });
    const searchInput = screen.getByPlaceholderText('KitchenSinkPage.typeToSearch');
    await user.type(searchInput, 'test');
  });

  it('toggles autoSave preference via switch', async () => {
    const user = userEvent.setup();
    const usehooksts = require('usehooks-ts');
    const mockSetPreferences = jest.fn();
    usehooksts.useToggle.mockReturnValue([true, jest.fn()]);
    usehooksts.useLocalStorage.mockReturnValue([
      { theme: 'light', autoSave: true },
      mockSetPreferences,
    ]);
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText('KitchenSinkPage.enableAutoSave')).toBeInTheDocument();
    });
    const switchEl = screen.getByRole('checkbox');
    await user.click(switchEl);
    expect(mockSetPreferences).toHaveBeenCalled();
  });

  it('shows dark theme when preferences.theme is dark', async () => {
    const usehooksts = require('usehooks-ts');
    usehooksts.useLocalStorage.mockReturnValue([{ theme: 'dark', autoSave: false }, jest.fn()]);
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText(/KitchenSinkPage.off/)).toBeInTheDocument();
    });
  });

  it('shows no posts found message when search term does not match any posts', async () => {
    const usehooksts = require('usehooks-ts');
    usehooksts.useDebounceValue.mockReturnValue(['xyznotfound']);
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts', () =>
        HttpResponse.json([
          { id: 1, title: 'first title', body: 'body 1', userId: 1 },
          { id: 2, title: 'second title', body: 'body 2', userId: 2 },
        ])
      )
    );
    renderWithQueryClient(<KitchenSinkScreen />);
    await waitFor(() => {
      expect(screen.getByText(/KitchenSinkPage.noPostsFound/)).toBeInTheDocument();
    });
  });
});
