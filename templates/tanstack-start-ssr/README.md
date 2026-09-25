# TanStack Start SSR Template

A server-rendered React starter using TanStack Start and TanStack Router. It includes examples for data loading, server functions, forms, internationalization, API mocking, and automated tests.

## Prerequisites

- Node.js 24 or newer (`.nvmrc` currently selects the latest LTS release)
- pnpm 11 or newer
- Git, if you plan to use the included setup script

The setup script supports macOS and major Linux distributions. On Windows, use WSL2 with a supported Linux distribution.

## Get started

From the generated project directory, run the setup script:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

The script checks or installs Git, NVM, Node.js, and pnpm as needed; creates `.env` from `.env.example` if it does not exist; installs dependencies and Playwright browsers; initializes Git hooks when run inside a Git repository; and initializes the MSW service worker in `public/`. It may need `sudo` to install system packages on Linux. If Playwright browser installation fails, the script continues; install browsers later with `pnpm exec playwright install`.

Then start the development server:

```bash
pnpm dev
```

Open <http://localhost:3000>. The home page links to examples for TanStack Query, React Hook Form with Zod, and a kitchen-sink page.

### Manual setup

If you already have the required Node.js and pnpm versions installed:

```bash
cp .env.example .env
pnpm install
pnpm exec playwright install
pnpm exec msw init public/ --save
pnpm dev
```

Playwright's `--with-deps` option may also be needed on Linux to install operating-system browser dependencies.

## Environment and API mocking

The checked-in `.env.example` contains the required client environment values:

```dotenv
VITE_APP_ENVIRONMENT=dev
VITE_APP_MSW_ENABLED=false
```

`VITE_APP_ENVIRONMENT` accepts `dev`, `qa`, `staging`, or `prod`. `VITE_APP_MSW_ENABLED` accepts `true` or `false`; set it to `true` to start the browser MSW worker during app startup. Keep `.env` local; it is ignored by Git. These `VITE_` values are included in client-side code, so do not put secrets in them.

The Playwright integration suite configures MSW through its test fixture in `playwright/integration/extensions.ts`, independently of the app's browser-worker setting. The end-to-end example exercises the live sample API. Add or change request handlers in `mocks/handlers/` and the browser worker setup in `mocks/worker.ts` when adapting the starter.

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the SSR development server on port 3000 |
| `pnpm build` | Create the production build with Vite |
| `pnpm start` | Preview the build locally on port 3000 (`vite preview`) |
| `pnpm test` | Run unit tests once with Vitest |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm test:coverage` | Run Vitest with coverage |
| `pnpm playwright:run-integration` | Run Playwright tests in `playwright/integration/` |
| `pnpm playwright:run-e2e` | Run Playwright tests in `playwright/e2e/` |
| `pnpm playwright:ui` | Open the Playwright UI |
| `pnpm playwright:debug` | Run Playwright in debug mode |
| `pnpm playwright:codegen` | Launch Playwright code generation |
| `pnpm lint` | Lint app and Playwright files |
| `pnpm lint:fix` | Lint and apply automatic fixes |
| `pnpm bundlesize` | Check configured bundle-size limits |

Playwright's configuration starts `pnpm dev` automatically and runs Chromium, Firefox, and WebKit projects. Browsers must be installed before running the suites. The integration and end-to-end suites are separate; both use the configured local server at `http://localhost:3000`.

## Project structure

```text
app/
  components/       Shared app and UI components
  hooks/            React hooks
  i18n/             i18next setup and locale data
  routes/           File-based TanStack Router routes and colocated tests
  services/         API clients, server functions, and query definitions
  styles/           Global styles
  types/            Shared TypeScript types
  utils/            Helpers and test utilities
mocks/              MSW browser and server handlers
playwright/
  e2e/              End-to-end tests
  integration/      Browser integration tests
public/             Static assets and MSW service worker
scripts/            Project setup script
```

TanStack Start uses file-based routes under `app/routes/`. The generated `app/routeTree.gen.ts` is maintained by the router tooling; add route files rather than editing that generated file directly.

## Build and deployment

Build and locally preview the application with:

```bash
pnpm build
pnpm start
```

`pnpm start` runs Vite's preview server. Use it to inspect the built app locally; it is not a production hosting server. This template does not include a deployment adapter or provider configuration. For deployment, choose a runtime supported by TanStack Start, configure its deployment integration for that host, and use the provider's build and start requirements. Ensure the required environment values are set in the deployment environment, with browser MSW disabled for production unless intentionally needed.

## Included examples

- File-based routing with TanStack Router and SSR
- TanStack Query data loading and server functions
- React Hook Form and Zod validation
- i18next locale setup
- Tailwind CSS and reusable UI components
- Vitest, Testing Library, MSW, and Playwright
