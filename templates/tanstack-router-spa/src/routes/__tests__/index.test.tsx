import { HomePage } from '@/routes/index.lazy';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('HomePage', () => {
  it('renders the page title', async () => {
    const RoutesStub = createRoutesStub([{ component: HomePage, path: '/' }]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('HomePage.title')).toBeInTheDocument(),
    );
  });

  it('renders the page subtitle', async () => {
    const RoutesStub = createRoutesStub([{ component: HomePage, path: '/' }]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('HomePage.subTitle')).toBeInTheDocument(),
    );
  });

  it('renders navigation links', async () => {
    const RoutesStub = createRoutesStub([{ component: HomePage, path: '/' }]);
    render(<RoutesStub />);
    await waitFor(() => {
      expect(screen.getByText('HomePage.reactQuery')).toBeInTheDocument();
      expect(screen.getByText('HomePage.reactHookFormZod')).toBeInTheDocument();
      expect(screen.getByText('HomePage.kitchenSink')).toBeInTheDocument();
    });
  });
});
