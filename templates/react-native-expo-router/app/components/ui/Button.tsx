import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { cn } from '@/utils/styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  testID,
  className,
}) => {
  const baseClasses =
    'py-3 px-6 rounded-lg items-center justify-center min-h-[48px]';

  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    outline: 'bg-transparent border border-primary',
  };

  const disabledClasses = disabled || loading ? 'opacity-60' : '';

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    disabledClasses,
    className
  );

  const textClasses = cn(
    'text-base font-semibold',
    variant === 'outline' ? 'text-primary' : 'text-white'
  );

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#007AFF' : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text className={textClasses}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
