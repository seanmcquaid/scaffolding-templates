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
import useAppTranslation from '@/hooks/useAppTranslation';
import { getPostsQuery } from '@/services/queries/posts';

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
  const { t } = useAppTranslation();
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
      <h1 className="text-2xl font-bold">{t('KitchenSinkPage.title')}</h1>

      {/* Original form */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          {t('KitchenSinkPage.reactHookFormZodTanstack')}
        </h2>
        <form onSubmit={handleOnSubmit}>
          <Input
            className="m-4"
            errorMessage={errors?.name?.message}
            label={t('KitchenSinkPage.name')}
            {...register('name')}
          />
          <Button type="submit">{t('KitchenSinkPage.submit')}</Button>
        </form>
      </section>

      {/* usehooks-ts examples */}
      <section className="rounded border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          {t('KitchenSinkPage.usehookstsExamples')}
        </h2>

        {/* useLocalStorage + useToggle */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">
            {t('KitchenSinkPage.useLocalStorageToggle')}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            {t('KitchenSinkPage.layout')}: {userPrefs.layout} |{' '}
            {t('KitchenSinkPage.darkMode')}:{' '}
            {userPrefs.darkMode
              ? t('KitchenSinkPage.on')
              : t('KitchenSinkPage.off')}
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
              {t('KitchenSinkPage.switchTo')}{' '}
              {userPrefs.layout === 'grid'
                ? t('KitchenSinkPage.listView')
                : t('KitchenSinkPage.gridView')}{' '}
              {t('KitchenSinkPage.view')}
            </Button>
            <Button onClick={toggleFilters}>
              {showFilters
                ? t('KitchenSinkPage.hide')
                : t('KitchenSinkPage.show')}{' '}
              {t('KitchenSinkPage.filters')}
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
                {t('KitchenSinkPage.enableDarkMode')}
              </label>
            </div>
          )}
        </div>

        {/* useCounter */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">
            {t('KitchenSinkPage.useCounter')}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            {t('KitchenSinkPage.count')}: {count}
          </p>
          <div className="space-x-2">
            <Button onClick={increment}>+</Button>
            <Button onClick={decrement}>-</Button>
            <Button onClick={reset}>{t('KitchenSinkPage.reset')}</Button>
          </div>
        </div>

        {/* useDebounceValue */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">
            {t('KitchenSinkPage.useDebounceValue')}
          </h3>
          <Input
            label={t('KitchenSinkPage.filterPosts')}
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            placeholder={t('KitchenSinkPage.typeToFilter')}
            className="mb-2"
          />
          <p className="text-sm text-gray-600">
            {t('KitchenSinkPage.debouncedFilter')}:{' '}
            {debouncedFilter ? `"${debouncedFilter}"` : '""'}
            {debouncedFilter &&
              ` (${filteredPosts?.length} ${t('KitchenSinkPage.matches')})`}
          </p>
        </div>

        {/* useMediaQuery + useOnClickOutside */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">
            {t('KitchenSinkPage.useMediaQueryOnClickOutside')}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            {t('KitchenSinkPage.device')}:{' '}
            {isMobile
              ? t('KitchenSinkPage.mobile')
              : t('KitchenSinkPage.desktop')}
          </p>
          <div className="relative" ref={dropdownRef}>
            <Button onClick={() => setDropdownOpen(!dropdownOpen)}>
              {t('KitchenSinkPage.dropdownMenu')} {dropdownOpen ? '▲' : '▼'}
            </Button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 z-10 mt-1 rounded border bg-white p-2 shadow-lg">
                <p className="text-sm">
                  {t('KitchenSinkPage.clickOutsideToClose')}
                </p>
                <p className="text-xs text-gray-500">
                  {t('KitchenSinkPage.optimizedFor')}{' '}
                  {isMobile
                    ? t('KitchenSinkPage.mobile').toLowerCase()
                    : t('KitchenSinkPage.desktop').toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts list with layout preference */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          {t('KitchenSinkPage.posts')} ({filteredPosts?.length || 0}/
          {posts?.length || 0})
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
            {t('KitchenSinkPage.noPostsFound')} "{debouncedFilter}"
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
