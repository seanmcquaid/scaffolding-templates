import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';
import postsService from '@/services/postsService';
import { getPostsQuery, postsQueryKeys } from '@/services/queries/posts';

export default function ReactQueryScreen() {
  const { t } = useAppTranslation();
  const { data, isLoading, isError } = useQuery(getPostsQuery());
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: deletePostLoading } = useMutation({
    mutationFn: async (id: string) => postsService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.posts,
      });
    },
  });

  if (isLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText>{t('Common.error')}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('ReactQueryPage.title')}</ThemedText>
        </ThemedView>

        <View style={styles.postsContainer}>
          {data?.slice(0, 10).map(post => (
            <View key={post.id} style={styles.postItem}>
              <ThemedText style={styles.postTitle}>
                {post.title.substring(0, 30)}...
              </ThemedText>
              <View style={styles.buttonContainer}>
                <Button
                  variant="destructive"
                  disabled={deletePostLoading}
                  onPress={() => deletePost(post.id.toString())}
                  style={styles.button}
                >
                  {t('ReactQueryPage.delete')}
                </Button>
                <LinkButton
                  href={`/react-query/${post.id}` as any}
                  variant="default"
                >
                  {t('ReactQueryPage.view')}
                </LinkButton>
              </View>
            </View>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingVertical: 24,
  },
  postsContainer: {
    gap: 16,
  },
  postItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
