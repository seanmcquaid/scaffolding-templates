import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useToast } from '@/hooks/useToast';
import { getPostsQuery, useDeletePostMutation } from '@/services/queries/posts';

export const ReactQueryPage = () => {
  const { t } = useAppTranslation();
  const { data, isLoading, isError } = useSuspenseQuery(getPostsQuery());
  const { toast } = useToast();
  const { mutate: deletePost, isPending: deletePostLoading } =
    useDeletePostMutation();

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
              onClick={() =>
                deletePost(post.id.toString(), {
                  onSuccess: () => toast({ title: 'I got deleted' }),
                })
              }
            >
              {t('ReactQueryPage.delete')}
            </Button>
            <LinkButton
              className="ml-4"
              params={{
                id: post.id.toString(),
              }}
              to="/react-query/$id"
            >
              {t('ReactQueryPage.view')}
            </LinkButton>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
};

export const Route = createLazyFileRoute('/react-query/')({
  component: ReactQueryPage,
});
