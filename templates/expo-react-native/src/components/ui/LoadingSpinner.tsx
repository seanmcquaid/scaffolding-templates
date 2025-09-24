import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner = ({ size = 'large', color = '#3B82F6' }: LoadingSpinnerProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} testID="loadingSpinner" />
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

export default LoadingSpinner;
