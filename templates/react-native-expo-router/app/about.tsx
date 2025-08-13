import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useAppTranslation from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui';
import { COLORS } from '@/constants';

export default function AboutScreen() {
  const { t } = useAppTranslation();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const features = [
    t('AboutPage.features.expo'),
    t('AboutPage.features.typescript'),
    t('AboutPage.features.testing'),
    t('AboutPage.features.linting'),
    t('AboutPage.features.i18n'),
    t('AboutPage.features.stateManagement'),
    t('AboutPage.features.forms'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('AboutPage.title')}</Text>
        <Text style={styles.description}>{t('AboutPage.description')}</Text>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>
            {t('AboutPage.features.title')}
          </Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={t('AboutPage.backToHome')}
            onPress={handleGoBack}
            variant="primary"
            testID="back-to-home"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: COLORS.GRAY[800],
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.GRAY[600],
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: COLORS.GRAY[800],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    marginRight: 8,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.GRAY[700],
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
