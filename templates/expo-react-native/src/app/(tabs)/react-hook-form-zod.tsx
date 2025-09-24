import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { z } from 'zod';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useAppTranslation from '@/hooks/useAppTranslation';

const formDataSchema = z
  .object({
    username: z.string().email({
      message: 'Please enter a valid email',
    }),
    password: z
      .string()
      .min(3, {
        message: 'Password must be at least 3 characters',
      })
      .max(10, {
        message: 'Password must be between 3 and 10 characters',
      }),
    confirmPassword: z
      .string()
      .min(3, {
        message: 'Password must be at least 3 characters',
      })
      .max(10, {
        message: 'Password must be between 3 and 10 characters',
      }),
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters',
      })
      .max(50, {
        message: 'Name must be less than 50 characters',
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formDataSchema>;

export default function ReactHookFormZodScreen() {
  const { t } = useAppTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert(
        t('ReactHookFormZodPage.success'),
        `${t('ReactHookFormZodPage.welcome')} ${data.name}!\n${t('ReactHookFormZodPage.email')}: ${data.username}`,
        [
          {
            text: t('Common.ok'),
            onPress: () => reset(),
          },
        ]
      );
    } catch {
      Alert.alert(t('Common.error'), t('ReactHookFormZodPage.submitError'));
    }
  };

  return (
    <PageWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('ReactHookFormZodPage.title')}</Text>

        <Text style={styles.description}>{t('ReactHookFormZodPage.description')}</Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('ReactHookFormZodPage.name')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.name?.message}
                placeholder={t('ReactHookFormZodPage.namePlaceholder')}
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('ReactHookFormZodPage.email')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.username?.message}
                placeholder={t('ReactHookFormZodPage.emailPlaceholder')}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('ReactHookFormZodPage.password')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.password?.message}
                placeholder={t('ReactHookFormZodPage.passwordPlaceholder')}
                secureTextEntry
                autoComplete="new-password"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('ReactHookFormZodPage.confirmPassword')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.confirmPassword?.message}
                placeholder={t('ReactHookFormZodPage.confirmPasswordPlaceholder')}
                secureTextEntry
                autoComplete="new-password"
              />
            )}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={
                isSubmitting
                  ? t('ReactHookFormZodPage.submitting')
                  : t('ReactHookFormZodPage.submit')
              }
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
              style={styles.submitButton}
            />

            <Button
              title={t('ReactHookFormZodPage.reset')}
              onPress={() => reset()}
              variant="outline"
              style={styles.resetButton}
            />
          </View>
        </View>

        <View style={styles.validationInfo}>
          <Text style={styles.validationTitle}>{t('ReactHookFormZodPage.validationRules')}</Text>
          <Text style={styles.validationRule}>• {t('ReactHookFormZodPage.nameRule')}</Text>
          <Text style={styles.validationRule}>• {t('ReactHookFormZodPage.emailRule')}</Text>
          <Text style={styles.validationRule}>• {t('ReactHookFormZodPage.passwordRule')}</Text>
          <Text style={styles.validationRule}>
            • {t('ReactHookFormZodPage.confirmPasswordRule')}
          </Text>
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
    marginBottom: 16,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  submitButton: {
    marginBottom: 8,
  },
  resetButton: {
    marginBottom: 16,
  },
  validationInfo: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  validationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  validationRule: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
    lineHeight: 20,
  },
});
