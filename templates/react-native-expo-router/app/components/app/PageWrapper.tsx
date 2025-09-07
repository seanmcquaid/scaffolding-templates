import React from 'react';
import { View } from 'react-native';
import type { PropsWithChildren } from 'react';
import PageError from './PageError';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

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
      <View className="flex-1 justify-center items-center">
        <LoadingSpinner />
      </View>
    );
  }

  if (isError) {
    return <PageError errorText={errorText} titleText={errorTitleText} />;
  }

  return <View className="flex-1 p-4">{children}</View>;
};

export default PageWrapper;
