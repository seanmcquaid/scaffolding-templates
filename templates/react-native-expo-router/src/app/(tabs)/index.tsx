import { HelloWave } from '@/src/components/HelloWave';
import { ParallaxScrollView } from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useAppTranslation } from '@/src/hooks/useAppTranslation';

export default function HomeScreen() {
  const { t } = useAppTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ThemedView className="flex-row items-center gap-2 px-8 py-8">
          <ThemedText type="title">{t('home.welcome')}</ThemedText>
          <HelloWave />
        </ThemedView>
      }>
      <ThemedView className="gap-2 mb-2">
        <ThemedText type="subtitle">{t('home.step1.title')}</ThemedText>
        <ThemedText>{t('home.step1.description')}</ThemedText>
      </ThemedView>
      <ThemedView className="gap-2 mb-2">
        <ThemedText type="subtitle">{t('home.step2.title')}</ThemedText>
        <ThemedText>{t('home.step2.description')}</ThemedText>
      </ThemedView>
      <ThemedView className="gap-2 mb-2">
        <ThemedText type="subtitle">{t('home.step3.title')}</ThemedText>
        <ThemedText>{t('home.step3.description')}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
