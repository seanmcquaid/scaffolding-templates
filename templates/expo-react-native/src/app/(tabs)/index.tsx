import { StyleSheet, Platform, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function HomeScreen() {
  const { t } = useAppTranslation();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('HomePage.title')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{t('HomePage.stepOneTitle')}</ThemedText>
          <ThemedText>
            {t('HomePage.stepOneDescription', {
              file: 'app/(tabs)/index.tsx',
              shortcut: Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                default: 'F12',
              }),
            })}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{t('HomePage.stepTwoTitle')}</ThemedText>
          <ThemedText>{t('HomePage.stepTwoDescription')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{t('HomePage.stepThreeTitle')}</ThemedText>
          <ThemedText>{t('HomePage.stepThreeDescription')}</ThemedText>
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
});
