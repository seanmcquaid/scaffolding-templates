---
name: maintenance-engineering
description: Handles ongoing maintenance, bug fixes, and improvements. Expert in debugging, refactoring, dependency updates, and technical debt management.
---

# Maintenance Engineering

Maintain code quality, fix bugs, manage dependencies, and address technical debt across scaffolding templates.

## When to Use

Use this skill when you need to:
- Investigate and fix bugs
- Update dependencies safely
- Refactor code for better maintainability
- Address technical debt
- Improve code quality
- Handle security updates

## Bug Investigation Process

### 1. Reproduce the Issue
- Understand the reported behavior
- Create minimal reproduction steps
- Identify affected environments
- Document expected vs actual behavior

### 2. Isolate the Problem
```typescript
// Add debug logging
console.log('Component props:', props);
console.log('Current state:', state);

// Use browser DevTools
debugger; // Pause execution

// Check React DevTools
// - Component tree
// - Props and state
// - Hooks values
```

### 3. Identify Root Cause
- Check recent code changes
- Review error logs and stack traces
- Test edge cases
- Verify assumptions

### 4. Implement Fix
- Write minimal code changes
- Add test case that would have caught the bug
- Verify fix doesn't introduce regressions
- Document the fix

### 5. Prevent Recurrence
- Add unit/integration tests
- Update error handling
- Improve input validation
- Document edge cases

## Common Bug Patterns

### State Management Issues
```typescript
// ❌ Bad: Mutating state directly
const handleClick = () => {
  user.name = 'New Name';
  setUser(user); // Won't trigger re-render
};

// ✅ Good: Create new object
const handleClick = () => {
  setUser({ ...user, name: 'New Name' });
};

// ❌ Bad: Stale closure
useEffect(() => {
  setTimeout(() => {
    console.log(count); // Always logs initial value
  }, 1000);
}, []); // Empty dependency array

// ✅ Good: Include dependencies
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(count); // Logs current value
  }, 1000);
  return () => clearTimeout(timer);
}, [count]); // Include count in dependencies
```

### Async/Race Conditions
```typescript
// ❌ Bad: Race condition
const [data, setData] = useState(null);

useEffect(() => {
  fetchData().then(setData);
}, [query]); // If query changes rapidly, old responses may arrive late

// ✅ Good: Cancel previous requests
useEffect(() => {
  let cancelled = false;
  
  fetchData(query).then(result => {
    if (!cancelled) {
      setData(result);
    }
  });
  
  return () => {
    cancelled = true;
  };
}, [query]);

// ✅ Better: Use TanStack Query (handles this automatically)
const { data } = useQuery({
  queryKey: ['data', query],
  queryFn: () => fetchData(query),
});
```

### Memory Leaks
```typescript
// ❌ Bad: Event listener not cleaned up
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []); // Memory leak!

// ✅ Good: Clean up event listener
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// ❌ Bad: Subscription not cancelled
useEffect(() => {
  const subscription = observable.subscribe(handleData);
}, []); // Memory leak!

// ✅ Good: Unsubscribe on cleanup
useEffect(() => {
  const subscription = observable.subscribe(handleData);
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Dependency Management

### Updating Dependencies
```bash
# Check for outdated packages
pnpm outdated

# Update patch versions (safe)
pnpm update

# Update minor versions (check changelog)
pnpm update --latest

# Update specific package
pnpm update react@latest react-dom@latest

# Check for security vulnerabilities
pnpm audit

# Fix security issues
pnpm audit --fix
```

### Safe Update Process
1. **Read changelogs**: Check breaking changes
2. **Update dev dependencies first**: Lower risk
3. **Update one major package at a time**: Easier to debug
4. **Run tests**: Ensure nothing breaks
5. **Test manually**: Check critical flows
6. **Update peer dependencies**: Match compatible versions

### Version Constraints
```json
{
  "dependencies": {
    "react": "^18.3.1",        // ^: Minor and patch updates
    "react-dom": "^18.3.1",
    "zod": "~3.23.0",           // ~: Only patch updates
    "ky": "1.7.3"               // Exact version (rare)
  }
}
```

## Refactoring

### When to Refactor
- Code is difficult to understand
- Duplication exists across files
- Functions are too long (>50 lines)
- High cyclomatic complexity
- Poor separation of concerns
- Low test coverage

### Refactoring Patterns

#### Extract Function
```typescript
// Before: Long function with mixed concerns
function UserProfile({ userId }: Props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// After: Extracted hook and API client
function UserProfile({ userId }: Props) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <LoadingSpinner />;
  
  return <UserDisplay user={user} />;
}
```

#### Extract Component
```typescript
// Before: Component doing too much
function Dashboard() {
  return (
    <div>
      <div className="stats">
        <div>Users: {stats.users}</div>
        <div>Posts: {stats.posts}</div>
        <div>Comments: {stats.comments}</div>
      </div>
      <div className="chart">
        {/* Complex chart rendering */}
      </div>
      <div className="table">
        {/* Complex table rendering */}
      </div>
    </div>
  );
}

