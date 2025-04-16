import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import { createRoutesStub } from 'react-router';
import ReactQueryPostPage from '..';

describe('ReactQueryPostPage', () => {
  it('should render successfully', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        // @ts-expect-error
        Component: () => <ReactQueryPostPage params={{ id: '1' }} />,
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
