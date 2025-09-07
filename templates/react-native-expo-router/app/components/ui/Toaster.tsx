import React from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from './Toast';
import { useToast } from '@/hooks/useToast';

const Toaster = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
});

export default Toaster;
