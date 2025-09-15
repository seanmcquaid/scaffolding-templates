import { StyleSheet } from 'react-native';

import { HelloWave } from '@/src/components/HelloWave';
import { ParallaxScrollView } from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { useAppTranslation } from '@/src/hooks/useAppTranslation';

export default function HomeScreen() {
  const { t } = useAppTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('home.welcome')}</ThemedText>
          <HelloWave />
        </ThemedView>
      }>
      <Card style={styles.stepCard}>
        <Card.Content>
          <ThemedText type="subtitle">{t('home.step1.title')}</ThemedText>
          <ThemedText>{t('home.step1.description')}</ThemedText>
        </Card.Content>
      </Card>

      <Card style={styles.stepCard}>
        <Card.Content>
          <ThemedText type="subtitle">{t('home.step2.title')}</ThemedText>
          <ThemedText>{t('home.step2.description')}</ThemedText>
        </Card.Content>
      </Card>

      <Card style={styles.stepCard}>
        <Card.Content>
          <ThemedText type="subtitle">{t('home.step3.title')}</ThemedText>
          <ThemedText>{t('home.step3.description')}</ThemedText>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained-tonal" onPress={() => console.log('Getting started!')}>
            {t('home.step3.button')}
          </Button>
        </Card.Actions>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepCard: {
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
});
