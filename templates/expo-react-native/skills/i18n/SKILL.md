---
name: i18n
description: Implements internationalization (i18n) using i18next and react-i18next. Ensures ALL user-facing text uses translation keys, manages locale detection, and integrates i18n with forms, tests, and SSR.
---

# Internationalization (i18n)

Implement type-safe internationalization across all scaffolding templates using i18next and react-i18next.

## When to Use

Use this skill when you need to:
- Add or update user-facing text (ALL text must be translated)
- Set up i18next configuration for a new template
- Add new translation keys to locale files
- Implement locale detection and switching
- Test components that use translations
- Handle pluralization, interpolation, or dynamic content
- Configure SSR-compatible i18n

## ⚠️ Mandatory Requirement

**ALL USER-FACING TEXT MUST USE TRANSLATION KEYS** - This is enforced by the ESLint rule `i18next/no-literal-string`.

### ❌ Never Hardcode Strings

```tsx
// ❌ BAD - Never do this
const BadComponent = () => {
  return (
    <div>
      <h1>Welcome to the app</h1>
      <button>Click me</button>
      <p>Hello world</p>
    </div>
  );
};
```

### ✅ Always Use Translation Keys

```tsx
// ✅ GOOD - Always do this
import useAppTranslation from '@/hooks/useAppTranslation';

const GoodComponent = () => {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('WelcomePage.title')}</h1>
      <button>{t('Common.clickMe')}</button>
      <p>{t('Common.helloWorld')}</p>
    </div>
  );
};
```

## Translation Key Naming Conventions

### Organize by Feature/Page

```json
{
  "Common": {
    "save": "Save",
    "cancel": "Cancel",
    "loading": "Loading...",
    "error": "An error occurred",
    "submit": "Submit",
    "submitting": "Submitting...",
    "reset": "Reset",
    "show": "Show",
    "hide": "Hide"
  },
  "HomePage": {
    "title": "Welcome to the Application",
    "subtitle": "Get started with modern web development"
  },
  "UserProfile": {
    "title": "User Profile",
    "editButton": "Edit Profile",
    "saveChanges": "Save Changes"
  },
  "Form": {
    "validation": {
      "required": "This field is required",
      "email": "Please enter a valid email",
      "minLength": "Must be at least {{count}} characters"
    }
  }
}
```

### Naming Patterns
- Use **PascalCase** for namespaces: `HomePage`, `UserProfile`, `ContactForm`
- Use **camelCase** for keys: `title`, `submitButton`, `errorMessage`
- Use **descriptive names**: `deleteConfirmation` not `confirm`
- **Group related keys**: `Form.validation.required`, `Form.validation.email`

## Dynamic Content and Interpolation

### Variable Interpolation

```tsx
// Translation file (en-US.json)
{
  "UserGreeting": {
    "welcome": "Welcome back, {{name}}!",
    "itemCount": "You have {{count}} item",
    "itemCount_other": "You have {{count}} items"
  }
}

// Component usage
const UserDashboard = ({ user, items }: Props) => {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('UserGreeting.welcome', { name: user.name })}</h1>
      <p>{t('UserGreeting.itemCount', { count: items.length })}</p>
    </div>
  );
};
```

### Conditional Content

```tsx
const StatusBadge = ({ status }: { status: 'active' | 'inactive' | 'pending' }) => {
  const { t } = useAppTranslation();

  const statusKey = `Status.${status}` as const;
  const colorClass = status === 'active' ? 'text-green-500' :
                    status === 'inactive' ? 'text-red-500' : 'text-yellow-500';

  return (
    <span className={colorClass}>
      {t(statusKey)}
    </span>
  );
};
```

## Form Labels and Validation with i18n

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAppTranslation from '@/hooks/useAppTranslation';

