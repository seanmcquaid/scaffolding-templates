import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToggle } from 'usehooks-ts';

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

const STORAGE_KEY = 'user-preferences';

/**
 * Custom hook that demonstrates React Native patterns for managing user preferences
 * Uses AsyncStorage for persistence and provides typed setters
 */
const useUserPreferences = () => {
  const [preferences, setPreferencesState] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditMode, toggleEditMode] = useToggle(false);

  // Load preferences from AsyncStorage on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as UserPreferences;
          setPreferencesState({ ...DEFAULT_PREFERENCES, ...parsed });
        }
      } catch (error) {
        console.error('Failed to load user preferences:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences to AsyncStorage whenever they change
  const setPreferences = useCallback(
    async (newPreferences: UserPreferences) => {
      try {
        setPreferencesState(newPreferences);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      } catch (error) {
        console.error('Failed to save user preferences:', error);
      }
    },
    []
  );

  const updateTheme = useCallback(
    async (theme: UserPreferences['theme']) => {
      const updated = { ...preferences, theme };
      await setPreferences(updated);
    },
    [preferences, setPreferences]
  );

  const updateLanguage = useCallback(
    async (language: UserPreferences['language']) => {
      const updated = { ...preferences, language };
      await setPreferences(updated);
    },
    [preferences, setPreferences]
  );

  const toggleNotifications = useCallback(async () => {
    const updated = {
      ...preferences,
      notifications: !preferences.notifications,
    };
    await setPreferences(updated);
  }, [preferences, setPreferences]);

  const toggleAutoSave = useCallback(async () => {
    const updated = { ...preferences, autoSave: !preferences.autoSave };
    await setPreferences(updated);
  }, [preferences, setPreferences]);

  const resetToDefaults = useCallback(async () => {
    await setPreferences(DEFAULT_PREFERENCES);
  }, [setPreferences]);

  return {
    preferences,
    isLoaded,
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
