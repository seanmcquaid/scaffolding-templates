'use client';
import PageError from '@/components/app/PageError';

const ErrorBoundary = () => {
  return <PageError errorText="There was an app crash!" />;
};

export default ErrorBoundary;
