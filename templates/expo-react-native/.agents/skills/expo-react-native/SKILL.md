---
name: expo-react-native-development
description: Expert in Expo and React Native for cross-platform mobile development. Specializes in building native mobile apps for iOS and Android.
---

# Expo React Native Development

Build production-ready cross-platform mobile applications with Expo SDK and React Native.

## Technology Stack

- **Expo SDK**: Cross-platform React Native framework (iOS, Android, Web)
- **Expo Router**: File-based routing with native navigation support
- **React Native**: Native mobile UI components
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety with strict configuration
- **TanStack Query**: Server state management and data fetching
- **React Hook Form + Zod**: Type-safe form handling with validation
- **usehooks-ts**: Essential React hooks for common UI patterns
- **i18next**: Internationalization with type-safe translation keys
- **ESLint + Prettier**: Code linting and formatting
- **Jest + jest-expo**: Unit testing with React Native support

## When to Use

Use this skill for Expo React Native projects that need:
- Cross-platform mobile apps (iOS and Android)
- Native device capabilities (camera, location, notifications)
- File-based navigation with Expo Router
- Offline-first data persistence
- Platform-specific UI and behavior
- Native performance optimization

## File-Based Routing Structure

```
app/
├── _layout.tsx          # Root layout
├── index.tsx            # Home screen (/)
├── (tabs)/              # Tab navigation
│   ├── _layout.tsx      # Tab layout
│   ├── index.tsx        # Home tab
│   ├── profile.tsx      # Profile tab
│   └── settings.tsx     # Settings tab
├── modal.tsx            # Modal screen
├── [id].tsx             # Dynamic route
└── +not-found.tsx       # 404 screen
```

## Root Layout

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Modal Screen',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
```

## Tab Navigation

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function TabLayout() {
  const { t } = useAppTranslation();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('Navigation.home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('Navigation.profile'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

## Dynamic Routes

```tsx
// app/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <View>
      <Text>Detail for item: {id}</Text>
    </View>
  );
}
```

## Navigation

### Programmatic Navigation

```tsx
import { router } from 'expo-router';
import { Button } from 'react-native';

export function NavigationExample() {
  const handleNavigate = () => {
    router.push('/profile');
    // or
    router.push({
      pathname: '/detail/[id]',
      params: { id: '123' },
    });
  };
  
  const handleBack = () => {
    router.back();
  };
  
  const handleReplace = () => {
    router.replace('/login');
  };
  
  return (
    <>
      <Button title="Go to Profile" onPress={handleNavigate} />
      <Button title="Go Back" onPress={handleBack} />
      <Button title="Replace with Login" onPress={handleReplace} />
    </>
  );
}
```

### Deep Linking

```json
// app.json
{
  "expo": {
    "scheme": "myapp",
    "web": {
      "bundler": "metro"
    }
  }
}

// Usage: myapp://profile/123
```

## React Native Components

### Styling with StyleSheet

```tsx
import { View, Text, StyleSheet } from 'react-native';

export function Card({ title, description }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
```

### Platform-Specific Code

```tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 0,
      },
      default: {
        paddingTop: 10,
      },
    }),
  },
});

// Or with Platform.OS
if (Platform.OS === 'ios') {
  // iOS-specific code
} else if (Platform.OS === 'android') {
  // Android-specific code
}
```

### Safe Area

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

export function Screen({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {children}
    </SafeAreaView>
  );
}
```

## Data Persistence

### Async Storage Hook

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      })
      .catch((error) => {
        console.error('Error loading from AsyncStorage:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);
  
  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
  };
  
  return [storedValue, setValue, loading] as const;
}

// Usage
export function Settings() {
  const [theme, setTheme, loading] = useAsyncStorage('theme', 'light');
  
  if (loading) return <ActivityIndicator />;
  
  return (
    <Button
      title={`Current: ${theme}`}
      onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  );
}
```

## Expo SDK Integration

### Camera

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, View } from 'react-native';

export function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  
  if (!permission) {
    return <View />;
  }
  
  if (!permission.granted) {
    return (
      <View>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }
  
  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing={facing}>
        <Button
          title="Flip Camera"
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
        />
      </CameraView>
    </View>
  );
}
```

### Location

```tsx
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  
  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `${location.coords.latitude}, ${location.coords.longitude}`;
  }
  
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}
```

### Notifications

```tsx
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function NotificationsScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => 
      setExpoPushToken(token || '')
    );
    
    notificationListener.current = 
      Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification received:', notification);
      });
    
    responseListener.current = 
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Notification response:', response);
      });
    
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(
        responseListener.current!
      );
    };
  }, []);
  
  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
      },
      trigger: { seconds: 2 },
    });
  };
  
  return (
    <Button 
      title="Press to schedule a notification" 
      onPress={schedulePushNotification} 
    />
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
  
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    return;
  }
  
  token = (await Notifications.getExpoPushTokenAsync()).data;
  
  return token;
}
```

## Performance Optimization

### FlatList for Large Lists

```tsx
import { FlatList, Text, View } from 'react-native';

export function LargeList({ items }: { items: Item[] }) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      getItemLayout={(data, index) => ({
        length: 70, // Item height
        offset: 70 * index,
        index,
      })}
    />
  );
}
```

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
export const ExpensiveItem = memo(function ExpensiveItem({ item }: Props) {
  return <Text>{item.name}</Text>;
});

// Memoize calculations
export function DataView({ data }: Props) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);
  
  return <Text>{processedData}</Text>;
}
```

## Internationalization

```tsx
// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import enUS from './locales/en-US.json';
import enCA from './locales/en-CA.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': { translation: enUS },
      'en-CA': { translation: enCA },
    },
    lng: Localization.locale,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// Usage in components
import useAppTranslation from '@/hooks/useAppTranslation';

export function HomeScreen() {
  const { t } = useAppTranslation();
  
  return (
    <View>
      <Text>{t('Home.welcome')}</Text>
    </View>
  );
}
```

## Testing

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button title="Click me" onPress={() => {}} />);
    expect(screen.getByText('Click me')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button title="Click me" onPress={onPress} />);
    
    fireEvent.press(screen.getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

## Build and Deployment

### EAS Build Configuration

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Build Commands

```bash
# Development build
eas build --profile development --platform ios

# Production build
eas build --profile production --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## Key Principles

1. **Cross-Platform First**: Write code that works on both iOS and Android
2. **Native Performance**: Use FlatList and memoization for performance
3. **Platform-Specific Code**: Handle platform differences appropriately
4. **Expo Router**: Use file-based routing for navigation
5. **AsyncStorage**: Persist data locally for offline support
6. **Permissions**: Request permissions properly with good UX
7. **Type Safety**: Use TypeScript for all code
8. **Testing**: Test on both iOS and Android simulators