// After: Smaller, focused components
function Dashboard() {
  return (
    <div>
      <StatsCards stats={stats} />
      <AnalyticsChart data={chartData} />
      <UsersTable users={users} />
    </div>
  );
}
```

#### Replace Conditional with Polymorphism
```typescript
// Before: Complex conditionals
function AlertBox({ type, message }: Props) {
  let icon;
  let color;
  
  if (type === 'success') {
    icon = <SuccessIcon />;
    color = 'green';
  } else if (type === 'error') {
    icon = <ErrorIcon />;
    color = 'red';
  } else if (type === 'warning') {
    icon = <WarningIcon />;
    color = 'yellow';
  }
  
  return (
    <div className={`alert alert-${color}`}>
      {icon}
      {message}
    </div>
  );
}

// After: Configuration-driven
const alertConfig = {
  success: { icon: SuccessIcon, color: 'green' },
  error: { icon: ErrorIcon, color: 'red' },
  warning: { icon: WarningIcon, color: 'yellow' },
};

function AlertBox({ type, message }: Props) {
  const { icon: Icon, color } = alertConfig[type];
  
  return (
    <div className={`alert alert-${color}`}>
      <Icon />
      {message}
    </div>
  );
}
```

## Technical Debt Management

### Identifying Technical Debt
- Code smells (long functions, duplicated code)
- High complexity metrics
- Difficult-to-test code
- Outdated dependencies
- Missing documentation
- Low test coverage
- Performance bottlenecks

### Prioritizing Technical Debt
1. **Critical**: Security vulnerabilities, production bugs
2. **High**: Blocking new features, significant performance issues
3. **Medium**: Code maintainability, moderate performance issues
4. **Low**: Nice-to-haves, minor improvements

### Managing Technical Debt
```markdown
## Technical Debt Register

| Issue | Priority | Impact | Effort | Status |
|-------|----------|--------|--------|--------|
| Update React to v19 | High | Breaking changes | Large | Planned |
| Extract API client | Medium | Code duplication | Medium | In Progress |
| Add E2E tests | Medium | Test coverage | Large | Backlog |
| Refactor UserForm | Low | Maintainability | Small | Backlog |
```

## Code Quality Improvements

### ESLint Rules
```json
{
  "rules": {
    "no-console": "warn",
    "no-debugger": "error",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### TypeScript Strictness
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## Performance Optimization

### Profiling
```typescript
// React DevTools Profiler
import { Profiler } from 'react';

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
) {
  console.log(`${id} ${phase} took ${actualDuration}ms`);
}

<Profiler id="UserList" onRender={onRenderCallback}>
  <UserList />
</Profiler>
```

### Common Optimizations
```typescript
// Memoize expensive calculations
const sortedUsers = useMemo(
  () => users.sort((a, b) => a.name.localeCompare(b.name)),
  [users]
);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedUserCard = React.memo(UserCard, (prev, next) => {
  return prev.user.id === next.user.id;
});

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Virtualize long lists
import { useVirtualizer } from '@tanstack/react-virtual';
```

## Security Updates

### Vulnerability Scanning
```bash
# Check for vulnerabilities
pnpm audit

# View vulnerability details
pnpm audit --json

# Fix automatically (if possible)
pnpm audit --fix

# Update specific vulnerable package
pnpm update package-name@latest
```

### Security Best Practices
- Keep dependencies up to date
- Review security advisories
- Use Snyk or Dependabot
- Validate user inputs
- Sanitize outputs
- Use HTTPS everywhere
- Implement CSP headers

## Documentation Updates

### Code Documentation
```typescript
/**
 * Fetches user data from the API
 * 
 * @param userId - The unique identifier of the user
 * @returns A promise that resolves to the user data
 * @throws {ValidationError} If the response doesn't match the expected schema
 * @throws {HTTPError} If the API request fails
 * 
 * @example
 * ```typescript
 * const user = await userApi.getUser('123');
 * console.log(user.name);
 * ```
 */
export async function getUser(userId: string): Promise<User> {
  const response = await ky.get(`/api/users/${userId}`).json();
  return UserSchema.parse(response);
}
```

### README Updates
- Keep setup instructions current
- Update dependency versions
- Document breaking changes
- Add troubleshooting guides
- Update examples

## Maintenance Checklist

### Weekly
- [ ] Review and triage new issues
- [ ] Check for security updates
- [ ] Review test failures
- [ ] Update documentation

### Monthly
- [ ] Update dependencies
- [ ] Review technical debt
- [ ] Check bundle sizes
- [ ] Review error logs
- [ ] Performance audit

### Quarterly
- [ ] Major dependency updates
- [ ] Architecture review
- [ ] Code quality metrics
- [ ] Test coverage review
- [ ] Documentation audit

## Next Steps

After maintenance work:
1. Run full test suite
2. Manual testing of affected areas
3. Update documentation
4. Collaborate with Quality Analyst for testing
5. Deploy to staging for verification
6. Monitor production after deployment
