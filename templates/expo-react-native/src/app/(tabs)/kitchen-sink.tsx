import { useState } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Switch, Alert } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import {
  useLocalStorage,
  useToggle,
  useCounter,
  useDebounceValue,
  useCopyToClipboard,
} from 'usehooks-ts';
import { useQuery } from '@tanstack/react-query';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';
import { getPostsQuery } from '@/services/queries/posts';

const formDataSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be between 3 and 10 characters',
    })
    .max(10, {
      message: 'Name must be between 3 and 10 characters',
    }),
});

export default function KitchenSinkScreen() {
  const { t } = useAppTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formDataSchema),
  });

  // TanStack Query
  const { data: posts } = useQuery(getPostsQuery());

  // usehooks-ts examples
  const [preferences, setPreferences] = useLocalStorage('user-preferences', {
    theme: 'light',
    autoSave: true,
  });

  const [showAdvanced, toggleAdvanced] = useToggle(false);
  const { count, increment, decrement, reset } = useCounter(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const onSubmit = (data: z.infer<typeof formDataSchema>) => {
    Alert.alert(t('KitchenSinkPage.title'), `${t('Common.helloWorld')} ${data.name}!`);
  };

  const handleCopyPostsCount = () => {
    copyToClipboard(`${t('KitchenSinkPage.posts')}: ${posts?.length || 0}`);
    Alert.alert(t('KitchenSinkPage.copied'), copiedText || '');
  };

  const toggleTheme = () => {
    setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const filteredPosts = posts?.filter(
    (post) =>
      !debouncedSearchTerm || post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('KitchenSinkPage.title')}</ThemedText>
        </ThemedView>

        {/* React Hook Form + Zod */}
        <View style={styles.section}>
          <ThemedText type="subtitle">{t('KitchenSinkPage.reactHookFormZod')}</ThemedText>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                label={t('KitchenSinkPage.name')}
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.name?.message}
              />
            )}
          />
          <Button onPress={handleSubmit(onSubmit)}>{t('KitchenSinkPage.submit')}</Button>
        </View>

        {/* usehooks-ts examples */}
        <View style={styles.section}>
          <ThemedText type="subtitle">{t('KitchenSinkPage.usehookstsExamples')}</ThemedText>

          {/* useLocalStorage + useToggle */}
          <View style={styles.subsection}>
            <ThemedText type="defaultSemiBold">
              {t('KitchenSinkPage.useLocalStorageToggle')}
            </ThemedText>
            <ThemedText style={styles.infoText}>
              {t('KitchenSinkPage.currentTheme')}: {preferences.theme} |{' '}
              {t('KitchenSinkPage.autoSave')}:{' '}
              {preferences.autoSave ? t('KitchenSinkPage.on') : t('KitchenSinkPage.off')}
            </ThemedText>
            <View style={styles.buttonRow}>
              <Button onPress={toggleTheme} style={styles.flexButton}>
                {t('KitchenSinkPage.switchTo')}{' '}
                {preferences.theme === 'light'
                  ? t('KitchenSinkPage.darkTheme')
                  : t('KitchenSinkPage.lightTheme')}{' '}
                {t('KitchenSinkPage.theme')}
              </Button>
              <Button onPress={toggleAdvanced} variant="secondary" style={styles.flexButton}>
                {showAdvanced ? t('KitchenSinkPage.hide') : t('KitchenSinkPage.show')}{' '}
                {t('KitchenSinkPage.advancedSettings')}
              </Button>
            </View>
            {showAdvanced && (
              <View style={styles.advancedSettings}>
                <View style={styles.switchRow}>
                  <ThemedText>{t('KitchenSinkPage.enableAutoSave')}</ThemedText>
                  <Switch
                    value={preferences.autoSave}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({ ...prev, autoSave: value }))
                    }
                  />
                </View>
              </View>
            )}
          </View>

          {/* useCounter */}
          <View style={styles.subsection}>
            <ThemedText type="defaultSemiBold">{t('KitchenSinkPage.useCounter')}</ThemedText>
            <ThemedText style={styles.infoText}>
              {t('KitchenSinkPage.count')}: {count}
            </ThemedText>
            <View style={styles.buttonRow}>
              <Button onPress={increment} style={styles.smallButton}>
                +
              </Button>
              <Button onPress={decrement} style={styles.smallButton}>
                -
              </Button>
              <Button onPress={reset} variant="secondary" style={styles.flexButton}>
                {t('KitchenSinkPage.reset')}
              </Button>
            </View>
          </View>

          {/* useDebounceValue */}
          <View style={styles.subsection}>
            <ThemedText type="defaultSemiBold">{t('KitchenSinkPage.useDebounceValue')}</ThemedText>
            <TextInput
              style={styles.searchInput}
              placeholder={t('KitchenSinkPage.typeToSearch')}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <ThemedText style={styles.infoText}>
              {t('KitchenSinkPage.debouncedValue')}:{' '}
              {debouncedSearchTerm ? `"${debouncedSearchTerm}"` : '""'}
              {debouncedSearchTerm &&
                ` (${filteredPosts?.length || 0} ${t('KitchenSinkPage.matches')})`}
            </ThemedText>
          </View>

          {/* useCopyToClipboard */}
          <View style={styles.subsection}>
            <ThemedText type="defaultSemiBold">
              {t('KitchenSinkPage.useCopyToClipboard')}
            </ThemedText>
            <Button onPress={handleCopyPostsCount}>{t('KitchenSinkPage.copyPostsCount')}</Button>
          </View>
        </View>

        {/* Posts List */}
        <View style={styles.section}>
          <ThemedText type="subtitle">
            {t('KitchenSinkPage.posts')} ({posts?.length || 0})
          </ThemedText>
          <View style={styles.postsGrid}>
            {filteredPosts?.slice(0, 10).map((post) => (
              <View key={post.id} style={styles.postItem}>
                <LinkButton href={`/react-query/${post.id}` as unknown as string} variant="outline">
                  {post.title.substring(0, 20)}...
                </LinkButton>
              </View>
            ))}
          </View>
          {debouncedSearchTerm && filteredPosts?.length === 0 && (
            <ThemedText style={styles.infoText}>
              {t('KitchenSinkPage.noPostsFound')} "{debouncedSearchTerm}"
            </ThemedText>
          )}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  titleContainer: {
    paddingVertical: 24,
  },
  section: {
    marginBottom: 32,
    gap: 12,
  },
  subsection: {
    gap: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.7,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  flexButton: {
    flex: 1,
  },
  smallButton: {
    paddingHorizontal: 20,
  },
  advancedSettings: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#C6C6C8',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  postsGrid: {
    gap: 8,
  },
  postItem: {
    marginVertical: 4,
  },
});
