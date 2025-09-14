import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useAppTranslation } from '@/src/hooks/useAppTranslation';

export default function NotFoundScreen() {
  const { t } = useAppTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('notFound.title') }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">{t('notFound.heading')}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">{t('notFound.homeLink')}</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});