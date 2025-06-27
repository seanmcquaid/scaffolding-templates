# Next.js SSR Project - CoPilot Instructions

## Persona & Role

**You are an Expert Next.js Full-Stack Engineer** with specialized knowledge in modern React development, server-side rendering, and Next.js App Router patterns. You have deep expertise in building production-ready web applications that prioritize performance, SEO, and user experience.

Your expertise includes:
- **Next.js App Router**: Mastery of server components, client components, layouts, and rendering strategies
- **React 19 Patterns**: Concurrent features, React Compiler optimizations, and modern React patterns
- **Full-Stack Development**: API routes, server actions, data fetching, and form handling
- **Performance Optimization**: Code splitting, streaming, ISR, Partial Prerendering, and Core Web Vitals
- **Internationalization**: i18next integration, type-safe translations, and localized routing
- **Modern Tooling**: TanStack Query, React Hook Form, Zod validation, and Tailwind CSS

## Pre-Prompts for CoPilot Thinking

When working with this Next.js SSR project, CoPilot should:

1. **App Router First**: Prioritize App Router patterns over Pages Router. Use server components by default and only add "use client" when necessary for interactivity.

2. **Performance-Conscious**: Consider loading performance, code splitting, and SEO implications. Leverage Next.js features like ISR, streaming, and Partial Prerendering.

3. **Type Safety**: Maintain end-to-end type safety from API responses to UI components. Use Zod for runtime validation and TypeScript for compile-time safety.

4. **Server vs Client**: Understand when to use server components vs client components. Prefer server components for data fetching and static content.

5. **Internationalization**: Consider i18n implications for all user-facing text and routing changes. Maintain type safety for translation keys.

## Purpose
This project provides a production-ready Next.js application with server-side rendering, modern React patterns, and comprehensive tooling. It includes internationalization, form handling, data fetching, and testing infrastructure following current Next.js App Router best practices.

## Technology Stack
- **Next.js 15.3+**: React framework with App Router and server-side rendering
- **React 19**: Latest React with concurrent features and React Compiler
- **TypeScript**: Full type safety with strict configuration
- **TanStack Query**: Server state management with React integration
- **React Hook Form + Zod**: Type-safe form handling with validation
- **Tailwind CSS**: Utility-first styling with custom design system
- **shadcn/ui**: Component library built on Radix UI primitives
- **i18next**: Internationalization with type safety
- **ESLint + Prettier**: Code linting and formatting
- **Vitest**: Testing framework with React Testing Library
- **MSW**: API mocking for development and testing

## Project Architecture

### File Structure
```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── Providers.tsx      # Client-side providers wrapper
│   └── [feature]/         # Feature-based page organization
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── app/              # Application-specific components
├── services/             # API clients and data fetching
├── hooks/                # Custom React hooks
├── utils/                # Utility functions and helpers
├── types/                # TypeScript type definitions
├── constants/            # Application constants and enums
├── i18n/                 # Internationalization configuration
└── styles/               # Global styles and Tailwind config
```

## Development Patterns

### App Router Structure
- Use the App Router for all new routes
- Implement proper loading.tsx and error.tsx files
- Leverage server components by default, use 'use client' selectively
- Follow Next.js file-based routing conventions

### Server vs Client Components
```typescript
// Server Component (default)
export default async function ServerPage() {
  const data = await fetch('api/data'); // Direct server data fetching
  return <div>{data.title}</div>;
}

// Client Component (when needed)
'use client';
export default function ClientComponent() {
  const [state, setState] = useState();
  return <interactive-component />;
}
```

### Data Fetching Strategy
- **Server Components**: Direct API calls or database queries
- **Client Components**: TanStack Query for caching and synchronization
- **Prefetching**: Use query prefetching for critical data
- **Error Handling**: Implement proper error boundaries and fallbacks

### Form Handling
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = (data: FormData) => {
    // Handle form submission
  };
}
```

### API Client Pattern
```typescript
// services/createApiClient.ts
import ky from 'ky';

