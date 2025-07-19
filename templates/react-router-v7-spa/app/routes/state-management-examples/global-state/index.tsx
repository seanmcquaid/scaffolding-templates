import { useState, useEffect } from 'react';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Simple global state implementation using the module pattern
// This demonstrates global state concepts without external libraries

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface GlobalState {
  cart: CartItem[];
  user: { name: string; email: string } | null;
  notifications: Array<{ id: number; message: string; type: 'success' | 'error' | 'info' }>;
  isOnline: boolean;
}

interface StateListener {
  (state: GlobalState): void;
}

// Global state store implementation
class SimpleStore {
  private state: GlobalState = {
    cart: [],
    user: null,
    notifications: [],
    isOnline: navigator.onLine,
  };

  private listeners: StateListener[] = [];

  getState(): GlobalState {
    return { ...this.state };
  }

  setState(updater: (state: GlobalState) => GlobalState): void {
    this.state = updater(this.state);
    this.notifyListeners();
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Create global store instance
const globalStore = new SimpleStore();

// Custom hook to use global state
function useGlobalState(): [GlobalState, (updater: (state: GlobalState) => GlobalState) => void];
function useGlobalState<T>(selector: (state: GlobalState) => T): [T, (updater: (state: GlobalState) => GlobalState) => void];
function useGlobalState<T>(selector?: (state: GlobalState) => T) {
  const [state, setState] = useState<GlobalState | T>(
    selector ? selector(globalStore.getState()) : globalStore.getState()
  );

  useEffect(() => {
    const unsubscribe = globalStore.subscribe((newState) => {
      setState(selector ? selector(newState) : newState);
    });

    return unsubscribe;
  }, [selector]);

  return [state, globalStore.setState.bind(globalStore)];
}

// Cart actions
const addToCart = (product: Omit<CartItem, 'quantity'>) => {
  globalStore.setState(state => ({
    ...state,
    cart: state.cart.find(item => item.id === product.id)
      ? state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...state.cart, { ...product, quantity: 1 }],
  }));

  addNotification(`Added ${product.name} to cart`, 'success');
};

const removeFromCart = (productId: number) => {
  globalStore.setState(state => ({
    ...state,
    cart: state.cart.filter(item => item.id !== productId),
  }));

  addNotification('Item removed from cart', 'info');
};

const updateCartQuantity = (productId: number, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  globalStore.setState(state => ({
    ...state,
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ),
  }));
};

const clearCart = () => {
  globalStore.setState(state => ({
    ...state,
    cart: [],
  }));

  addNotification('Cart cleared', 'info');
};

// User actions
const loginUser = (name: string, email: string) => {
  globalStore.setState(state => ({
    ...state,
    user: { name, email },
  }));

  addNotification(`Welcome, ${name}!`, 'success');
};

const logoutUser = () => {
  globalStore.setState(state => ({
    ...state,
    user: null,
  }));

  addNotification('Logged out successfully', 'info');
};

