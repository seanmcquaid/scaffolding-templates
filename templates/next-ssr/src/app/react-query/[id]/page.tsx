'use client';
import { useParams, useRouter } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import PageWrapper from '@/components/app/PageWrapper';
import { getPostQueryOptions } from '@/services/queries/posts';

const ReactQueryPostPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading, isError } = useSuspenseQuery(
    getPostQueryOptions(id),
  );
  const router = useRouter();

  return (
    <PageWrapper isLoading={isLoading} isError={isError}>
      <button onClick={() => router.back()}>BACK</button>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export default ReactQueryPostPage;
