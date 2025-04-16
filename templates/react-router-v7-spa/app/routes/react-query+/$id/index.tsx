import PageWrapper from '@/components/app/PageWrapper';
import { getPostQueryOptions } from '@/services/queries/posts';
import { useQuery } from '@tanstack/react-query';
import type { Route } from './+types';

const ReactQueryPostPage = ({ params }: Route.ComponentProps) => {
  const { data, isLoading, isError } = useQuery(getPostQueryOptions(params.id));

  return (
    <PageWrapper isError={isError} isLoading={isLoading}>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export default ReactQueryPostPage;
