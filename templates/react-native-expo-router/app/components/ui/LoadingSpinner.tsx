import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { cn } from '@/utils/styles';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  testID?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#007AFF',
  testID = 'activityIndicator',
  className,
}) => {
  return (
    <View
      className={cn('flex-1 justify-center items-center', className)}
      testID={testID}
    >
      <ActivityIndicator size={size} color={color} testID="activityIndicator" />
    </View>
  );
};
