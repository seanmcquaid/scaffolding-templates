import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import useUserPreferences from '@/hooks/useUserPreferences';

describe('useUserPreferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Returns default preferences on initial render', () => {
    const { result } = renderHook(() => useUserPreferences());
    expect(result.current.preferences).toEqual({
      theme: 'system',
      language: 'en',
      notifications: true,
      autoSave: true,
    });
  });

  it('Starts with isEditMode as false', () => {
    const { result } = renderHook(() => useUserPreferences());
    expect(result.current.isEditMode).toBe(false);
  });

  it('toggleEditMode toggles isEditMode', () => {
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

  it('toggleNotifications toggles the notifications preference', () => {
    const { result } = renderHook(() => useUserPreferences());
    act(() => {
      result.current.toggleNotifications();
    });
    expect(result.current.preferences.notifications).toBe(false);
    act(() => {
      result.current.toggleNotifications();
    });
    expect(result.current.preferences.notifications).toBe(true);
  });

  it('toggleAutoSave toggles the autoSave preference', () => {
    const { result } = renderHook(() => useUserPreferences());
    act(() => {
      result.current.toggleAutoSave();
    });
    expect(result.current.preferences.autoSave).toBe(false);
    act(() => {
      result.current.toggleAutoSave();
    });
    expect(result.current.preferences.autoSave).toBe(true);
  });

  it('resetToDefaults resets preferences to default values', () => {
    const { result } = renderHook(() => useUserPreferences());
    act(() => {
      result.current.updateTheme('dark');
      result.current.updateLanguage('fr');
    });
    expect(result.current.preferences.theme).toBe('dark');
    act(() => {
      result.current.resetToDefaults();
    });
    expect(result.current.preferences).toEqual({
      theme: 'system',
      language: 'en',
      notifications: true,
      autoSave: true,
    });
  });
});
