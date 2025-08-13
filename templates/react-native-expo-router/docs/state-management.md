# State Management

This document explains the state management patterns and tools used in the React Native Expo Router template.

## State Management Hierarchy

Following the established patterns, the template uses a hierarchical approach to state management:

| State Type | Use Case | Implementation |
|------------|----------|----------------|
| URL | Shareable app location | Expo Router params |
| Local Storage | Persist between sessions | AsyncStorage |
| Local State | Component-only state | useState, useReducer |
| Lifted State | Multiple related components | Props, lifted useState |
| Derived State | Calculated from existing state | useMemo, computed values |
| Context | Subtree or small global state | React Context |
| Global State | Significant global state | TanStack Query + Context |

## Implementation Details

### 1. URL State - Navigation Parameters

Use Expo Router for URL-based state:

```typescript
// In screens, access route parameters
import { useLocalSearchParams } from 'expo-router';

const UserProfile = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  
  return <Text>User ID: {userId}</Text>;
};

// Navigate with parameters
import { useRouter } from 'expo-router';

const router = useRouter();
router.push(`/user/${userId}`);

// Or use Link component
import { Link } from 'expo-router';

<Link href={`/user/${userId}`}>View Profile</Link>
```

### 2. Local Storage - Persistent Data

Use AsyncStorage for data that should persist between app sessions:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const usePersistedState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const loadState = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          setState(JSON.parse(stored));
        }
      } catch (error) {
        console.error(`Error loading ${key} from storage:`, error);
      }
    };

    loadState();
  }, [key]);

  const setPersistedState = async (value: T) => {
    try {
      setState(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  };

  return [state, setPersistedState] as const;
};

// Usage
const UserSettings = () => {
  const [theme, setTheme] = usePersistedState('theme', 'light');
  
  return (
    <Button 
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'}`}
      onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  );
};
```

### 3. Local State - Component State

Use useState for component-specific state:

```typescript
import { useState } from 'react';
import { useToggle, useCounter } from 'usehooks-ts';

const ExampleComponent = () => {
  // Simple state
  const [text, setText] = useState('');
  
  // Boolean state with helper
  const [isVisible, toggleVisible] = useToggle(false);
  
  // Counter with built-in operations
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <View>
      <TextInput value={text} onChangeText={setText} />
      
      {isVisible && <Text>Toggled content</Text>}
      <Button title="Toggle" onPress={toggleVisible} />
      
      <Text>Count: {count}</Text>
      <Button title="+" onPress={increment} />
      <Button title="-" onPress={decrement} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
};
```

### 4. Lifted State - Shared Component State

When multiple components need the same state:

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View>
      <ProductList onAddToCart={addToCart} />
      <CartSummary items={cartItems} onRemove={removeFromCart} />
    </View>
  );
};
```

### 5. Derived State - Computed Values

Calculate values from existing state instead of storing them:

```typescript
import { useMemo } from 'react';

const CartSummary = ({ items }: { items: CartItem[] }) => {
  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

    return { totalItems, totalPrice, averagePrice };
  }, [items]);

  return (
    <View>
      <Text>Total Items: {summary.totalItems}</Text>
      <Text>Total Price: ${summary.totalPrice.toFixed(2)}</Text>
      <Text>Average Price: ${summary.averagePrice.toFixed(2)}</Text>
    </View>
  );
};
```

### 6. Context - Subtree State

Use React Context for state that needs to be shared across a component subtree:

```typescript
import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistedState } from '@/hooks/usePersistedState';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = usePersistedState<'light' | 'dark'>('theme', 'light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Usage
const ThemedButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      title={`Current theme: ${theme}`}
      onPress={toggleTheme}
      style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}
    />
  );
};
```

### 7. Global State - Server State Management

Use TanStack Query for server state and caching:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, createUser } from '@/services/api';

// Query for fetching data
const UserList = () => {
  const {
    data: users,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={user => user.id.toString()}
      renderItem={({ item }) => <UserCard user={item} />}
      onRefresh={refetch}
      refreshing={isLoading}
    />
  );
};

// Mutation for updating data
const CreateUserForm = () => {
  const queryClient = useQueryClient();
  
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (userData: CreateUserData) => {
    createUserMutation.mutate(userData);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={createUserMutation.isPending}
      error={createUserMutation.error}
    />
  );
};
```

## State Management Best Practices

### 1. Keep State Local When Possible

Start with local state and only lift it when multiple components need it:

```typescript
// ✅ Good - Local state for component-specific data
const [isExpanded, setIsExpanded] = useState(false);

// ❌ Avoid - Global state for component-specific data
const { isExpanded, setIsExpanded } = useGlobalState();
```

### 2. Use the Right Tool for the Job

```typescript
// ✅ Server state - Use TanStack Query
const { data: users } = useQuery(['users'], getUsers);

// ✅ UI state - Use local state
const [isModalOpen, setIsModalOpen] = useState(false);

// ✅ User preferences - Use AsyncStorage
const [theme, setTheme] = usePersistedState('theme', 'light');
```

### 3. Normalize Complex State

For complex nested state, normalize the structure:

```typescript
// ❌ Nested state structure
const [state, setState] = useState({
  users: [
    { id: 1, name: 'John', posts: [{ id: 1, title: 'Post 1' }] }
  ]
});

// ✅ Normalized state structure
const [users, setUsers] = useState({ 1: { id: 1, name: 'John' } });
const [posts, setPosts] = useState({ 1: { id: 1, title: 'Post 1', userId: 1 } });
```

### 4. Use TypeScript for Type Safety

Always type your state to catch errors early:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const [users, setUsers] = useState<User[]>([]);
// TypeScript will catch if you try to add invalid user data
```

### 5. Handle Loading and Error States

Always handle loading and error states in your UI:

```typescript
const UserProfile = () => {
  const { data: user, isLoading, error } = useQuery(['user'], getUser);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <Text>User not found</Text>;

  return <UserDetails user={user} />;
};
```

## Common Patterns

### Form State Management

Use React Hook Form for complex forms:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const UserForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '' }
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            {...field}
            error={errors.name?.message}
          />
        )}
      />
    </Form>
  );
};
```

### Optimistic Updates

Update UI optimistically for better UX:

```typescript
const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['post', postId]);

      // Snapshot previous value
      const previousPost = queryClient.getQueryData(['post', postId]);

      // Optimistically update
      queryClient.setQueryData(['post', postId], (old: any) => ({
        ...old,
        likes: old.likes + 1,
        isLiked: true
      }));

      return { previousPost };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(['post', postId], context?.previousPost);
    },
    onSettled: () => {
      // Refetch to sync with server
      queryClient.invalidateQueries(['post', postId]);
    }
  });
};
```