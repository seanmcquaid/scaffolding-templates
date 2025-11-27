import type { ReactNode } from 'react';
import { Link, type Href } from 'expo-router';
import type { TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface LinkButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  href: Href;
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
}

export const LinkButton = ({ href, children, variant = 'default', ...props }: LinkButtonProps) => {
  const backgroundColor = useThemeColor(
    variant === 'default'
      ? { light: '#007AFF', dark: '#0A84FF' }
      : variant === 'outline'
        ? { light: '#FFFFFF', dark: '#1C1C1E' }
        : { light: '#E5E5EA', dark: '#3A3A3C' },
    'background'
  );

  const textColor = useThemeColor(
    variant === 'default'
      ? { light: '#FFFFFF', dark: '#FFFFFF' }
      : variant === 'outline'
        ? { light: '#007AFF', dark: '#0A84FF' }
        : { light: '#000000', dark: '#FFFFFF' },
    'text'
  );

  const borderColor = useThemeColor(
    variant === 'outline'
      ? { light: '#C6C6C8', dark: '#38383A' }
      : { light: 'transparent', dark: 'transparent' },
    'border'
  );

  return (
    <Link
      href={href}
      style={[
        styles.linkButton,
        {
          backgroundColor,
          borderColor,
          borderWidth: variant === 'outline' ? 1 : 0,
        },
      ]}
      {...props}
    >
      <ThemedText style={[styles.linkButtonText, { color: textColor }]}>{children}</ThemedText>
    </Link>
  );
};

const styles = StyleSheet.create({
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  linkButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
