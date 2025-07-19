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

/* eslint-disable i18next/no-literal-string */

const KitchenSinkForm = () => {
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
    copyToClipboard(`Window size: ${width}x${height}`);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">
        Kitchen Sink - usehooks-ts Examples
      </h1>

      {/* Original form */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-lg font-semibold">
          React Hook Form + Zod + Server Actions
        </h2>
        <form action={formAction}>
          <Input
            className="m-4"
            errorMessage={errors?.name?.message || formState?.name}
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
            Theme: {settings.theme} | Notifications:{' '}
            {settings.notifications ? 'On' : 'Off'}
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
              Toggle Theme
            </Button>
            <Button onClick={toggleDetails}>
              {showDetails ? 'Hide' : 'Show'} Details
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
                Enable notifications
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

        {/* useWindowSize + useCopyToClipboard */}
        <div className="mb-4">
          <h3 className="mb-2 font-medium">
            useWindowSize + useCopyToClipboard
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            Window size: {width || 0}x{height || 0}px
          </p>
          <Button onClick={handleCopyWindowSize}>Copy Window Size</Button>
          {copiedText && (
            <p className="mt-2 text-sm text-green-600">
              ✓ Copied: {copiedText}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default KitchenSinkForm;