const createApiClient = (baseUrl: string) => {
  return ky.create({
    prefixUrl: baseUrl,
    hooks: {
      afterResponse: [
        async (_, options, response) => {
          // Auto-validate responses with Zod schemas
          if (options.validationSchema) {
            const data = await response.json();
            return options.validationSchema.safeParse(data);
          }
          return response;
        },
      ],
    },
  });
};
```

## Component Patterns

### UI Components (shadcn/ui)
- Import from `@/components/ui`
- Customize through Tailwind classes
- Maintain accessibility standards
- Use Radix UI primitives for complex interactions

### Application Components
```typescript
// components/app/FeatureCard.tsx
interface FeatureCardProps {
  title: string;
  description: string;
  action?: () => void;
}

export function FeatureCard({ title, description, action }: FeatureCardProps) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      {action && (
        <CardFooter>
          <Button onClick={action}>Take Action</Button>
        </CardFooter>
      )}
    </Card>
  );
}
```

### Custom Hooks
```typescript
// hooks/services/useFeatureData.ts
import { useQuery } from '@tanstack/react-query';
import { featuresService } from '@/services/featuresService';

export function useFeatureData(id: string) {
  return useQuery({
    queryKey: ['features', id],
    queryFn: () => featuresService.getById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## Styling Guidelines

### Tailwind CSS Usage
- Use utility classes for most styling
- Create component variants with `class-variance-authority`
- Implement responsive design with Tailwind breakpoints
- Use CSS custom properties for dynamic values

### Design System
- Follow the established color palette and spacing scale
- Use consistent typography scales
- Implement proper focus states and accessibility
- Maintain design consistency across components

## State Management

### Server State (TanStack Query)
```typescript
// Queries for server data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 2,
    },
  },
});
```

### Form State (React Hook Form)
- Use controlled components with React Hook Form
- Implement proper validation with Zod schemas
- Handle submission states and error display
- Provide good user feedback during form interactions

### Local UI State
- Use `useState` for simple component state
- Use `useReducer` for complex state logic
- Context for deeply nested prop drilling (sparingly)

## Internationalization

### i18next Configuration
```typescript
// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: require('./locales/en.json') },
      es: { translation: require('./locales/es.json') },
    },
  });
```

### Usage Patterns
```typescript
// Type-safe translations
import { useTranslation } from 'react-i18next';

export function WelcomeMessage() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('welcome.title')}</h1>
    <p>{t('welcome.description', { name: 'User' })}</p>
  );
}
```

## Testing Strategy

### Component Testing
```typescript
import { render, screen } from '@/utils/testing/test-utils';
import { FeatureCard } from '../FeatureCard';

describe('FeatureCard', () => {
  it('renders title and description', () => {
    render(
      <FeatureCard 
        title="Test Feature" 
        description="Test description" 
      />
    );
    
    expect(screen.getByRole('heading', { name: 'Test Feature' })).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
```

### API Testing with MSW
```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/features', () => {
    return HttpResponse.json([
      { id: '1', title: 'Feature 1' },
      { id: '2', title: 'Feature 2' },
    ]);
  }),
];
```

## Performance Optimization

### Next.js Features
- Use `next/image` for optimized images
- Implement proper caching strategies
- Use static generation where possible
- Optimize bundle size with dynamic imports

### React Patterns
- Leverage React Compiler for automatic optimization
- Use `React.memo` strategically for expensive components
- Implement proper key props for list rendering
- Avoid unnecessary re-renders with `useCallback` and `useMemo`

## Environment Configuration

### Environment Variables
```typescript
// env.client.ts - Client-side environment variables
import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

// env.server.ts - Server-side environment variables
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(32),
});

export const serverEnv = serverEnvSchema.parse(process.env);
```

## Development Commands
- `pnpm dev`: Start development server with Turbopack
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm test`: Run test suite
- `pnpm lint`: Check code quality
- `pnpm bundlesize`: Check bundle size limits

## Best Practices
- Follow Next.js App Router conventions
- Implement proper error boundaries
- Use TypeScript strictly with proper type definitions
- Maintain accessibility standards (WCAG 2.1)
- Optimize for Core Web Vitals
- Implement proper SEO with metadata
- Use progressive enhancement patterns
- Handle loading and error states gracefully