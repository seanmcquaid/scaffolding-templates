import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/utils/styles';

export interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  className?: string;
}

const Input = ({ className, label, errorMessage, ...props }: InputProps) => {
  return (
    <View className={cn('my-2', className)}>
      {label && (
        <Text className="text-base font-semibold mb-2 text-gray-800">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          'border border-gray-300 rounded-lg px-3 py-2.5 text-base bg-white',
          errorMessage && 'border-error'
        )}
        testID="textInput"
        {...props}
      />
      {errorMessage && (
        <Text className="text-sm text-error mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;
