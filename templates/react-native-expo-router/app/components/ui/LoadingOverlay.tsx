import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => (
  <Modal
    visible={isLoading}
    transparent
    animationType="fade"
    testID="loadingOverlay"
  >
    <View style={styles.overlay}>
      <LoadingSpinner />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;
