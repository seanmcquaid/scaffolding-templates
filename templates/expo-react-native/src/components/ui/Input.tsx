import type { ReactNode } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
}

export const Input = ({
  label,
  errorMessage,
  style,
  ...props
}: InputProps) => {
  const backgroundColor = useThemeColor(
    { light: '#FFFFFF', dark: '#1C1C1E' },
    'background',
  );
  const borderColor = useThemeColor(
    { light: '#C6C6C8', dark: '#38383A' },
    'border',
  );
  const textColor = useThemeColor(
    { light: '#000000', dark: '#FFFFFF' },
    'text',
  );
  const placeholderColor = useThemeColor(
    { light: '#8E8E93', dark: '#8E8E93' },
    'text',
  );

  return (
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor,
            borderColor: errorMessage ? '#FF3B30' : borderColor,
            color: textColor,
          },
          style,
        ]}
        placeholderTextColor={placeholderColor}
        {...props}
      />
      {errorMessage && (
        <ThemedText style={styles.error}>{errorMessage}</ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  error: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
