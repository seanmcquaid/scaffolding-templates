import { act } from '@testing-library/react';
import useUserPreferences from '@/hooks/useUserPreferences';
import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';

describe('useUserPreferences', () => {
  it('returns default preferences on first render', () => {
    const { result } = renderHook(() => useUserPreferences());
    expect(result.current.preferences.theme).toBe('system');
    expect(result.current.preferences.language).toBe('en');
    expect(result.current.preferences.notifications).toBe(true);
    expect(result.current.preferences.autoSave).toBe(true);
  });

  it('isEditMode starts as false', () => {
    const { result } = renderHook(() => useUserPreferences());
    expect(result.current.isEditMode).toBe(false);
  });

  it('toggleEditMode switches isEditMode', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.toggleEditMode();
    });
    expect(result.current.isEditMode).toBe(true);

    act(() => {
      result.current.toggleEditMode();
    });
    expect(result.current.isEditMode).toBe(false);
  });

  it('updateTheme updates the theme preference', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateTheme('dark');
    });
    expect(result.current.preferences.theme).toBe('dark');
  });

  it('updateLanguage updates the language preference', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateLanguage('es');
    });
    expect(result.current.preferences.language).toBe('es');
  });

  it('toggleNotifications flips the notifications preference', () => {
    const { result } = renderHook(() => useUserPreferences());

    const initial = result.current.preferences.notifications;
    act(() => {
      result.current.toggleNotifications();
    });
    expect(result.current.preferences.notifications).toBe(!initial);
  });

  it('toggleAutoSave flips the autoSave preference', () => {
    const { result } = renderHook(() => useUserPreferences());

    const initial = result.current.preferences.autoSave;
    act(() => {
      result.current.toggleAutoSave();
    });
    expect(result.current.preferences.autoSave).toBe(!initial);
  });

  it('resetToDefaults restores default preferences', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateTheme('dark');
      result.current.updateLanguage('fr');
    });
    expect(result.current.preferences.theme).toBe('dark');

    act(() => {
      result.current.resetToDefaults();
    });
    expect(result.current.preferences.theme).toBe('system');
    expect(result.current.preferences.language).toBe('en');
  });
});
