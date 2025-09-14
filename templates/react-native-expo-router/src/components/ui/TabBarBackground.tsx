import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

import { useColorScheme } from '@/src/hooks/useColorScheme';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and creates a semi-transparent background.
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}
