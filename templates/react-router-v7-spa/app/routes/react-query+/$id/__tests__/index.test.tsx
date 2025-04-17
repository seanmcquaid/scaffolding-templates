import { createRoutesStub } from 'react-router';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import ReactQueryPostPage from '..';

describe('ReactQueryPostPage', () => {
  it('should render successfully', async () => {
    const RoutesStub = createRoutesStub([
      {
        Component: () => <ReactQueryPostPage params={{ id: '1' }} />,
        // @ts-expect-error
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(async () =>
      expect(
        await screen.findByRole('heading', {
          level: 1,
        }),
      ).toBeInTheDocument(),
    );
  });
});
