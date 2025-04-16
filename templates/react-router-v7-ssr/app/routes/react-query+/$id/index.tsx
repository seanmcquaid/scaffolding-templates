import PageWrapper from '@/components/app/PageWrapper';
import { getPostQueryOptions } from '@/services/queries/posts';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { Route } from './+types';

const ReactQueryPostPage = ({ params }: Route.ComponentProps) => {
  const { data, isLoading, isError } = useQuery(getPostQueryOptions(params.id));
  const navigate = useNavigate();

  return (
    <PageWrapper isLoading={isLoading} isError={isError}>
      <button onClick={() => navigate(-1)}>BACK</button>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export default ReactQueryPostPage;