const ContactForm = () => {
  const { t } = useAppTranslation();

  const schema = z.object({
    name: z.string().min(2, t('Form.validation.nameMinLength')),
    email: z.string().email(t('Form.validation.invalidEmail')),
    message: z.string().min(10, t('Form.validation.messageMinLength')),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>{t('ContactForm.name')}</label>
        <input {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>{t('ContactForm.email')}</label>
        <input {...register('email')} type="email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>{t('ContactForm.message')}</label>
        <textarea {...register('message')} />
        {errors.message && <span>{errors.message.message}</span>}
      </div>

      <button type="submit">{t('ContactForm.submit')}</button>
    </form>
  );
};
```

## Testing with i18n

All templates include a mock for react-i18next in `setupTests.ts`. Tests should expect **translation keys**, not translated text.

```typescript
// setupTests.ts - included in all templates
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (i18nKey: string) => i18nKey, // Returns the key for validation
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
}));

// Test expects translation keys, not translated text
test('displays form validation error', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await user.click(screen.getByText('ContactForm.submit'));

  expect(screen.getByText('Form.validation.nameRequired')).toBeInTheDocument();
});
```

## Locale Detection Configuration

Templates implement locale detection in this order:

1. Query string (`?lng=en-US`)
2. Domain-based detection (`.ca` domain → `en-CA`)
3. Cookie storage
4. localStorage persistence (`i18nextLng`)
5. Browser navigator language
6. HTML tag language attribute

```typescript
// i18next.client.ts
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enUS from './locales/en-US.json';
import enCA from './locales/en-CA.json';

const languageDetector = new LanguageDetector();

languageDetector.addDetector({
  name: 'domain',
  lookup() {
    const host = window.location.host;
    if (host.includes('.ca')) {
      return 'en-CA';
    }
    return 'en-US';
  },
  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  },
});

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['querystring', 'domain', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    },
    fallbackLng: 'en-US',
    resources: {
      'en-US': { translation: enUS },
      'en-CA': { translation: enCA },
    },
  });

export default i18next;
```

## Type-Safe Translation Hook

```typescript
// hooks/useAppTranslation.ts
import { useTranslation } from 'react-i18next';
import type enUS from '../i18n/locales/en-US.json';

// Generate type from translation keys
type TranslationKeys = keyof typeof enUS;

export default function useAppTranslation() {
  return useTranslation();
}
```

## SSR Considerations

For server-side rendering, i18n must be initialized on the server side:

```typescript
// i18next.server.ts
import i18next from 'i18next';
import { enUS, enCA } from './locales';

export async function initI18nServer(locale: string) {
  if (!i18next.isInitialized) {
    await i18next.init({
      lng: locale,
      fallbackLng: 'en-US',
      resources: {
        'en-US': { translation: enUS },
        'en-CA': { translation: enCA },
      },
    });
  }
  return i18next;
}
```

## Adding New Translation Keys

When adding new user-facing text:

1. Add the key to `en-US.json` (primary locale)
2. Add the same key to all other locale files (e.g., `en-CA.json`)
3. Use the key in the component with `t('Namespace.keyName')`
4. Run `pnpm lint` to verify no hardcoded strings

```bash
# Check for any hardcoded strings
pnpm lint

# Verify all keys exist in all locale files
pnpm typecheck
```

## Best Practices

- **Type-safe translations**: Generate TypeScript types from translation files to catch missing keys at compile time
- **Namespace organization**: Organize translations by feature or page to avoid conflicts
- **Pluralization support**: Use i18next's `_other` suffix for proper plural forms
- **Context-aware translations**: Provide context to translators through descriptive key names
- **Lazy loading**: Load translation bundles on-demand for better performance
- **RTL support**: Consider right-to-left languages in CSS layout design
- **Fallback language**: Always configure `fallbackLng` so missing keys gracefully fall back

## Next Steps

After implementing i18n:
1. Run `pnpm lint` to ensure the `i18next/no-literal-string` rule passes
2. Use `quality-analysis` skill to add tests that validate translation keys
3. Use `implementation-engineering` skill for feature implementation with i18n integrated
