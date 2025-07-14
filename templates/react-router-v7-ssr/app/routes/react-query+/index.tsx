import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useToast } from '@/hooks/useToast';
import postsService from '@/services/postsService';
import { getPostsQueryOptions, postsQueryKeys } from '@/services/queries/posts';

const ReactQueryPage = () => {
  const { t } = useAppTranslation();
  const { data, isLoading, isError } = useQuery(getPostsQueryOptions());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deletePost, isPending: deletePostLoading } = useMutation({
    mutationFn: async (id: string) => postsService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.posts,
      });
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
              to={`${t('Routes.reactQuery')}/${post.id}`}
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
