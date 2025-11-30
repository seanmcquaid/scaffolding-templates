import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function ExploreScreen() {
  const { t } = useAppTranslation();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('ExplorePage.title')}</ThemedText>
          <ThemedText>{t('ExplorePage.subtitle')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{t('ExplorePage.featuresTitle')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureContainer}>
          <ThemedText type="defaultSemiBold">{t('ExplorePage.featureI18n')}</ThemedText>
          <ThemedText>{t('ExplorePage.featureI18nDescription')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureContainer}>
          <ThemedText type="defaultSemiBold">{t('ExplorePage.featureTypeScript')}</ThemedText>
          <ThemedText>{t('ExplorePage.featureTypeScriptDescription')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureContainer}>
          <ThemedText type="defaultSemiBold">{t('ExplorePage.featureTesting')}</ThemedText>
          <ThemedText>{t('ExplorePage.featureTestingDescription')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureContainer}>
          <ThemedText type="defaultSemiBold">{t('ExplorePage.featureQuery')}</ThemedText>
          <ThemedText>{t('ExplorePage.featureQueryDescription')}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureContainer}>
          <ThemedText type="defaultSemiBold">{t('ExplorePage.featureNavigation')}</ThemedText>
          <ThemedText>{t('ExplorePage.featureNavigationDescription')}</ThemedText>
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
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  featureContainer: {
    gap: 4,
    marginBottom: 16,
  },
});
