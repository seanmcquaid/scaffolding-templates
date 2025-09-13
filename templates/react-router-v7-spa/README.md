# React Router V7 SPA Template

A modern, production-ready template for building single-page applications with React Router V7, featuring type-safe i18n, comprehensive testing, and excellent developer experience.

## ✨ Features

- **🔄 React Router V7** - Latest React Router with SPA mode and type-safe routing
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
- Initialize MSW service worker for API mocking

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
├── app/                    # Application source code
│   ├── components/         # Reusable components
│   │   ├── app/           # Feature-specific components
│   │   └── ui/            # UI/design system components
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization setup
│   ├── routes/            # Application routes
│   ├── services/          # API clients and business logic
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
├── playwright/            # End-to-end tests
└── docs/                  # Project documentation
```

## 🛠️ Available Scripts

| Script                            | Description              |
| --------------------------------- | ------------------------ |
| `pnpm dev`                        | Start development server |
| `pnpm build`                      | Build for production     |
| `pnpm start`                      | Preview production build |
| `pnpm test`                       | Run unit tests           |
| `pnpm test:watch`                 | Run tests in watch mode  |
| `pnpm test:coverage`              | Run tests with coverage  |
| `pnpm lint`                       | Lint source code         |
| `pnpm lint:fix`                   | Lint and auto-fix issues |
| `pnpm bundlesize`                 | Check bundle size        |
| `pnpm playwright:run-integration` | Run integration tests    |
| `pnpm playwright:run-e2e`         | Run end-to-end tests     |

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

1. Add translation keys to `app/i18n/locales/en-US.ts`
2. TypeScript will enforce type safety for all translation keys
3. ESLint prevents hardcoded strings in components

## 🧪 Testing Strategy

The template implements a **3-tier testing approach**:

### 1. Unit Tests

```bash
# Run unit tests for components, hooks, utilities
pnpm test
```

### 2. Integration Tests

```bash
# Test component interactions with mocked APIs using Playwright
pnpm playwright:run-integration
```

### 3. End-to-End Tests

```bash
# Test complete user flows with Playwright
pnpm playwright:run-e2e
```

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

### Adding New Routes

1. Create route files in `app/routes/`
2. Use React Router V7 file-based routing conventions
3. Add navigation and translations as needed

### Creating Components

1. **UI Components** - Place in `app/components/ui/`
2. **Feature Components** - Place in `app/components/app/`
3. Write tests alongside components
4. Use `useAppTranslation` for all user-facing text

### API Integration

1. Define types in `app/types/`
2. Create API clients in `app/services/`
3. Use TanStack Query for data fetching
4. Mock APIs with MSW for testing

## 🚀 Production Build

```bash
# Build the application
pnpm build

# Preview the build locally
pnpm start
```

The build is optimized for:

- Code splitting and lazy loading
- Bundle size optimization
- Modern JavaScript features
- Static asset optimization

## 📖 Documentation

Comprehensive guides are available in the `docs/` folder:

- **File Structure** - Detailed project organization
- **State Management** - Advanced patterns and examples
- **Testing Strategy** - Complete testing guide
- **Deployment** - Production deployment options
- **Styling Guide** - Component and design system usage
