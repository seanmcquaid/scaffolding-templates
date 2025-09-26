import type { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useAppTranslation from '@/hooks/useAppTranslation';

interface PageWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorText?: string;
  errorTitleText?: string;
}

export const PageWrapper = ({
  children,
  isLoading,
  isError,
  errorText,
  errorTitleText,
}: PageWrapperProps) => {
  const { t } = useAppTranslation();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <LoadingSpinner />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>{errorTitleText || t('Common.errorOccurred')}</Text>
        <Text style={styles.errorText}>{errorText || t('Common.tryAgain')}</Text>
      </View>
    );
  }

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default PageWrapper;
