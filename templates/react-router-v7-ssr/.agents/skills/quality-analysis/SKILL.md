---
name: quality-analysis
description: Creates comprehensive tests following the three-tier testing strategy. Expert in unit tests, integration tests with MSW, and E2E tests with Playwright.
---

# Quality Analysis

Ensure code quality through comprehensive testing strategies and quality assurance practices.

## When to Use

Use this skill when you need to:
- Create unit tests for components and utilities
- Write integration tests with mocked APIs
- Develop E2E tests for user flows
- Improve test coverage
- Debug failing tests
- Define testing strategies

## Three-Tier Testing Strategy

### Overview
Every non-trivial change requires tests at the appropriate tier:
1. **Unit tests** — for components, hooks, and utilities in isolation
2. **Integration tests with mocked APIs (MSW)** — for happy path flows; due to MSW limitations with server-side requests, run the app with the MSW server alongside it when testing SSR loaders
3. **End-to-end tests with real APIs (Playwright)** — for high-level user flows; these are slow and potentially brittle, so run them in CI/CD after successful deploy, NOT in PR checks

### 1. Unit Tests (Vitest + Testing Library)
Test individual components, hooks, and utilities in isolation.

**When to use:**
- Component rendering and props
- Hook behavior and state management
- Utility function logic
- Edge cases and error handling
- If a component navigates to another page and you want to test behavior after navigation, test that in an integration test instead

**Example:**
```typescript
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. Integration Tests (MSW + Testing Library)
Test feature workflows with mocked API responses.

**When to use:**
- Data fetching and display
- Form submissions
- Multi-component interactions
- Happy path user flows

**Example:**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { UserProfile } from './UserProfile';

describe('UserProfile Integration', () => {
  it('fetches and displays user data', async () => {
    server.use(
      http.get('/api/users/:id', () => {
        return HttpResponse.json({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        });
      })
    );

    render(<UserProfile userId="1" />);
    
    expect(screen.getByText('Common.loading')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    server.use(
      http.get('/api/users/:id', () => {
        return HttpResponse.json(
          { error: 'Not found' },
          { status: 404 }
        );
      })
    );

    render(<UserProfile userId="1" />);
    
    await waitFor(() => {
      expect(screen.getByText('Common.error')).toBeInTheDocument();
    });
  });

  it('updates user data on form submit', async () => {
    const user = userEvent.setup();
    
    server.use(
      http.get('/api/users/:id', () => {
        return HttpResponse.json({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        });
      }),
      http.patch('/api/users/:id', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({
          id: '1',
          ...body,
        });
      })
    );

    render(<UserProfile userId="1" />);
    
    await waitFor(() => screen.getByText('John Doe'));
    
    await user.click(screen.getByText('UserProfile.editButton'));
    await user.clear(screen.getByLabelText('UserProfile.name'));
    await user.type(screen.getByLabelText('UserProfile.name'), 'Jane Doe');
    await user.click(screen.getByText('UserProfile.saveButton'));
    
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });
});
```

### 3. End-to-End Tests (Playwright)
Test complete user flows with real browser and API.

**When to use:**
- Critical user journeys
- Multi-page workflows
- Authentication flows
- Production-like scenarios

