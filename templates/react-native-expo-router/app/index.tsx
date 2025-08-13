import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useAppTranslation from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui';
import { COLORS } from '@/constants';

export default function HomeScreen() {
  const { t } = useAppTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>{t('HomePage.title')}</Text>
        <Text style={styles.subtitle}>{t('HomePage.subtitle')}</Text>

        <View style={styles.buttonContainer}>
          <Link href="/about" asChild>
            <Button
              title={t('HomePage.navigateToAbout')}
              variant="primary"
              testID="navigate-to-about"
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: COLORS.GRAY[800],
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.GRAY[600],
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
