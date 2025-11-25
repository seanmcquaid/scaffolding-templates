import type { ReactNode } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export const Button = ({
  children,
  variant = 'default',
  style,
  disabled,
  ...props
}: ButtonProps) => {
  const backgroundColor = useThemeColor(
    variant === 'default'
      ? { light: '#007AFF', dark: '#0A84FF' }
      : variant === 'destructive'
        ? { light: '#FF3B30', dark: '#FF453A' }
        : variant === 'outline'
          ? { light: '#FFFFFF', dark: '#1C1C1E' }
          : { light: '#E5E5EA', dark: '#3A3A3C' },
    'background',
  );

  const textColor = useThemeColor(
    variant === 'default' || variant === 'destructive'
      ? { light: '#FFFFFF', dark: '#FFFFFF' }
      : variant === 'outline'
        ? { light: '#007AFF', dark: '#0A84FF' }
        : { light: '#000000', dark: '#FFFFFF' },
    'text',
  );

  const borderColor = useThemeColor(
    variant === 'outline'
      ? { light: '#C6C6C8', dark: '#38383A' }
      : { light: 'transparent', dark: 'transparent' },
    'border',
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#C6C6C8' : backgroundColor,
          borderColor,
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <ThemedText
        style={[
          styles.buttonText,
          {
            color: disabled ? '#8E8E93' : textColor,
          },
        ]}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
