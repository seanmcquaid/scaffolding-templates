import { useCallback } from 'react';
import { useLocalStorage, useToggle } from 'usehooks-ts';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
  autoSave: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  language: 'en',
  notifications: true,
  autoSave: true,
};

/**
 * Custom hook that demonstrates usehooks-ts patterns for managing user preferences
 * Uses useLocalStorage for persistence and provides typed setters
 */
const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'user-preferences',
    DEFAULT_PREFERENCES,
  );

  const [isEditMode, toggleEditMode] = useToggle(false);

  const updateTheme = useCallback(
    (theme: UserPreferences['theme']) => {
      setPreferences(prev => ({ ...prev, theme }));
    },
    [setPreferences],
  );

  const updateLanguage = useCallback(
    (language: UserPreferences['language']) => {
      setPreferences(prev => ({ ...prev, language }));
    },
    [setPreferences],
  );

  const toggleNotifications = useCallback(() => {
    setPreferences(prev => ({ ...prev, notifications: !prev.notifications }));
  }, [setPreferences]);

  const toggleAutoSave = useCallback(() => {
    setPreferences(prev => ({ ...prev, autoSave: !prev.autoSave }));
  }, [setPreferences]);

  const resetToDefaults = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
  }, [setPreferences]);

  return {
    preferences,
    isEditMode,
    toggleEditMode,
    updateTheme,
    updateLanguage,
    toggleNotifications,
    toggleAutoSave,
    resetToDefaults,
  };
};

export default useUserPreferences;
