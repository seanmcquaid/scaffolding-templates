import { useState, useEffect } from 'react';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Custom hook for localStorage with JSON serialization
const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue] as const;
};

// Custom hook for sessionStorage with JSON serialization
const useSessionStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue] as const;
};

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'es' | 'fr';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  username: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  fontSize: 'medium',
  notifications: true,
  username: '',
};

interface SessionData {
  tabId: string;
  startTime: string;
  pageViews: number;
  lastAction: string;
}

const WebStorageExample = () => {
  // localStorage for persistent user preferences
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'userPreferences',
    defaultPreferences
  );

  // sessionStorage for session-specific data
  const [sessionData, setSessionData] = useSessionStorage<SessionData>(
    'sessionData',
    {
      tabId: Math.random().toString(36).substr(2, 9),
      startTime: new Date().toISOString(),
      pageViews: 1,
      lastAction: 'Page loaded',
    }
  );

  // Track page views in session storage
  useEffect(() => {
    setSessionData(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1,
      lastAction: 'Component mounted',
    }));
  }, [setSessionData]);

  const updatePreference = <K extends keyof UserPreferences,>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setSessionData(prev => ({
      ...prev,
      lastAction: `Updated ${key} to ${value}`,
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    setSessionData(prev => ({
      ...prev,
      lastAction: 'Reset preferences',
    }));
  };

  const clearSessionData = () => {
    setSessionData({
      tabId: Math.random().toString(36).substr(2, 9),
      startTime: new Date().toISOString(),
      pageViews: 1,
      lastAction: 'Session data cleared',
    });
  };

  // Apply theme class to demonstrate persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', preferences.theme);
    document.documentElement.setAttribute('data-font-size', preferences.fontSize);
  }, [preferences.theme, preferences.fontSize]);

  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Web Storage State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li><strong>localStorage:</strong> Persists data across browser sessions until manually cleared</li>
            <li><strong>sessionStorage:</strong> Persists data only for the current tab session</li>
            <li>Perfect for user preferences, settings, and temporary session data</li>
            <li>Try refreshing the page or opening in a new tab to see the differences</li>
          </ul>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Preferences (localStorage) */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">User Preferences (localStorage)</h2>
            <p className="mb-4 text-sm text-gray-600">
              These settings persist across browser sessions and tabs.
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Username:</label>
                <Input
                  value={preferences.username}
                  onChange={(e) => updatePreference('username', e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Theme:</label>
                <select
                  className="w-full rounded border p-2"
                  value={preferences.theme}
                  onChange={(e) => updatePreference('theme', e.target.value as UserPreferences['theme'])}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Language:</label>
                <select
                  className="w-full rounded border p-2"
                  value={preferences.language}
                  onChange={(e) => updatePreference('language', e.target.value as UserPreferences['language'])}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Font Size:</label>
                <select
                  className="w-full rounded border p-2"
                  value={preferences.fontSize}
                  onChange={(e) => updatePreference('fontSize', e.target.value as UserPreferences['fontSize'])}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={preferences.notifications}
                  onChange={(e) => updatePreference('notifications', e.target.checked)}
                />
                <label htmlFor="notifications" className="text-sm">
                  Enable notifications
                </label>
              </div>

              <Button onClick={resetPreferences} variant="outline" className="w-full">
                Reset to Defaults
              </Button>
            </div>

            <div className="mt-4 rounded bg-gray-50 p-3">
              <h4 className="mb-2 text-sm font-semibold">Current Preferences:</h4>
              <pre className="text-xs">
                {JSON.stringify(preferences, null, 2)}
              </pre>
            </div>
          </div>

          {/* Session Data (sessionStorage) */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Session Data (sessionStorage)</h2>
            <p className="mb-4 text-sm text-gray-600">
              This data is unique to this tab and will be lost when the tab is closed.
            </p>

            <div className="space-y-4">
              <div className="rounded bg-gray-50 p-3">
                <h4 className="mb-2 text-sm font-semibold">Session Info:</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Tab ID:</strong> {sessionData.tabId}</p>
                  <p><strong>Session Started:</strong> {new Date(sessionData.startTime).toLocaleString()}</p>
                  <p><strong>Page Views:</strong> {sessionData.pageViews}</p>
                  <p><strong>Last Action:</strong> {sessionData.lastAction}</p>
                </div>
              </div>

              <Button onClick={clearSessionData} variant="outline" className="w-full">
                Clear Session Data
              </Button>

              <div className="text-sm text-gray-600">
                <p className="mb-2"><strong>Try these experiments:</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Refresh the page - preferences persist, page views increment</li>
                  <li>Open this page in a new tab - new session ID, same preferences</li>
                  <li>Close and reopen the browser - preferences persist, new session</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded bg-gray-50 p-3">
              <h4 className="mb-2 text-sm font-semibold">Current Session Data:</h4>
              <pre className="text-xs">
                {JSON.stringify(sessionData, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Storage Information */}
        <div className="mt-6 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">Storage Comparison</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">localStorage</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Persists across browser sessions</li>
                <li>Shared across all tabs for same origin</li>
                <li>~5-10MB storage limit</li>
                <li>Perfect for user preferences, settings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700">sessionStorage</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Cleared when tab is closed</li>
                <li>Unique to each tab</li>
                <li>~5-10MB storage limit</li>
                <li>Perfect for temporary session data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default WebStorageExample;