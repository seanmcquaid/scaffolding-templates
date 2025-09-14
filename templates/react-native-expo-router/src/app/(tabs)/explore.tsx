/* eslint-disable react-native/no-raw-text, i18next/no-literal-string */
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/src/components/Collapsible';
import { ExternalLink } from '@/src/components/ExternalLink';
import { ParallaxScrollView } from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { IconSymbol } from '@/src/components/ui/IconSymbol';
import { useAppTranslation } from '@/src/hooks/useAppTranslation';

export default function ExploreScreen() {
  const { t } = useAppTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color={headerImageColor}
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('explore.title')}</ThemedText>
      </ThemedView>
      <ThemedText>{t('explore.description')}</ThemedText>
      <Collapsible title={t('explore.fileStructure.title')}>
        <ThemedText>{t('explore.fileStructure.description')} </ThemedText>
        <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>
        <ThemedText> {t('explore.fileStructure.configuration')}</ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{t('explore.fileStructure.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.android.title')}>
        <ThemedText>{t('explore.android.description')} </ThemedText>
        <ThemedText type="defaultSemiBold">npx create-expo-app</ThemedText>
        <ThemedText>.</ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.ios.title')}>
        <ThemedText>{t('explore.ios.description')} </ThemedText>
        <ThemedText type="defaultSemiBold">npx create-expo-app</ThemedText>
        <ThemedText>.</ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.web.title')}>
        <ThemedText>{t('explore.web.description')} </ThemedText>
        <ThemedText type="defaultSemiBold">npx create-expo-app</ThemedText>
        <ThemedText>.</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const headerImageColor = '#808080';

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    color: headerImageColor,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
