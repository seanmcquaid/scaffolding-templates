import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import KitchenSinkPage, { clientAction } from '..';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import type { Route } from '../+types';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

const loaderData = [
  { body: 'Body 1', id: 1, title: 'Pos1', userId: 1 },
  { body: 'Body 2', id: 2, title: 'Post 2', userId: 2 },
];

const renderKitchenSink = () => {
  const RoutesStub = createRoutesStub([
    {
      Component: () => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <KitchenSinkPage loaderData={loaderData} />
      ),
      path: '/',
    },
  ]);
  return render(<RoutesStub />);
};

describe('KitchenSinkPage', () => {
  describe('clientAction', () => {
    it('Returns errors if there is a validation error with the form data', async () => {
      const formData = new FormData();
      formData.append('name', 'a');
      const headers = new Headers();
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      const request = new Request(new URL('http://localhost:3000'), {
        body: formData,
        headers: new Headers(),
        method: 'POST',
      });
      const result = await clientAction({
        request,
      } as Route.ClientActionArgs);
      expect(result.errors).not.toBeUndefined();
      expect(result.defaultValues).toEqual({ name: 'a' });
      expect(result.data).toBeUndefined();
    });
    it('Returns data and calls the toast if there are no validation errors', async () => {
      const formData = new FormData();
      formData.append('name', 'test');
      const headers = new Headers();
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      const request = new Request(new URL('http://localhost:3000'), {
        body: formData,
        headers: new Headers(),
        method: 'POST',
      });
      const result = await clientAction({
        request,
      } as Route.ClientActionArgs);
      expect(result.errors).toBeUndefined();
      expect(result.defaultValues).toBeUndefined();
      expect(result.data).toEqual({ name: 'test' });
    });
  });
  it('Renders loader data', async () => {
    const RoutesStub = createRoutesStub([
      {
        Component: () => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          <KitchenSinkPage
            loaderData={[
              { body: 'Body 1', id: 1, title: 'Pos1', userId: 1 },
              { body: 'Body 2', id: 2, title: 'Post 2', userId: 2 },
            ]}
          />
        ),
        path: '/',
      },
    ]);

    render(<RoutesStub />);

    expect(screen.queryByText('Pos1...')).toBeInTheDocument();
  });
  it('Displays an error message if the name is too short', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: () => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          <KitchenSinkPage
            loaderData={[
              { body: 'Body 1', id: 1, title: 'Pos1', userId: 1 },
              { body: 'Body 2', id: 2, title: 'Post 2', userId: 2 },
            ]}
          />
        ),
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await user.type(screen.getByLabelText('KitchenSinkPage.name'), 'a');
    await waitFor(() =>
      expect(
        screen.getByText('Name must be between 3 and 10 characters'),
      ).toBeInTheDocument(),
    );
  });
  it('Toggles the theme when the switch theme button is clicked', async () => {
    const user = userEvent.setup();
    renderKitchenSink();
    const themeButton = screen.getByText(
      /KitchenSinkPage\.switchTo.+KitchenSinkPage\.(darkTheme|lightTheme).+KitchenSinkPage\.theme/,
    );
    await user.click(themeButton);
    expect(themeButton).toBeInTheDocument();
  });
  it('Shows and hides advanced settings when the toggle is clicked', async () => {
    const user = userEvent.setup();
    renderKitchenSink();
    const toggleButton = screen.getByText(
      /KitchenSinkPage\.show.+KitchenSinkPage\.advancedSettings/,
    );
    expect(
      screen.queryByText('KitchenSinkPage.enableAutoSave'),
    ).not.toBeInTheDocument();
    await user.click(toggleButton);
    expect(
      screen.getByText('KitchenSinkPage.enableAutoSave'),
    ).toBeInTheDocument();
    await user.click(toggleButton);
    expect(
      screen.queryByText('KitchenSinkPage.enableAutoSave'),
    ).not.toBeInTheDocument();
  });
  it('Increments, decrements and resets the counter', async () => {
    const user = userEvent.setup();
    renderKitchenSink();
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    const resetButton = screen.getByText('KitchenSinkPage.reset');
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(decrementButton);
    await user.click(resetButton);
    expect(screen.getByText(/KitchenSinkPage\.count/)).toBeInTheDocument();
  });
  it('Filters posts based on debounced search input', async () => {
    const user = userEvent.setup();
    renderKitchenSink();
    const searchInput = screen.getByLabelText('KitchenSinkPage.searchPosts');
    await user.type(searchInput, 'Pos1');
    await waitFor(() => {
      expect(screen.getByText('Pos1...')).toBeInTheDocument();
    });
  });
  it('Copies the posts count to clipboard when the copy button is clicked', async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });
    renderKitchenSink();
    const copyButton = screen.getByText('KitchenSinkPage.copyPostsCount');
    await user.click(copyButton);
    expect(writeTextMock).toHaveBeenCalled();
  });
});
