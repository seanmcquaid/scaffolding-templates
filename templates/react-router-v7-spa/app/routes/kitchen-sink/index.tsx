import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, href } from 'react-router';
import {
  useLocalStorage,
  useToggle,
  useCounter,
  useDebounceValue,
  useCopyToClipboard,
} from 'usehooks-ts';
import { useState } from 'react';
import { z } from 'zod';
import type { Route } from './+types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import { toast } from '@/hooks/useToast';
import { getPostsQuery } from '@/services/queries/posts';
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

export const clientLoader = async () => {
  const posts = await queryClient.ensureQueryData(getPostsQuery());

  return posts;
};

clientLoader.hydrate = true;

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const { errors, data, defaultValues } = getValidatedFormData({
    formData,
    schema: formDataSchema,
  });
  if (errors) {
    return { defaultValues, errors };
  }

  if (!data) {
    throw new Error('Validation failed but no errors reported');
  }

  toast({
    title: `Hello ${data.name}!`,
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
  const [preferences, setPreferences] = useLocalStorage('user-preferences', {
    theme: 'light',
    autoSave: true,
  });

  const [showAdvanced, toggleAdvanced] = useToggle(false);

  const { count, increment, decrement, reset } = useCounter(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);

  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const handleCopyPostsCount = () => {
    copyToClipboard(`Found ${loaderData?.length || 0} posts`);
  };

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">
        Kitchen Sink - usehooks-ts Examples
      </h1>

      {/* Original form */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">React Hook Form + Zod</h2>
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
            Current theme: {preferences.theme} | Auto-save:{' '}
            {preferences.autoSave ? 'On' : 'Off'}
          </p>
          <div className="space-x-2">
            <Button onClick={toggleTheme}>
              Switch to {preferences.theme === 'light' ? 'Dark' : 'Light'} Theme
            </Button>
            <Button onClick={toggleAdvanced}>
              {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
            </Button>
          </div>
          {showAdvanced && (
            <div className="mt-2 rounded bg-gray-50 p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.autoSave}
                  onChange={e =>
                    setPreferences(prev => ({
                      ...prev,
                      autoSave: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                Enable auto-save
              </label>
            </div>
          )}
        </div>

        {/* useCounter */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">useCounter</h3>
          <p className="mb-2 text-sm text-gray-600">Count: {count}</p>
          <div className="space-x-2">
            <Button onClick={increment}>+</Button>
            <Button onClick={decrement}>-</Button>
            <Button onClick={reset}>Reset</Button>
          </div>
        </div>

        {/* useDebounceValue */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">useDebounceValue</h3>
          <Input
            label="Search Posts (debounced)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="mb-2"
          />
          <p className="text-sm text-gray-600">
            Debounced value: "{debouncedSearchTerm}"
            {debouncedSearchTerm &&
              ` (${
                loaderData?.filter(post =>
                  post.title
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase()),
                ).length
              } matches)`}
          </p>
        </div>

        {/* useCopyToClipboard */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">useCopyToClipboard</h3>
          <div className="space-x-2">
            <Button onClick={handleCopyPostsCount}>Copy Posts Count</Button>
            <Button onClick={() => copyToClipboard(window.location.href)}>
              Copy Current URL
            </Button>
          </div>
          {copiedText && (
            <p className="mt-2 text-sm text-green-600">
              ✓ Copied: {copiedText}
            </p>
          )}
        </div>
      </section>

      {/* Posts list with search filter */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          Posts ({loaderData?.length || 0})
        </h2>
        <ul className="grid grid-cols-2 gap-2">
          {loaderData
            ?.filter(
              post =>
                !debouncedSearchTerm ||
                post.title
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase()),
            )
            ?.map(post => (
              <li className="flex items-center" key={post.id}>
                <LinkButton
                  to={href('/react-query/:id', {
                    id: post.id.toString(),
                  })}
                >
                  {post.title.substring(0, 20)}...
                </LinkButton>
              </li>
            ))}
        </ul>
        {debouncedSearchTerm &&
          loaderData?.filter(post =>
            post.title
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()),
          ).length === 0 && (
            <p className="mt-2 text-gray-500">
              No posts found matching "{debouncedSearchTerm}"
            </p>
          )}
      </section>
    </div>
  );
};

export default KitchenSinkPage;
