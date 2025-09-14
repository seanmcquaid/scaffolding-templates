import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { cn } from '@/src/utils/styles';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  className,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    lightColor || darkColor
      ? {
          ...(lightColor && { light: lightColor }),
          ...(darkColor && { dark: darkColor }),
        }
      : undefined,
    'background'
  );

  return <View style={[{ backgroundColor }, style]} className={cn(className)} {...otherProps} />;
}
