'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useLocalStorage,
  useToggle,
  useCounter,
  useWindowSize,
  useCopyToClipboard,
} from 'usehooks-ts';
import type { z } from 'zod';
import { submitName } from './actions';
import formDataSchema from './formDataSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useAppTranslation from '@/hooks/useAppTranslation';

const KitchenSinkForm = () => {
  const { t } = useAppTranslation();
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formDataSchema),
  });
  const [formState, formAction] = useActionState(submitName, undefined);

  // usehooks-ts examples
  const [settings, setSettings] = useLocalStorage('app-settings', {
    notifications: true,
    theme: 'system',
  });

  const [showDetails, toggleDetails] = useToggle(false);
  const { count, increment, decrement, reset } = useCounter(0);
  const { width, height } = useWindowSize();
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const handleCopyWindowSize = () => {
    copyToClipboard(`${t('KitchenSinkPage.windowSize')}: ${width}x${height}`);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">{t('KitchenSinkPage.title')}</h1>

      {/* Original form */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          {t('KitchenSinkPage.reactHookFormZodServerActions')}
        </h2>
        <form action={formAction}>
          <Input
            className="m-4"
            errorMessage={errors?.name?.message || formState?.name}
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
            {t('KitchenSinkPage.theme')}: {settings.theme} |{' '}
            {t('KitchenSinkPage.notifications')}:{' '}
            {settings.notifications
              ? t('KitchenSinkPage.on')
              : t('KitchenSinkPage.off')}
          </p>
          <div className="mb-2 space-x-2">
            <Button
              onClick={() =>
                setSettings(prev => ({
                  ...prev,
                  theme: prev.theme === 'light' ? 'dark' : 'light',
                }))
              }
            >
              {t('KitchenSinkPage.toggleTheme')}
            </Button>
            <Button onClick={toggleDetails}>
              {showDetails
                ? t('KitchenSinkPage.hide')
                : t('KitchenSinkPage.show')}{' '}
              {t('KitchenSinkPage.details')}
            </Button>
          </div>
          {showDetails && (
            <div className="rounded bg-gray-50 p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      notifications: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                {t('KitchenSinkPage.enableNotifications')}
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

        {/* useWindowSize + useCopyToClipboard */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">
            {t('KitchenSinkPage.useWindowSizeCopyToClipboard')}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            {t('KitchenSinkPage.windowSize')}: {width || 0}
            {t('KitchenSinkPage.x')}
            {height || 0}
            {t('KitchenSinkPage.px')}
          </p>
          <Button onClick={handleCopyWindowSize}>
            {t('KitchenSinkPage.copyWindowSize')}
          </Button>
          {copiedText && (
            <p className="mt-2 text-sm text-green-600">
              {t('KitchenSinkPage.checkmark')} {t('KitchenSinkPage.copied')}:{' '}
              {copiedText}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default KitchenSinkForm;
