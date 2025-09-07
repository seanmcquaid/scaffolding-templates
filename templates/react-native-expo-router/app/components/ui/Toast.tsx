import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  onDismiss?: () => void;
}

export type ToastActionElement = React.ReactElement;

const Toast = ({
  title,
  description,
  variant = 'default',
  onDismiss,
}: ToastProps) => {
  return (
    <View
      style={[
        styles.toast,
        variant === 'destructive' ? styles.destructive : styles.default,
      ]}
    >
      <View style={styles.content}>
        {title && (
          <Text
            style={[
              styles.title,
              variant === 'destructive'
                ? styles.destructiveText
                : styles.defaultText,
            ]}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            style={[
              styles.description,
              variant === 'destructive'
                ? styles.destructiveText
                : styles.defaultText,
            ]}
          >
            {description}
          </Text>
        )}
      </View>
      {onDismiss && (
        <Pressable onPress={onDismiss} style={styles.closeButton}>
          <Text
            style={[
              styles.closeText,
              variant === 'destructive'
                ? styles.destructiveText
                : styles.defaultText,
            ]}
          >
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  default: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
  },
  destructive: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  defaultText: {
    color: '#374151',
  },
  destructiveText: {
    color: '#dc2626',
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Toast;
