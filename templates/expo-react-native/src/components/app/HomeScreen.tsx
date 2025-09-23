import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';

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
      <View style={styles.header}>
        <Text style={styles.title}>{t('HomeScreen.title')}</Text>
        <Text style={styles.subtitle}>{t('HomeScreen.subtitle')}</Text>
      </View>

      <View style={styles.description}>
        <Text style={styles.descriptionText}>{t('HomeScreen.description')}</Text>
      </View>

      <View style={styles.actions}>
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
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#666666',
  },
  description: {
    alignItems: 'center',
    marginBottom: 48,
  },
  descriptionText: {
    fontSize: 16,
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
