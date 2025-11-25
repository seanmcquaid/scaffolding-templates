import { StyleSheet, ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Input } from '@/components/ui/Input';
import useAppTranslation from '@/hooks/useAppTranslation';

const formDataSchema = z
  .object({
    username: z.string().email({
      message: 'Please enter a valid email',
    }),
    password: z.string().min(3).max(10, {
      message: 'Password must be between 3 and 10 characters',
    }),
    confirmPassword: z.string().min(3).max(10, {
      message: 'Password must be between 3 and 10 characters',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function ReactHookFormZodScreen() {
  const { t } = useAppTranslation();
  const {
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    mode: 'all',
    resolver: zodResolver(formDataSchema),
  });

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('ReactHookFormZodPage.title')}</ThemedText>
        </ThemedView>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input
              label={t('ReactHookFormZodPage.username')}
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.username?.message}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label={t('ReactHookFormZodPage.password')}
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.password?.message}
              secureTextEntry
              autoComplete="password"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label={t('ReactHookFormZodPage.confirmPassword')}
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.confirmPassword?.message}
              secureTextEntry
              autoComplete="password"
            />
          )}
        />
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
});
