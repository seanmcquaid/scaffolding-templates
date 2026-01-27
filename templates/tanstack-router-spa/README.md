# TanStack Router SPA Template

A modern, production-ready template for building single-page applications with TanStack Router, featuring file-based routing, superior TypeScript integration, type-safe i18n, comprehensive testing, and excellent developer experience.

## ✨ Features

- **🔄 TanStack Router** - Type-safe file-based routing with automatic route generation
- **🎯 Superior TypeScript** - Best-in-class TypeScript integration with route-level type safety
- **📁 File-Based Routing** - Intuitive file-system based route generation
- **🌍 Internationalization** - Type-safe i18n with `useAppTranslation` hook and mandatory translations
- **🔍 Type Safety** - Strict TypeScript configuration with comprehensive type checking
- **🧪 Comprehensive Testing** - Vitest + Testing Library + MSW for mocking + Playwright for E2E
- **🎨 Modern Styling** - Tailwind CSS + shadcn/ui component library
- **📊 State Management** - TanStack Query + React Hook Form + usehooks-ts
- **📋 Code Quality** - ESLint + Prettier with pre-commit hooks via Husky
- **🚀 Performance** - Bundle size monitoring and Lighthouse integration
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
├── src/                    # Application source code
│   ├── components/         # Reusable components
│   │   ├── app/           # Feature-specific components
│   │   └── ui/            # UI/design system components
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization setup
│   ├── routes/            # File-based route definitions
│   ├── services/          # API clients and business logic
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── styles/            # Global styles and Tailwind CSS
├── public/                # Static assets
├── playwright/            # End-to-end and integration tests
│   ├── e2e/              # End-to-end tests
│   └── integration/      # Integration tests
├── mocks/                 # MSW API mocks
└── docs/                  # Project documentation
```

## 🛠️ Available Scripts

### Development

| Script       | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm serve` | Preview production build |

### Testing & Quality

| Script                            | Description                  |
| --------------------------------- | ---------------------------- |
| `pnpm test`                       | Run unit tests               |
| `pnpm test:watch`                 | Run tests in watch mode      |
| `pnpm test:coverage`              | Run tests with coverage      |
| `pnpm playwright:run-integration` | Run integration tests        |
| `pnpm playwright:run-e2e`         | Run end-to-end tests         |
| `pnpm playwright:ui`              | Run Playwright in UI mode    |
| `pnpm lint`                       | Lint source code             |
| `pnpm lint:fix`                   | Lint and auto-fix issues     |
| `pnpm typecheck`                  | Check TypeScript types       |
| `pnpm bundlesize`                 | Check bundle size            |

### AI Workflows (Ralph)

Ralph is an autonomous AI agent loop that runs coding tools (Amp or Claude Code) to complete tasks defined in `prd.json`.

| Script              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `pnpm ralph`        | Run Ralph with default settings (Amp, 10 iterations) |
| `pnpm ralph:amp`    | Run Ralph with Amp                                   |
| `pnpm ralph:claude` | Run Ralph with Claude Code                           |

**Usage:**
1. Create a `prd.json` file in the template root (see `scripts/prd.json.example`)
2. Run `pnpm ralph` or `pnpm ralph 20` for more iterations
3. Ralph will autonomously complete user stories defined in the PRD

> See [OSS Ralph Documentation](https://github.com/snarktank/ralph) for more information.

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

### Lighthouse Integration

- Performance testing with Lighthouse
- Automated accessibility and performance audits
- Integration with Playwright for CI/CD pipelines

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

1. Create route files in `src/routes/` following TanStack Router conventions
2. Routes are automatically generated based on file structure
3. Leverage type-safe route parameters and search params
4. Add navigation and translations as needed

Example route structure:

```
src/routes/
├── __root.tsx          # Root layout
├── index.tsx           # Home page (/)
├── about.tsx           # About page (/about)
└── posts/
    ├── index.tsx       # Posts list (/posts)
    └── $id.tsx         # Individual post (/posts/$id)
```

### Creating Components

1. **UI Components** - Place in `src/components/ui/`
2. **Feature Components** - Place in `src/components/app/`
3. Write tests alongside components
4. Use `useAppTranslation` for all user-facing text

### Route-Level Features

1. **Type-Safe Parameters** - Automatic TypeScript inference for route params
2. **Search Params** - Type-safe search parameter handling
3. **Route Guards** - Authentication and authorization at route level
4. **Loaders & Actions** - Data fetching patterns with TanStack Query

### API Integration

1. Define types in `src/types/`
2. Create API clients in `src/services/`
3. Use TanStack Query for data fetching
4. Mock APIs with MSW for testing

## 🚀 Production Build

```bash
# Build the application
pnpm build

# Preview the build locally
pnpm serve
```

The build is optimized for:

- Code splitting and lazy loading
- Bundle size optimization with analysis
- Modern JavaScript features
- Static asset optimization
- Lighthouse performance targets

## 📖 Documentation

Comprehensive guides are available in the `docs/` folder:

- **File Structure** - Detailed project organization
- **State Management** - Advanced patterns and examples
- **Testing Strategy** - Complete testing guide
- **Deployment** - Production deployment options
- **Styling Guide** - Component and design system usage
