import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useAppTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('TabBar.home'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="react-query"
        options={{
          title: t('TabBar.reactQuery'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.triangle.2.circlepath" color={color} />,
        }}
      />
      <Tabs.Screen
        name="react-hook-form-zod"
        options={{
          title: t('TabBar.forms'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.seal.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="kitchen-sink"
        options={{
          title: t('TabBar.kitchenSink'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('TabBar.explore'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
