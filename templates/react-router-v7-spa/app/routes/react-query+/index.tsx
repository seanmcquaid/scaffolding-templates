import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useToast } from '@/hooks/useToast';
import { getDeletePostMutationOptions, getPostsQuery } from '@/services/queries/posts';

const ReactQueryPage = () => {
  const { t } = useAppTranslation();
  const { data, isLoading, isError } = useQuery(getPostsQuery());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deletePost, isPending: deletePostLoading } = useMutation({
    ...getDeletePostMutationOptions(queryClient),
    onSuccess: () => {
      toast({ title: 'I got deleted' });
    },
  });

  return (
    <PageWrapper isError={isError} isLoading={isLoading}>
      <h1>{t('ReactQueryPage.title')}</h1>
      <ul className="grid grid-cols-2">
        {data?.map(post => (
          <li className="mt-4 flex items-center" key={post.id}>
            {post.title.substring(0, 5)}
            <Button
              className="ml-4"
              disabled={deletePostLoading}
              onClick={() => deletePost(post.id.toString())}
            >
              {t('ReactQueryPage.delete')}
            </Button>
            <LinkButton
              className="ml-4"
              to={href('/react-query/:id', {
                id: post.id.toString(),
              })}
            >
              {t('ReactQueryPage.view')}
            </LinkButton>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
};

export default ReactQueryPage;
