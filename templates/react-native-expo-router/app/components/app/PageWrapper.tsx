import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';
import PageError from './PageError';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PageWrapperProps extends PropsWithChildren {
  isLoading?: boolean;
  isError?: boolean;
  errorText?: string;
  errorTitleText?: string;
}

const PageWrapper = ({
  children,
  isLoading,
  isError,
  errorText,
  errorTitleText,
}: PageWrapperProps) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
      </View>
    );
  }

  if (isError) {
    return <PageError errorText={errorText} titleText={errorTitleText} />;
  }

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageWrapper;
