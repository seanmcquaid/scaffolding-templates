import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router';
import { useState } from 'react';
import {
  useLocalStorage,
  useToggle,
  useCounter,
  useInterval,
} from 'usehooks-ts';
import { z } from 'zod';
import type { Route } from './+types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import { toast } from '@/hooks/useToast';
import postsService from '@/services/postsService';
import { postsQueryKeys } from '@/services/queries/posts';
import queryClient from '@/services/queries/queryClient';
import getValidatedFormData from '@/utils/getValidatedFormData';

/* eslint-disable i18next/no-literal-string */

const formDataSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be between 3 and 10 characters',
    })
    .max(10, {
      message: 'Name must be between 3 and 10 characters',
    }),
});

export const loader = async () => {
  const posts = await postsService.getPosts();

  return posts;
};

export const clientLoader = async ({
  serverLoader,
}: Route.ClientLoaderArgs) => {
  const posts = await queryClient.ensureQueryData({
    queryFn: () => serverLoader(),
    queryKey: postsQueryKeys.posts,
  });

  return posts;
};

clientLoader.hydrate = true;

export const action = async ({ request }: Route.ActionArgs) => {
  const { errors, data, defaultValues } = getValidatedFormData({
    formData: await request.formData(),
    schema: formDataSchema,
  });

  if (errors) {
    return { defaultValues, errors };
  }

  return { data };
};

export const clientAction = async ({
  serverAction,
}: Route.ClientActionArgs) => {
  const { data, errors, defaultValues } = await serverAction();

  if (errors) {
    return { defaultValues, errors };
  }

  toast({
    title: `Hello ${data?.name}!`,
  });

  return { data };
};

const KitchenSinkPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formDataSchema),
  });

  // usehooks-ts examples
  const [appConfig, setAppConfig] = useLocalStorage('ssr-app-config', {
    autoRefresh: false,
    itemsPerPage: 10,
  });

  const [showAdvanced, toggleAdvanced] = useToggle(false);
  const {
    count: refreshCount,
    increment: incrementRefresh,
    reset: resetRefresh,
  } = useCounter(0);

  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString(),
  );

  // Update time every second when auto-refresh is enabled
  useInterval(
    () => {
      setCurrentTime(new Date().toLocaleTimeString());
      incrementRefresh();
    },
    appConfig.autoRefresh ? 1000 : null,
  );

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">
        Kitchen Sink - SSR + usehooks-ts Examples
      </h1>

      {/* Original form */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          React Hook Form + Zod + SSR
        </h2>
        <Form method="POST">
          <Input
            className="m-4"
            defaultValue={actionData?.defaultValues?.name}
            errorMessage={errors?.name?.message || actionData?.errors?.name}
            label="Name"
            {...register('name')}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </section>

      {/* usehooks-ts examples */}
      <section className="rounded border p-4">
        <h2 className="mb-4 text-lg font-semibold">usehooks-ts Examples</h2>

        {/* useLocalStorage + useToggle */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">useLocalStorage + useToggle</h3>
          <p className="mb-2 text-sm text-gray-600">
            Auto Refresh: {appConfig.autoRefresh ? 'On' : 'Off'} | Items per
            page: {appConfig.itemsPerPage}
          </p>
          <div className="mb-2 space-x-2">
            <Button
              onClick={() =>
                setAppConfig(prev => ({
                  ...prev,
                  autoRefresh: !prev.autoRefresh,
                }))
              }
            >
              {appConfig.autoRefresh ? 'Stop' : 'Start'} Auto Refresh
            </Button>
            <Button onClick={toggleAdvanced}>
              {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
            </Button>
          </div>
          {showAdvanced && (
            <div className="rounded bg-gray-50 p-2">
              <label className="mb-2 block">
                Items per page:
                <select
                  value={appConfig.itemsPerPage}
                  onChange={e =>
                    setAppConfig(prev => ({
                      ...prev,
                      itemsPerPage: Number(e.target.value),
                    }))
                  }
                  className="ml-2 rounded border px-2 py-1"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </label>
            </div>
          )}
        </div>

        {/* useCounter + useInterval */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">useCounter + useInterval</h3>
          <p className="mb-2 text-sm text-gray-600">
            Current time: {currentTime} | Refresh count: {refreshCount}
          </p>
          <div className="space-x-2">
            <Button onClick={resetRefresh}>Reset Counter</Button>
          </div>
          {appConfig.autoRefresh && (
            <p className="mt-1 text-xs text-blue-600">
              ⏱️ Auto-refreshing every second...
            </p>
          )}
        </div>
      </section>

      {/* Posts list with pagination */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          Posts (showing first {appConfig.itemsPerPage} of{' '}
          {loaderData?.length || 0})
        </h2>
        <ul className="grid grid-cols-2 gap-2">
          {loaderData?.slice(0, appConfig.itemsPerPage)?.map(post => (
            <li className="flex items-center" key={post.id}>
              <LinkButton to={`/react-query/${post.id}`}>
                {post.title.substring(0, 25)}...
              </LinkButton>
            </li>
          ))}
        </ul>
        {loaderData && loaderData.length > appConfig.itemsPerPage && (
          <p className="mt-2 text-sm text-gray-500">
            Showing {appConfig.itemsPerPage} of {loaderData.length} posts
          </p>
        )}
      </section>
    </div>
  );
};

export default KitchenSinkPage;
