import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { getPostQuery } from '@/services/queries/posts';

export const ReactQueryPostPage = () => {
  const { id } = Route.useParams();
  const { data, isLoading, isError } = useSuspenseQuery(getPostQuery(id));

  return (
    <PageWrapper isError={isError} isLoading={isLoading}>
      <h1 data-testid="postHeader">{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export const Route = createLazyFileRoute('/react-query/$id/')({
  component: ReactQueryPostPage,
});
