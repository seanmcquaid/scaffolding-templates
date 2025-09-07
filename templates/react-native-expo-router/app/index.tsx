import { View } from 'react-native';
import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useAppTranslation from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui';

export default function HomeScreen() {
  const { t } = useAppTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-h2 text-center mb-4 text-gray-800">
          {t('HomePage.title')}
        </Text>
        <Text className="text-body text-center text-gray-600 mb-8 leading-6">
          {t('HomePage.subtitle')}
        </Text>

        <View className="mt-5">
          <Link href="/about" asChild>
            <Button
              title={t('HomePage.navigateToAbout')}
              variant="primary"
              testID="navigate-to-about"
              onPress={() => {}}
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
