import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function Modal() {
  const { t } = useAppTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('Modal.title')}</ThemedText>
      <ThemedText>{t('Modal.description')}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
