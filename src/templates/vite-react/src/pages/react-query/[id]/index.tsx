import PageWrapper from '@/components/app/PageWrapper';
import { useParams } from '@/router';
import useGetPostQuery from '@/services/queries/useGetPostQuery';

const ReactQueryPostPage = () => {
  const { id } = useParams('/react-query/:id');
  const { data, isLoading, isError } = useGetPostQuery(id);

  return (
    <PageWrapper isLoading={isLoading} isError={isError}>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </PageWrapper>
  );
};

export default ReactQueryPostPage;
