import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import ServerDataComponent from '@/components/rsc/ServerDataComponent';
import useAppTranslation from '@/hooks/useAppTranslation';

const HomePage = () => {
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Router V7 RSC Exploration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exploring React Server Components patterns and preparing for future RSC integration with React Router V7
          </p>
        </div>

        <ServerDataComponent>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              This component demonstrates what a React Server Component might look like when supported by React Router v7.
            </p>
          </div>
        </ServerDataComponent>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Current Status
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>✅ React Router v7.7.0 (latest stable)</li>
            <li>✅ React 19.1.0 with RSC capabilities</li>
            <li>✅ Server-side rendering with streaming</li>
            <li>❌ Native RSC support (not yet available)</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinkButton className="h-20 flex items-center justify-center" to={t('Routes.reactQuery')}>
            <div className="text-center">
              <div className="font-medium">View Posts</div>
              <div className="text-sm opacity-75">Server-side data loading demo</div>
            </div>
          </LinkButton>
          
          <LinkButton className="h-20 flex items-center justify-center" to={t('Routes.kitchenSink')}>
            <div className="text-center">
              <div className="font-medium">Kitchen Sink</div>
              <div className="text-sm opacity-75">Component examples</div>
            </div>
          </LinkButton>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            See <code className="bg-gray-100 px-2 py-1 rounded">docs/rsc-support.md</code> for detailed information about RSC support status and roadmap.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
