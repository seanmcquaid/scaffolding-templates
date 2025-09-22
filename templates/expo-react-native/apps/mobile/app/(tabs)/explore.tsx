import { StyleSheet, Text, View } from 'react-native';
import useAppTranslation from '../../src/hooks/useAppTranslation';

export default function ExploreScreen() {
  const { t } = useAppTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('ExploreScreen.title')}</Text>
      <Text style={styles.description}>{t('ExploreScreen.description')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
