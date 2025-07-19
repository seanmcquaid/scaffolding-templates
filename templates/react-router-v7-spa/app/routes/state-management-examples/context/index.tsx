import { createContext, useContext, useState, ReactNode } from 'react';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Theme Context Example
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontSize, setFontSize }}>
      <div 
        className={`${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white'} 
                   ${fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base'}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme controls component
const ThemeControls = () => {
  const { theme, toggleTheme, fontSize, setFontSize } = useTheme();

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h4 className="mb-3 font-medium">Theme Controls</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Theme:</span>
          <Button onClick={toggleTheme} variant="outline">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>Font Size:</span>
          <div className="flex gap-1">
            {(['small', 'medium', 'large'] as const).map(size => (
              <Button
                key={size}
                variant={fontSize === size ? 'default' : 'outline'}
                className="text-sm h-8 px-3 capitalize"
                onClick={() => setFontSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component that uses theme context
const ThemedCard = ({ title, children }: { title: string; children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg border p-4 ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-600' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <h4 className="mb-2 font-medium">{title}</h4>
      {children}
    </div>
  );
};

// User Authentication Context Example
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    if (email === 'admin@example.com' && password === 'admin') {
      setUser({ id: 1, name: 'Admin User', email, role: 'admin' });
    } else if (email === 'user@example.com' && password === 'user') {
      setUser({ id: 2, name: 'Regular User', email, role: 'user' });
    } else {
      alert('Invalid credentials. Try admin@example.com/admin or user@example.com/user');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Login form component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <ThemedCard title="Login">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Try: admin@example.com / admin</p>
          <p>Or: user@example.com / user</p>
        </div>
      </form>
    </ThemedCard>
  );
};

// User profile component
const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <ThemedCard title="User Profile">
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <Button onClick={logout} variant="outline" className="w-full">
          Logout
        </Button>
      </div>
    </ThemedCard>
  );
};

// Settings Context Example (nested context)
interface SettingsContextType {
  notifications: boolean;
  toggleNotifications: () => void;
  autoSave: boolean;
  toggleAutoSave: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleNotifications = () => setNotifications(prev => !prev);
  const toggleAutoSave = () => setAutoSave(prev => !prev);

  return (
    <SettingsContext.Provider value={{
      notifications,
      toggleNotifications,
      autoSave,
      toggleAutoSave,
      language,
      setLanguage,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// Settings panel component
const SettingsPanel = () => {
  const { notifications, toggleNotifications, autoSave, toggleAutoSave, language, setLanguage } = useSettings();
  const { user } = useAuth();

  if (!user) {
    return (
      <ThemedCard title="Settings">
        <p className="text-gray-600 dark:text-gray-400">Login to access settings</p>
      </ThemedCard>
    );
  }

  return (
    <ThemedCard title="Application Settings">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Notifications:</span>
          <Button
            onClick={toggleNotifications}
            variant={notifications ? 'default' : 'outline'}
            className="text-sm h-8 px-3"
          >
            {notifications ? 'On' : 'Off'}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Auto Save:</span>
          <Button
            onClick={toggleAutoSave}
            variant={autoSave ? 'default' : 'outline'}
            className="text-sm h-8 px-3"
          >
            {autoSave ? 'On' : 'Off'}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded border p-1 text-sm bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </ThemedCard>
  );
};

// Context debugging component
const ContextDebugger = () => {
  const { theme, fontSize } = useTheme();
  const { user } = useAuth();
  const { notifications, autoSave, language } = useSettings();

  return (
    <ThemedCard title="Context State Debug">
      <div className="space-y-2 text-sm">
        <h5 className="font-medium">Theme Context:</h5>
        <div className="pl-4 space-y-1">
          <div>Theme: {theme}</div>
          <div>Font Size: {fontSize}</div>
        </div>
        
        <h5 className="font-medium">Auth Context:</h5>
        <div className="pl-4 space-y-1">
          <div>Logged in: {user ? 'Yes' : 'No'}</div>
          {user && <div>Role: {user.role}</div>}
        </div>
        
        <h5 className="font-medium">Settings Context:</h5>
        <div className="pl-4 space-y-1">
          <div>Notifications: {notifications ? 'On' : 'Off'}</div>
          <div>Auto Save: {autoSave ? 'On' : 'Off'}</div>
          <div>Language: {language}</div>
        </div>
      </div>
    </ThemedCard>
  );
};

// Main example component with nested providers
const ContextExampleContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ThemeControls />
        <ContextDebugger />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <LoginForm />
        <UserProfile />
        <SettingsPanel />
      </div>
    </div>
  );
};

const ContextExample = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Context State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 dark:bg-blue-900 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
            <li>Context provides state to a subtree of components without prop drilling</li>
            <li>Use for themes, authentication, user preferences, and shared app state</li>
            <li>Combine with custom hooks for better developer experience</li>
            <li>Can be nested - components access the nearest provider</li>
          </ul>
        </div>

        <ThemeProvider>
          <AuthProvider>
            <SettingsProvider>
              <ContextExampleContent />
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>

        <div className="mt-8 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">Context Best Practices:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">✓ Use Context for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Theme/styling configuration</li>
                <li>User authentication state</li>
                <li>Application-wide settings</li>
                <li>Localization/i18n data</li>
                <li>Modal/notification state</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">✗ Avoid Context for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Frequently changing data (causes re-renders)</li>
                <li>Data that only 1-2 components need</li>
                <li>Performance-critical state updates</li>
                <li>Local component state</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded">
            <p className="text-sm">
              <strong>💡 Performance tip:</strong> Split contexts by update frequency. 
              Put rarely-changing data (theme, auth) in one context and frequently-changing 
              data in another to minimize re-renders.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContextExample;