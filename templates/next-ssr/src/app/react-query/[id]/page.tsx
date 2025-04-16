'use client';
import PageWrapper from '@/components/app/PageWrapper';
import { getPostQueryOptions } from '@/services/queries/posts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

const ReactQueryPostPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading, isError } = useSuspenseQuery(
    getPostQueryOptions(id),
  );
  const router = useRouter();

  return (
    <PageWrapper isError={isError} isLoading={isLoading}>
      <button onClick={() => router.back()}>BACK</button>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export default ReactQueryPostPage;
