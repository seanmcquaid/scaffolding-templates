import PageWrapper from '@/components/app/PageWrapper';
import { getPostQueryOptions } from '@/services/queries/posts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

export const ReactQueryPostPage = () => {
  const { id } = Route.useParams();
  const { data, isLoading, isError } = useSuspenseQuery(
    getPostQueryOptions(id),
  );

  return (
    <PageWrapper isError={isError} isLoading={isLoading}>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export const Route = createLazyFileRoute('/react-query/$id/')({
  component: ReactQueryPostPage,
});
