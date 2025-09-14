import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { ComponentProps } from 'react';
import { PlatformPressable } from '@react-navigation/elements';

export function HapticTab(props: ComponentProps<typeof PlatformPressable>) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tab.
          impactAsync(ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
