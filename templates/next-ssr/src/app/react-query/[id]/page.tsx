'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import PageWrapper from '@/components/app/PageWrapper';
import { getPostQuery } from '@/services/queries/posts';

const ReactQueryPostPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading, isError } = useSuspenseQuery(getPostQuery(id));
  const router = useRouter();

  return (
    <PageWrapper isError={isError} isLoading={isLoading}>
      <button onClick={() => router.back()}>BACK</button>
      <h1 data-testid="postHeader">{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export default ReactQueryPostPage;
