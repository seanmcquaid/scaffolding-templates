import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useAppTranslation from '@/hooks/useAppTranslation';
import Button from '@/components/ui/Button';

interface PageErrorProps {
  errorText?: string;
  titleText?: string;
  onRetry?: () => void;
}

const PageError = ({ errorText, titleText, onRetry }: PageErrorProps) => {
  const { t } = useAppTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText || t('Common.error')}</Text>
      <Text style={styles.message}>
        {errorText || t('Common.somethingWentWrong')}
      </Text>
      {onRetry && (
        <Button
          title={t('Common.tryAgain')}
          onPress={onRetry}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  button: {
    minWidth: 120,
  },
});

export default PageError;
