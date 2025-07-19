import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  useLocalStorage,
  useToggle,
  useCounter,
  useDebounceValue,
  useMediaQuery,
  useOnClickOutside,
} from 'usehooks-ts';
import { useRef } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import { useToast } from '@/hooks/useToast';
import { getPostsQuery } from '@/services/queries/posts';

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

export const KitchenSinkPage = () => {
  const { data: posts } = useSuspenseQuery(getPostsQuery());
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formDataSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formDataSchema),
  });
  const { toast } = useToast();

  // usehooks-ts examples
  const [userPrefs, setUserPrefs] = useLocalStorage('tanstack-user-prefs', {
    layout: 'grid',
    darkMode: false,
  });

  const [showFilters, toggleFilters] = useToggle(false);
  const { count, increment, decrement, reset } = useCounter(0);

  const [filterText, setFilterText] = useState('');
  const [debouncedFilter] = useDebounceValue(filterText, 300);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  const handleOnSubmit = handleSubmit(data => {
    toast({
      title: `Hello ${data.name}!`,
    });
  });

  const filteredPosts = posts?.filter(
    post =>
      !debouncedFilter ||
      post.title.toLowerCase().includes(debouncedFilter.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">
        Kitchen Sink - usehooks-ts Examples
      </h1>

      {/* Original form */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          React Hook Form + Zod + TanStack Query
        </h2>
        <form onSubmit={handleOnSubmit}>
          <Input
            className="m-4"
            errorMessage={errors?.name?.message}
            label="Name"
            {...register('name')}
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>

      {/* usehooks-ts examples */}
      <section className="rounded border p-4">
        <h2 className="mb-4 text-lg font-semibold">usehooks-ts Examples</h2>

        {/* useLocalStorage + useToggle */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">useLocalStorage + useToggle</h3>
          <p className="mb-2 text-sm text-gray-600">
            Layout: {userPrefs.layout} | Dark Mode:{' '}
            {userPrefs.darkMode ? 'On' : 'Off'}
          </p>
          <div className="mb-2 space-x-2">
            <Button
              onClick={() =>
                setUserPrefs(prev => ({
                  ...prev,
                  layout: prev.layout === 'grid' ? 'list' : 'grid',
                }))
              }
            >
              Switch to {userPrefs.layout === 'grid' ? 'List' : 'Grid'} View
            </Button>
            <Button onClick={toggleFilters}>
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
          {showFilters && (
            <div className="rounded bg-gray-50 p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={userPrefs.darkMode}
                  onChange={e =>
                    setUserPrefs(prev => ({
                      ...prev,
                      darkMode: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                Enable dark mode
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
            label="Filter Posts (debounced)"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            placeholder="Type to filter posts..."
            className="mb-2"
          />
          <p className="text-sm text-gray-600">
            Debounced filter: "{debouncedFilter}"
            {debouncedFilter && ` (${filteredPosts?.length} matches)`}
          </p>
        </div>

        {/* useMediaQuery + useOnClickOutside */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">
            useMediaQuery + useOnClickOutside
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            Device: {isMobile ? 'Mobile' : 'Desktop'}
          </p>
          <div className="relative" ref={dropdownRef}>
            <Button onClick={() => setDropdownOpen(!dropdownOpen)}>
              Dropdown Menu {dropdownOpen ? '▲' : '▼'}
            </Button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 z-10 mt-1 rounded border bg-white p-2 shadow-lg">
                <p className="text-sm">Click outside to close!</p>
                <p className="text-xs text-gray-500">
                  Optimized for {isMobile ? 'mobile' : 'desktop'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts list with layout preference */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          Posts ({filteredPosts?.length || 0}/{posts?.length || 0})
        </h2>
        <ul
          className={
            userPrefs.layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'space-y-2'
          }
        >
          {filteredPosts?.map(post => (
            <li
              className={
                userPrefs.layout === 'grid'
                  ? 'flex items-center'
                  : 'border-b pb-2'
              }
              key={post.id}
            >
              <LinkButton
                params={{ id: post.id.toString() }}
                to="/react-query/$id"
              >
                {userPrefs.layout === 'grid'
                  ? post.title.substring(0, 20) + '...'
                  : post.title}
              </LinkButton>
            </li>
          ))}
        </ul>
        {debouncedFilter && filteredPosts?.length === 0 && (
          <p className="mt-2 text-gray-500">
            No posts found matching "{debouncedFilter}"
          </p>
        )}
      </section>
    </div>
  );
};

export const Route = createFileRoute('/kitchen-sink/')({
  component: KitchenSinkPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getPostsQuery()),
});
