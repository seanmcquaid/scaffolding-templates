import { View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useAppTranslation from '@/hooks/useAppTranslation';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@/components/ui';

export default function HomeScreen() {
  const { t } = useAppTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView className="flex-1">
        <View className="flex-1 items-center justify-center p-5">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center">
                {t('HomePage.title')}
              </CardTitle>
              <CardDescription className="text-center">
                {t('HomePage.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="items-center space-y-4">
              <Badge variant="secondary">{t('HomePage.welcomeBadge')}</Badge>

              <View className="flex-row space-x-2">
                <Link href="/about" asChild>
                  <Button
                    title={t('HomePage.navigateToAbout')}
                    variant="default"
                    size="default"
                    testID="navigate-to-about"
                    onPress={() => {}}
                  />
                </Link>
              </View>

              <View className="flex-row space-x-2">
                <Button
                  title={t('HomePage.secondaryButton')}
                  variant="outline"
                  size="sm"
                  onPress={() => {}}
                />
                <Button
                  title={t('HomePage.destructiveButton')}
                  variant="destructive"
                  size="sm"
                  onPress={() => {}}
                />
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
