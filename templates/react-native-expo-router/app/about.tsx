import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useAppTranslation from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui';

export default function AboutScreen() {
  const { t } = useAppTranslation();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const features = [
    t('AboutPage.features.expo'),
    t('AboutPage.features.typescript'),
    t('AboutPage.features.testing'),
    t('AboutPage.features.linting'),
    t('AboutPage.features.i18n'),
    t('AboutPage.features.stateManagement'),
    t('AboutPage.features.forms'),
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text className="text-h1 text-center mb-4 text-gray-800">
          {t('AboutPage.title')}
        </Text>
        <Text className="text-body text-center text-gray-600 mb-8 leading-6">
          {t('AboutPage.description')}
        </Text>

        <View className="mb-8">
          <Text className="text-h3 mb-4 text-gray-800">
            {t('AboutPage.features.title')}
          </Text>
          {features.map((feature, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-body text-primary mr-2 mt-0.5">•</Text>
              <Text className="flex-1 text-body text-gray-700 leading-5.5">
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-5">
          <Button
            title={t('AboutPage.backToHome')}
            onPress={handleGoBack}
            variant="default"
            testID="back-to-home"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
