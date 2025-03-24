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
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <PageError errorText={errorText} titleText={errorTitleText} />;
  }

  return <div className="flex h-full w-full flex-col p-8">{children}</div>;
};

export default PageWrapper;
