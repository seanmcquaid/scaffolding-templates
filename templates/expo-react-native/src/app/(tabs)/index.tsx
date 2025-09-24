import { Link } from 'expo-router';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function Home() {
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('HomePage.title')}</Text>
        <Text style={styles.subtitle}>{t('HomePage.subTitle')}</Text>

        <View style={styles.navigation}>
          <Link href="/react-query" asChild>
            <Button title={t('HomePage.reactQuery')} style={styles.navButton} />
          </Link>

          <Link href="/react-hook-form-zod" asChild>
            <Button
              title={t('HomePage.reactHookFormZod')}
              variant="secondary"
              style={styles.navButton}
            />
          </Link>

          <Link href="/kitchen-sink" asChild>
            <Button title={t('HomePage.kitchenSink')} variant="outline" style={styles.navButton} />
          </Link>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>{t('HomePage.featuresTitle')}</Text>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>{t('HomePage.expoRouterTitle')}</Text>
            <Text style={styles.featureDescription}>{t('HomePage.expoRouterDescription')}</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>{t('HomePage.reactQueryTitle')}</Text>
            <Text style={styles.featureDescription}>{t('HomePage.reactQueryDescription')}</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>{t('HomePage.formHandlingTitle')}</Text>
            <Text style={styles.featureDescription}>{t('HomePage.formHandlingDescription')}</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>{t('HomePage.i18nTitle')}</Text>
            <Text style={styles.featureDescription}>{t('HomePage.i18nDescription')}</Text>
          </View>
        </View>
      </ScrollView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  navigation: {
    gap: 16,
    marginBottom: 32,
  },
  navButton: {
    marginVertical: 4,
  },
  featuresSection: {
    marginTop: 16,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151',
  },
  featureCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1F2937',
  },
  featureDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});
