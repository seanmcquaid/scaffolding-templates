import { Button, Text, View } from '@acme/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();

  const handleGetStarted = () => {
    // Handle get started action
    // TODO: Implement navigation
  };

  const handleLearnMore = () => {
    // Handle learn more action
    // TODO: Implement navigation
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View padding="large" style={styles.header}>
        <Text variant="h1" style={styles.title}>
          {t('HomeScreen.title')}
        </Text>
        <Text variant="h3" color="secondary" style={styles.subtitle}>
          {t('HomeScreen.subtitle')}
        </Text>
      </View>

      <View padding="large" style={styles.description}>
        <Text variant="body" style={styles.descriptionText}>
          {t('HomeScreen.description')}
        </Text>
      </View>

      <View padding="large" style={styles.actions}>
        <Button
          title={t('HomeScreen.getStarted')}
          onPress={handleGetStarted}
          style={styles.primaryButton}
        />
        <Button
          title={t('HomeScreen.learnMore')}
          variant="outline"
          onPress={handleLearnMore}
          style={styles.secondaryButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
  },
  description: {
    alignItems: 'center',
    marginBottom: 48,
  },
  descriptionText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  actions: {
    alignItems: 'stretch',
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {},
});
