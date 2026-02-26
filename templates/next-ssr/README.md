# Next SSR Template

A modern, production-ready template for building server-side rendered applications with Next.js 15, featuring React 19, React Compiler, type-safe i18n, comprehensive testing, and excellent developer experience.

## ✨ Features

- **🚀 Next.js 15** - Latest Next.js with App Router, Server Components, and RSC patterns
- **⚛️ React 19** - Latest React with React Compiler for automatic optimizations
- **⚡ Turbopack** - Ultra-fast bundler for lightning-quick development
- **🌍 Internationalization** - Type-safe i18n with `useAppTranslation` hook and mandatory translations
- **🔍 Type Safety** - Strict TypeScript configuration with comprehensive type checking
- **🧪 Comprehensive Testing** - Vitest + Testing Library + MSW for mocking + Playwright for E2E
- **🎨 Modern Styling** - Tailwind CSS + shadcn/ui component library
- **📊 State Management** - TanStack Query + React Hook Form + usehooks-ts
- **📋 Code Quality** - ESLint + Prettier with pre-commit hooks via Husky
- **🚀 Performance** - Bundle size monitoring and modern build optimizations
- **♿ Accessibility** - Built-in accessibility best practices and testing

## 🚀 Quick Start

### Automated Setup (Recommended)

Run the setup script to automatically configure everything:

```bash
# Make the setup script executable and run it
chmod +x setup.sh && ./setup.sh
```

This script will:

- Install pnpm if not already available
- Copy `.env.example` to `.env` for environment configuration
- Validate environment variables and warn about example values
- Install all dependencies
- Install Playwright browsers for testing

> **ℹ️ Note:** The `setup.sh` script will automatically install **git**, **nvm**, and **pnpm** if they are not already available on your system (macOS and Linux supported). You may still install them manually if you prefer.

### Prerequisites (for Manual Setup)

- **git** (version control)
- **nvm** (Node Version Manager)
- **Node.js** >=22.12.0
- **pnpm** (recommended package manager)

### Manual Installation

```bash
# Copy environment file
cp .env.example .env

# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install

# Start development server
pnpm dev
```

## 📂 Project Structure

```
├── src/                    # Application source code
│   ├── app/               # Next.js App Router pages and layouts
│   │   ├── react-query/   # React Query demo pages
│   │   ├── react-hook-form-zod/ # Form handling examples
│   │   └── kitchen-sink/  # Feature showcase
│   ├── components/        # Reusable components
│   │   ├── app/          # Feature-specific components
│   │   └── ui/           # UI/design system components
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization setup
│   ├── services/         # API clients and business logic
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── styles/           # Global styles and Tailwind CSS
├── public/               # Static assets
├── mocks/                # MSW API mocks
└── docs/                 # Project documentation
```

## 🛠️ Available Scripts

### Development

| Script                | Description                             |
| --------------------- | --------------------------------------- |
| `pnpm dev`            | Start development server with Turbopack |
| `pnpm build`          | Build for production                    |
| `pnpm start`          | Start production server                 |

### Testing & Quality

| Script                            | Description                  |
| --------------------------------- | ---------------------------- |
| `pnpm test`                       | Run unit tests               |
| `pnpm test:watch`                 | Run tests in watch mode      |
| `pnpm test:coverage`              | Run tests with coverage      |
| `pnpm playwright:run-integration` | Run integration tests        |
| `pnpm playwright:run-e2e`         | Run end-to-end tests         |
| `pnpm lint`                       | Lint source code             |
| `pnpm lint:fix`                   | Lint and auto-fix issues     |
| `pnpm typecheck`                  | Check TypeScript types       |
| `pnpm bundlesize`                 | Check bundle size            |


## 🌍 Internationalization

This template enforces **mandatory internationalization** with type-safe translation keys:

### Using Translations

```tsx
import useAppTranslation from '@/hooks/useAppTranslation';

const MyComponent = () => {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('HomePage.title')}</h1>
      <p>{t('HomePage.description')}</p>
    </div>
  );
};
```

### Adding Translations

1. Add translation keys to `src/i18n/locales/en-US.ts`
2. TypeScript will enforce type safety for all translation keys
3. ESLint prevents hardcoded strings in components

## 🧪 Testing Strategy

The template implements a comprehensive testing approach:

### Unit Tests

```bash
# Run unit tests for components, hooks, utilities
pnpm test
```

### Server Component Testing

```bash
# Test RSC components with proper Next.js context
pnpm test
```

### API Mocking

- MSW (Mock Service Worker) for API route testing
- Mocks defined in `mocks/handlers/`

## 📊 State Management

The template follows a **hierarchical state management approach**:

- **URL State** - For shareable application state (search, filters)
- **Local Storage** - For user preferences (theme, settings)
- **Component State** - For UI state (modals, forms)
- **TanStack Query** - For server state management
- **React Hook Form** - For form state and validation

## 🎨 Styling & Components

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible components
- **CVA** - Component variant management
- **Responsive Design** - Mobile-first approach

## 🔧 Development Workflow

### Adding New Pages

1. Create page files in `src/app/` following App Router conventions
2. Use Server Components by default, Client Components when needed
3. Implement proper loading states and error boundaries
4. Add navigation and translations as needed

### Creating Components

1. **UI Components** - Place in `src/components/ui/`
2. **Feature Components** - Place in `src/components/app/`
3. Write tests alongside components
4. Use `useAppTranslation` for all user-facing text

### Server Component Patterns

1. **Server Components** - Use for data fetching and static content
2. **Client Components** - Use for interactivity and browser APIs
3. **Streaming** - Implement with Suspense boundaries
4. **RSC Patterns** - Follow Server/Client component composition

### API Integration

1. Define types in `src/types/`
2. Create API clients in `src/services/`
3. Use TanStack Query for data fetching
4. Mock APIs with MSW for testing

## 🚀 Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

The build is optimized for:

- Server-side rendering and static generation
- Code splitting and lazy loading
- Bundle size optimization
- Modern JavaScript features
- React Compiler optimizations

## 📖 Documentation

Comprehensive guides are available in the `docs/` folder:

- **File Structure** - Detailed project organization
- **State Management** - Advanced patterns and examples
- **Testing Strategy** - Complete testing guide
- **Deployment** - Production deployment options
- **Styling Guide** - Component and design system usage
