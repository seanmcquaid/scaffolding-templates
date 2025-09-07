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
    <View className={cn('w-full', className)}>
      {label && (
        <Text className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground mb-1.5">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          errorMessage &&
            'border-destructive focus:border-destructive focus:ring-destructive'
        )}
        testID="textInput"
        {...props}
      />
      {errorMessage && (
        <Text className="text-sm text-destructive mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;
