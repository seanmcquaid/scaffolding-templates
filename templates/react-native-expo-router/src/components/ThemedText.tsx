import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { cn } from '@/src/utils/styles';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    lightColor || darkColor
      ? {
          ...(lightColor && { light: lightColor }),
          ...(darkColor && { dark: darkColor }),
        }
      : undefined,
    'text'
  );

  const getTypeClasses = () => {
    switch (type) {
      case 'title':
        return 'text-3xl font-bold leading-8';
      case 'subtitle':
        return 'text-xl font-bold';
      case 'defaultSemiBold':
        return 'text-base font-semibold leading-6';
      case 'link':
        return 'text-base leading-7 text-blue-600';
      default:
        return 'text-base leading-6';
    }
  };

  return <Text style={[{ color }, style]} className={cn(getTypeClasses(), className)} {...rest} />;
}
