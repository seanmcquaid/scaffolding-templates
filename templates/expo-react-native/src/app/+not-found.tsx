import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function NotFoundScreen() {
  const { t } = useAppTranslation();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('NotFound.title')}</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t('NotFound.goHome')}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});