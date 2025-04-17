import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import KitchenSinkPage, { action, clientAction } from '..';
import type { Route } from '../+types';

describe('KitchenSinkPage', () => {
  describe('action', () => {
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
      const result = await action({
        request,
      } as Route.ActionArgs);
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
      const result = await action({
        request,
      } as Route.ActionArgs);
      expect(result.errors).toBeUndefined();
      expect(result.defaultValues).toBeUndefined();
      expect(result.data).toEqual({ name: 'test' });
    });
  });
  describe('clientAction', () => {
    it('Returns errors if there is a validation error with the form data', async () => {
      const result = await clientAction({
        serverAction: async () => ({
          defaultValues: { name: 'a' },
          errors: { name: 'Name must be between 3 and 10 characters' },
        }),
      } as Route.ClientActionArgs);
      expect(result.errors).not.toBeUndefined();
      expect(result.defaultValues).toEqual({ name: 'a' });
      expect(result.data).toBeUndefined();
    });
    it('Returns data and calls the toast if there are no validation errors', async () => {
      const result = await clientAction({
        serverAction: async () => ({
          data: { name: 'test' },
          defaultValues: undefined,
          errors: undefined,
        }),
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

    expect(screen.queryByText('Pos1')).toBeInTheDocument();
  });
  it('Displays an error message if the name is too short', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: () => (
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
    await user.type(screen.getByLabelText('Name'), 'a');
    await waitFor(() =>
      expect(
        screen.getByText('Name must be between 3 and 10 characters'),
      ).toBeInTheDocument(),
    );
  });
});
