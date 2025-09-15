import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { Colors } from './Colors';

export const paperTheme = {
  light: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: Colors.light.tint,
      background: Colors.light.background,
      surface: Colors.light.background,
      onSurface: Colors.light.text,
    },
  },
  dark: {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: Colors.dark.tint,
      background: Colors.dark.background,
      surface: Colors.dark.background,
      onSurface: Colors.dark.text,
    },
  },
};