**Example:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('User Profile E2E', () => {
  test('user can view and edit profile', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    
    // Verify profile loads
    await expect(page.getByRole('heading', { name: 'John Doe' })).toBeVisible();
    
    // Click edit button
    await page.getByRole('button', { name: /edit/i }).click();
    
    // Edit name
    await page.getByLabel(/name/i).fill('Jane Doe');
    
    // Save changes
    await page.getByRole('button', { name: /save/i }).click();
    
    // Verify success message
    await expect(page.getByText(/saved successfully/i)).toBeVisible();
    
    // Verify updated name
    await expect(page.getByRole('heading', { name: 'Jane Doe' })).toBeVisible();
  });

  test('validates form fields', async ({ page }) => {
    await page.goto('/profile');
    await page.getByRole('button', { name: /edit/i }).click();
    
    // Clear required field
    await page.getByLabel(/email/i).clear();
    
    // Try to save
    await page.getByRole('button', { name: /save/i }).click();
    
    // Verify validation error
    await expect(page.getByText(/email is required/i)).toBeVisible();
  });
});
```

## Testing Best Practices

### Test Structure (AAA Pattern)
```typescript
describe('ComponentName', () => {
  it('should describe expected behavior', () => {
    // Arrange: Set up test data and dependencies
    const props = { value: 'test' };
    
    // Act: Perform the action
    render(<Component {...props} />);
    
    // Assert: Verify the result
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

### Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Testing Hooks
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from './useUser';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useUser', () => {
  it('fetches user data', async () => {
    const { result } = renderHook(() => useUser('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      id: '1',
      name: 'John Doe',
    });
  });
});
```

### Testing i18n Components
```typescript
// setupTests.ts includes this mock
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Returns translation key for validation
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
}));

// Test expects translation keys
describe('UserProfile', () => {
  it('displays translated title', () => {
    render(<UserProfile userId="1" />);
    
    // Expect translation key, not translated text
    expect(screen.getByText('UserProfile.title')).toBeInTheDocument();
  });
});
```

### Testing Forms
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(screen.getByText('Form.validation.emailRequired')).toBeInTheDocument();
    expect(screen.getByText('Form.validation.passwordRequired')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(screen.getByText('Form.validation.invalidEmail')).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

## Test Coverage Goals

### Coverage Targets
- **Overall**: 80%+ code coverage
- **Critical paths**: 100% coverage
- **UI components**: 90%+ coverage
- **Utilities**: 100% coverage
- **Hooks**: 90%+ coverage

### Coverage Commands
```bash
# Run tests with coverage
pnpm test:coverage

# View coverage report
open coverage/index.html
```

## MSW Setup

### Server Setup
```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'John Doe',
      email: 'john@example.com',
    });
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: '123',
      ...body,
    }, { status: 201 });
  }),
];

// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// setupTests.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Playwright Configuration

### Test Organization
```
e2e/
  auth/
    login.spec.ts
    signup.spec.ts
  user/
    profile.spec.ts
    settings.spec.ts
  common/
    navigation.spec.ts
```

### Fixtures and Page Objects
```typescript
// fixtures/user.ts
import { Page } from '@playwright/test';

export class UserPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/profile');
  }

  async editProfile() {
    await this.page.getByRole('button', { name: /edit/i }).click();
  }

  async fillName(name: string) {
    await this.page.getByLabel(/name/i).fill(name);
  }

  async save() {
    await this.page.getByRole('button', { name: /save/i }).click();
  }
}

// Use in tests
test('user can edit profile', async ({ page }) => {
  const userPage = new UserPage(page);
  await userPage.goto();
  await userPage.editProfile();
  await userPage.fillName('Jane Doe');
  await userPage.save();
});
```

## Test Maintenance

### Keeping Tests Up to Date
- Update tests when requirements change
- Refactor tests with code changes
- Remove obsolete tests
- Keep test data realistic
- Maintain test documentation

### Debugging Failing Tests
```typescript
// Add debug output
screen.debug(); // Prints DOM tree

// Use testing-library queries
screen.logTestingPlaygroundURL(); // Generates test selector

// Use Playwright debug mode
await page.pause(); // Pause test execution
```

## Quality Checklist

Before committing:
- [ ] All new code has unit tests
- [ ] Critical paths have integration tests
- [ ] User flows have E2E tests
- [ ] Tests pass locally
- [ ] Coverage meets targets
- [ ] No flaky tests
- [ ] Test names are descriptive
- [ ] Assertions are meaningful

## Next Steps

After testing:
1. Run full test suite
2. Check coverage reports
3. Fix any failing tests
4. Collaborate with Implementation Engineer for fixes
5. Run E2E tests in CI/CD
6. Monitor test results in production
