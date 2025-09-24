import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useAppTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#007AFF',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#999' : '#8E8E93',
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#F8F9FA',
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: colorScheme === 'dark' ? '#fff' : '#000',
        },
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#F8F9FA',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#E1E5E9',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('Navigation.home'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="react-query"
        options={{
          title: t('Navigation.reactQuery'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cloud' : 'cloud-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="react-hook-form-zod"
        options={{
          title: t('Navigation.forms'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="kitchen-sink"
        options={{
          title: t('Navigation.kitchenSink'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'apps' : 'apps-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide this tab
        }}
      />
    </Tabs>
  );
}