// Notification actions
const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
  const id = Date.now();
  
  globalStore.setState(state => ({
    ...state,
    notifications: [...state.notifications, { id, message, type }],
  }));

  // Auto-remove after 3 seconds
  setTimeout(() => {
    globalStore.setState(state => ({
      ...state,
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  }, 3000);
};

const removeNotification = (id: number) => {
  globalStore.setState(state => ({
    ...state,
    notifications: state.notifications.filter(n => n.id !== id),
  }));
};

// Online status tracking
const updateOnlineStatus = () => {
  globalStore.setState(state => ({
    ...state,
    isOnline: navigator.onLine,
  }));

  addNotification(
    navigator.onLine ? 'Back online' : 'You are offline',
    navigator.onLine ? 'success' : 'error'
  );
};

// Set up online/offline listeners
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Product catalog component
const ProductCatalog = () => {
  const [cart] = useGlobalState(state => state.cart);

  const products = [
    { id: 1, name: 'React Course', price: 99 },
    { id: 2, name: 'TypeScript Guide', price: 79 },
    { id: 3, name: 'Node.js Tutorial', price: 119 },
    { id: 4, name: 'Full Stack Bundle', price: 249 },
  ];

  const getCartQuantity = (productId: number) => {
    return cart.find((item: CartItem) => item.id === productId)?.quantity || 0;
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Product Catalog</h3>
      <div className="space-y-3">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-green-600 font-bold">${product.price}</p>
              {getCartQuantity(product.id) > 0 && (
                <p className="text-sm text-blue-600">
                  In cart: {getCartQuantity(product.id)}
                </p>
              )}
            </div>
            <Button onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shopping cart component
const ShoppingCart = () => {
  const [cart] = useGlobalState(state => state.cart);

  const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        {cart.length > 0 && (
          <Button onClick={clearCart} variant="outline" className="text-sm h-8 px-3">
            Clear All
          </Button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">${item.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="text-sm h-8 px-3"
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    className="text-sm h-8 px-3"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="text-sm h-8 px-3"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total: ${total.toFixed(2)}</span>
              <Button>Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// User authentication component
const UserAuth = () => {
  const [user] = useGlobalState(state => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      loginUser(name, email);
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">User Authentication</h3>
      
      {!user ? (
        <form onSubmit={handleLogin} className="space-y-3">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      ) : (
        <div className="space-y-3">
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <Button onClick={logoutUser} variant="outline" className="w-full">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

// Notifications component
const NotificationSystem = () => {
  const [notifications] = useGlobalState(state => state.notifications);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`max-w-sm p-3 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Status bar component
const StatusBar = () => {
  const [isOnline] = useGlobalState(state => state.isOnline);
  const [cart] = useGlobalState(state => state.cart);
  const [user] = useGlobalState(state => state.user);

  const itemCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <span>Cart: {itemCount} items</span>
          <span>User: {user ? user.name : 'Not logged in'}</span>
        </div>
        <Button
          onClick={() => addNotification('Test notification', 'info')}
          variant="outline"
          className="text-sm h-8 px-3"
        >
          Test Notification
        </Button>
      </div>
    </div>
  );
};

// Global state debugger
const StateDebugger = () => {
  const [state] = useGlobalState();

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Global State Debug</h3>
      <div className="bg-gray-50 p-3 rounded">
        <pre className="text-xs overflow-auto">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const GlobalStateExample = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Global State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>Global state is accessible from any component in the application</li>
            <li>Use for complex state that needs to be shared across many components</li>
            <li>Common examples: shopping carts, user sessions, real-time data</li>
            <li>Consider libraries like Redux Toolkit, Zustand, or Jotai for production use</li>
          </ul>
        </div>

        <div className="space-y-6">
          <StatusBar />
          
          <div className="grid gap-6 lg:grid-cols-2">
            <ProductCatalog />
            <ShoppingCart />
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <UserAuth />
            <StateDebugger />
          </div>
        </div>

        <NotificationSystem />

        <div className="mt-8 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">When to Use Global State:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">✓ Use global state for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>User authentication and profile data</li>
                <li>Shopping cart or favorites</li>
                <li>Real-time data (chat, notifications)</li>
                <li>Cross-page application settings</li>
                <li>Complex form data across multiple pages</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">✗ Avoid global state for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Simple component-specific state</li>
                <li>Data that can be derived from other state</li>
                <li>Temporary UI state (modals, dropdowns)</li>
                <li>Server data (use TanStack Query instead)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-100 rounded">
            <h4 className="font-medium mb-2">Popular Global State Libraries:</h4>
            <div className="text-sm space-y-1">
              <p><strong>Redux Toolkit:</strong> Most popular, great DevTools, time-travel debugging</p>
              <p><strong>Zustand:</strong> Lightweight, minimal boilerplate, TypeScript-friendly</p>
              <p><strong>Jotai:</strong> Atomic approach, bottom-up state management</p>
              <p><strong>Valtio:</strong> Proxy-based, mutable-style API</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default GlobalStateExample;