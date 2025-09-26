import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useAppTranslation from '@/hooks/useAppTranslation';
import { getPostsQuery } from '@/services/queries/posts';

// Custom React Native hooks
function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) {
        try {
          setStoredValue(JSON.parse(value));
        } catch {
          setStoredValue(initialValue);
        }
      }
    });
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('Error saving to AsyncStorage:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle] as const;
}

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function KitchenSinkScreen() {
  const { t } = useAppTranslation();
  const { data: posts, isLoading, isError } = useQuery(getPostsQuery());

  // Custom React Native hooks
  const [preferences, setPreferences] = useAsyncStorage('user-preferences', {
    theme: 'light' as 'light' | 'dark',
    autoSave: true,
  });

  const [showAdvanced, toggleAdvanced] = useToggle(false);
  const { count, increment, decrement, reset } = useCounter(0);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [copiedText, setCopiedText] = useState<string>('');

  const handleCopyPostsCount = async () => {
    const text = `${t('KitchenSinkPage.posts')}: ${posts?.length || 0}`;
    await Clipboard.setStringAsync(text);
    setCopiedText(text);
    Alert.alert(t('Common.copied'), text);
    // Clear copied text after 3 seconds
    setTimeout(() => setCopiedText(''), 3000);
  };

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const filteredPosts =
    posts?.filter(
      post =>
        !debouncedSearchTerm || post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) || [];

  return (
    <PageWrapper isLoading={isLoading} isError={isError}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('KitchenSinkPage.title')}</Text>

        {/* React Native Custom Hooks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('KitchenSinkPage.reactNativeHooks')}</Text>

          {/* useAsyncStorage + useToggle */}
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>{t('KitchenSinkPage.useAsyncStorageToggle')}</Text>
            <Text style={styles.infoText}>
              {t('KitchenSinkPage.currentTheme')}: {preferences.theme} |{' '}
              {t('KitchenSinkPage.autoSave')}:{' '}
              {preferences.autoSave ? t('KitchenSinkPage.on') : t('KitchenSinkPage.off')}
            </Text>

            <View style={styles.buttonRow}>
              <Button
                title={`${t('KitchenSinkPage.switchTo')} ${
                  preferences.theme === 'light'
                    ? t('KitchenSinkPage.darkTheme')
                    : t('KitchenSinkPage.lightTheme')
                } ${t('KitchenSinkPage.theme')}`}
                onPress={toggleTheme}
                style={styles.button}
              />
              <Button
                title={`${showAdvanced ? t('KitchenSinkPage.hide') : t('KitchenSinkPage.show')} ${t('KitchenSinkPage.advancedSettings')}`}
                onPress={toggleAdvanced}
                variant="secondary"
                style={styles.button}
              />
            </View>

            {showAdvanced && (
              <View style={styles.advancedSettings}>
                <Button
                  title={`${preferences.autoSave ? t('KitchenSinkPage.disable') : t('KitchenSinkPage.enable')} ${t('KitchenSinkPage.autoSave')}`}
                  onPress={() =>
                    setPreferences(prev => ({
                      ...prev,
                      autoSave: !prev.autoSave,
                    }))
                  }
                  variant="outline"
                />
              </View>
            )}
          </View>

          {/* useCounter */}
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>{t('KitchenSinkPage.useCounter')}</Text>
            <Text style={styles.infoText}>
              {t('KitchenSinkPage.count')}: {count}
            </Text>
            <View style={styles.buttonRow}>
              <Button title="+" onPress={increment} size="small" style={styles.counterButton} />
              <Button title="-" onPress={decrement} size="small" style={styles.counterButton} />
              <Button
                title={t('KitchenSinkPage.reset')}
                onPress={reset}
                variant="outline"
                size="small"
                style={styles.counterButton}
              />
            </View>
          </View>

          {/* useDebounce */}
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>{t('KitchenSinkPage.useDebounce')}</Text>
            <Input
              label={t('KitchenSinkPage.searchPosts')}
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder={t('KitchenSinkPage.typeToSearch')}
            />
            <Text style={styles.infoText}>
              {t('KitchenSinkPage.debouncedValue')}:{' '}
              {debouncedSearchTerm ? `"${debouncedSearchTerm}"` : '""'}
              {debouncedSearchTerm && ` (${filteredPosts.length} ${t('KitchenSinkPage.matches')})`}
            </Text>
          </View>

          {/* Expo Clipboard */}
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>{t('KitchenSinkPage.expoClipboard')}</Text>
            <View style={styles.buttonRow}>
              <Button
                title={t('KitchenSinkPage.copyPostsCount')}
                onPress={handleCopyPostsCount}
                variant="outline"
                style={styles.button}
              />
            </View>
            {copiedText && (
              <Text style={styles.successText}>
                {t('KitchenSinkPage.copied')}: {copiedText}
              </Text>
            )}
          </View>
        </View>

        {/* Posts list with search filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('KitchenSinkPage.posts')} ({posts?.length || 0})
          </Text>

          {filteredPosts.length === 0 && debouncedSearchTerm ? (
            <Text style={styles.noResultsText}>
              {t('KitchenSinkPage.noPostsFound')} {debouncedSearchTerm}
            </Text>
          ) : (
            <View style={styles.postsGrid}>
              {filteredPosts.slice(0, 10).map(post => (
                <View key={post.id} style={styles.postItem}>
                  <Text style={styles.postTitle} numberOfLines={2}>
                    {post.title}
                  </Text>
                  <Text style={styles.postId}>{post.id}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151',
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#4B5563',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    flex: 1,
    minWidth: 120,
  },
  counterButton: {
    minWidth: 50,
  },
  advancedSettings: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  successText: {
    color: '#059669',
    fontSize: 14,
    marginTop: 8,
  },
  noResultsText: {
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  postItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '48%',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  postId: {
    fontSize: 12,
    color: '#6B7280',
  },
});
