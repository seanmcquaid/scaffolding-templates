import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import useAppTranslation from '@/hooks/useAppTranslation';
import postsService from '@/services/postsService';
import { getPostsQuery, postsQueryKeys } from '@/services/queries/posts';

export default function ReactQueryScreen() {
  const { t } = useAppTranslation();
  const { data: posts, isLoading, isError } = useQuery(getPostsQuery());
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: deletePostLoading } = useMutation({
    mutationFn: async (id: string) => postsService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.posts,
      });
      Alert.alert(t('Common.success'), t('ReactQueryPage.postDeleted'));
    },
    onError: () => {
      Alert.alert(t('Common.error'), t('ReactQueryPage.deleteError'));
    },
  });

  const handleDeletePost = (id: number) => {
    Alert.alert(t('ReactQueryPage.confirmDelete'), t('ReactQueryPage.confirmDeleteMessage'), [
      {
        text: t('Common.cancel'),
        style: 'cancel',
      },
      {
        text: t('ReactQueryPage.delete'),
        style: 'destructive',
        onPress: () => deletePost(id.toString()),
      },
    ]);
  };

  return (
    <PageWrapper isLoading={isLoading} isError={isError}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('ReactQueryPage.title')}</Text>

        <Text style={styles.description}>{t('ReactQueryPage.description')}</Text>

        <View style={styles.postsContainer}>
          {posts?.slice(0, 20).map(post => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Text style={styles.postId}>#{post.id}</Text>
                <Text style={styles.postUserId}>
                  {t('ReactQueryPage.userId')}: {post.userId}
                </Text>
              </View>

              <Text style={styles.postTitle} numberOfLines={2}>
                {post.title}
              </Text>

              <Text style={styles.postBody} numberOfLines={3}>
                {post.body}
              </Text>

              <View style={styles.postActions}>
                <Button
                  title={t('ReactQueryPage.view')}
                  variant="outline"
                  size="small"
                  style={styles.actionButton}
                  onPress={() => {
                    Alert.alert(post.title, post.body, [{ text: t('Common.ok') }]);
                  }}
                />
                <Button
                  title={t('ReactQueryPage.delete')}
                  variant="destructive"
                  size="small"
                  style={styles.actionButton}
                  disabled={deletePostLoading}
                  onPress={() => handleDeletePost(post.id)}
                />
              </View>
            </View>
          ))}
        </View>

        {posts && posts.length > 20 && (
          <Text style={styles.moreText}>
            {t('ReactQueryPage.showingFirst20')} {posts.length} {t('ReactQueryPage.posts')}
          </Text>
        )}
      </ScrollView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  postsContainer: {
    gap: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  postUserId: {
    fontSize: 12,
    color: '#6B7280',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 22,
  },
  postBody: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  moreText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    fontStyle: 'italic',
  },
});
