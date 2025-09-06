export const APP_CONSTANTS = {
  DEFAULT_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  STORAGE_KEYS: {
    LANGUAGE: 'language',
    USER_PREFERENCES: 'userPreferences',
  },
} as const;

export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  ERROR: '#FF3B30',
  GRAY: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;
