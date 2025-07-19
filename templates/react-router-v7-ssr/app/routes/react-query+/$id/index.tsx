import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { Route } from './+types';
import PageWrapper from '@/components/app/PageWrapper';
import { getPostQuery } from '@/services/queries/posts';

const ReactQueryPostPage = ({ params }: Route.ComponentProps) => {
  const { data, isLoading, isError } = useQuery(getPostQuery(params.id));
  const navigate = useNavigate();

  return (
    <PageWrapper isError={isError} isLoading={isLoading}>
      <button onClick={() => navigate(-1)}>BACK</button>
      <h1 data-testid="postHeader">{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export default ReactQueryPostPage;
