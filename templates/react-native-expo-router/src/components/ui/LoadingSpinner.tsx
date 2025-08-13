import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  testID?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = COLORS.PRIMARY,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
