import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';

const StateManagementExamplesPage = () => {
  const { t } = useAppTranslation();

  const examples = [
    {
      title: 'URL State',
      description: 'Search filters, pagination, modal state in URL',
      path: '/state-management-examples/url-state',
    },
    {
      title: 'Web Storage',
      description: 'Theme, user preferences persisted across sessions',
      path: '/state-management-examples/web-storage',
    },
    {
      title: 'Local State',
      description: 'Component-specific state with useState',
      path: '/state-management-examples/local-state',
    },
    {
      title: 'Lifted State',
      description: 'Shared state between sibling components',
      path: '/state-management-examples/lifted-state',
    },
    {
      title: 'Derived State',
      description: 'Computed values from existing state',
      path: '/state-management-examples/derived-state',
    },
    {
      title: 'Refs',
      description: 'DOM references and focus management',
      path: '/state-management-examples/refs',
    },
    {
      title: 'Context',
      description: 'Theme provider and subtree state',
      path: '/state-management-examples/context',
    },
    {
      title: 'Global State',
      description: 'Shopping cart with global state management',
      path: '/state-management-examples/global-state',
    },
  ];

  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-3xl font-bold">State Management Examples</h1>
        <p className="mb-8 text-gray-600">
          Explore practical examples for each state management pattern mentioned in the State Management Hierarchy.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {examples.map(example => (
            <div
              key={example.path}
              className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold">{example.title}</h2>
              <p className="mb-4 text-sm text-gray-600">{example.description}</p>
              <LinkButton
                className="w-full"
                to={example.path}
                variant="outline"
              >
                View Example
              </LinkButton>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold">State Management Hierarchy</h3>
          <p className="mb-4 text-sm text-gray-700">
            Choose the right state management pattern based on your needs:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="pb-2 text-left">State Type</th>
                  <th className="pb-2 text-left">Use Case</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">URL</td>
                  <td className="py-2">Sharable app location</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">Web storage</td>
                  <td className="py-2">Persist between sessions, one browser</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">Local state</td>
                  <td className="py-2">Only one component needs the state</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">Lifted state</td>
                  <td className="py-2">Multiple related components need the state</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">Derived state</td>
                  <td className="py-2">State can be derived from existing state</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">Refs</td>
                  <td className="py-2">DOM Reference, state that isn't rendered</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">Context</td>
                  <td className="py-2">Subtree state or a small amount of Global state</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2 font-medium">Global state</td>
                  <td className="py-2">A considerable amount of Global State</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StateManagementExamplesPage;