import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { LinkButton } from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function HomeScreen() {
  const { t } = useAppTranslation();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('HomePage.title')}</ThemedText>
          <ThemedText>{t('HomePage.subtitle')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.linksContainer}>
          <LinkButton href="/react-query">
            {t('HomePage.reactQuery')}
          </LinkButton>
          <LinkButton href="/react-hook-form-zod">
            {t('HomePage.reactHookFormZod')}
          </LinkButton>
          <LinkButton href="/kitchen-sink">
            {t('HomePage.kitchenSink')}
          </LinkButton>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  titleContainer: {
    paddingVertical: 24,
    gap: 8,
  },
  linksContainer: {
    gap: 12,
    marginTop: 16,
  },
});
