---
name: ui-ux-design
description: Designs intuitive user interfaces and experiences with focus on accessibility and usability. Expert in React component design, design systems, and WCAG compliance.
---

# UI/UX Design

Design intuitive, accessible user interfaces that follow modern design principles and template patterns.

## When to Use

Use this skill when you need to:
- Design user interfaces for new features
- Create component specifications
- Ensure accessibility compliance (WCAG 2.1 AA)
- Design responsive layouts
- Improve user experience
- Create design system components

## Design Principles

### User-Centered Design
- **Clarity**: Clear, understandable interfaces
- **Consistency**: Uniform patterns across templates
- **Feedback**: Visual feedback for user actions
- **Efficiency**: Minimize steps to complete tasks
- **Forgiveness**: Easy to undo mistakes

### Visual Hierarchy
- **Typography**: Clear heading levels (h1-h6)
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, 24px, 32px)
- **Color**: Semantic color usage (primary, secondary, danger, success)
- **Size**: Visual importance through size variation

### Accessibility First
- **WCAG 2.1 AA Compliance**: Mandatory for all templates
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI elements
- **Focus Indicators**: Visible focus states

## Component Design Process

### 1. Understand Requirements
- User needs and goals
- Functional requirements
- Accessibility requirements
- Performance constraints

### 2. Create Wireframes
Low-fidelity sketches focusing on:
- Layout structure
- Content hierarchy
- User flow
- Interactive elements

### 3. Design Components
High-fidelity specifications including:
- Visual design
- Interactive states
- Responsive behavior
- Accessibility features

### 4. Document Specifications
- Props interface
- Visual states (default, hover, active, disabled, error)
- Accessibility requirements
- Usage examples

## UI Component Patterns

### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Button Component
 * 
 * Accessibility:
 * - Keyboard accessible (Enter/Space)
 * - Disabled state prevents interaction
 * - Loading state shows spinner with aria-busy
 * 
 * States:
 * - Default: Normal appearance
 * - Hover: Slightly darker background
 * - Active: Pressed appearance
 * - Disabled: Reduced opacity, no interaction
 * - Loading: Spinner, disabled interaction
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
}: ButtonProps) {
  const { t } = useAppTranslation();
  
  return (
    <button
      className={getButtonClasses(variant, size)}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled}
    >
      {loading && <Spinner aria-label={t('Common.loading')} />}
      {children}
    </button>
  );
}
```

### Form Input Component
```typescript
interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Input Component
 * 
 * Accessibility:
 * - Label associated with input (htmlFor/id)
 * - Required state indicated visually and via aria-required
 * - Error state announced to screen readers via aria-describedby
 * - Disabled state prevents interaction
 */
export function Input({
  label,
  name,
  type = 'text',
  error,
  required = false,
  disabled = false,
}: InputProps) {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="input-label">
        {label}
        {required && <span aria-label="required">*</span>}
      </label>
      
      <input
        id={inputId}
        name={name}
        type={type}
        className={error ? 'input-error' : 'input'}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        disabled={disabled}
      />
      
      {error && (
        <span id={errorId} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
```

### Card Component
```typescript
interface CardProps {
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Card Component
 * 
 * Accessibility:
 * - Interactive cards have button role
 * - Non-interactive cards are plain divs
 * - Title uses proper heading level
 */
export function Card({ title, footer, children, onClick }: CardProps) {
  const isInteractive = !!onClick;
  
  const content = (
    <>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </>
  );

  if (isInteractive) {
    return (
      <button
        className="card card-interactive"
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  return <div className="card">{content}</div>;
}
```

## Responsive Design

### Mobile-First Approach
Design for mobile screens first, then enhance for larger screens.

```css
/* Mobile (default) */
.container {
  padding: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Responsive Patterns
- **Reflow**: Single column on mobile, multiple columns on desktop
- **Progressive Disclosure**: Hide secondary content on mobile
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Readable Line Length**: Max 75 characters per line

## Accessibility Guidelines

### Semantic HTML
```typescript
// ✅ Good: Semantic elements
<header>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>

<footer>
  <p>© 2024 Company</p>
</footer>

// ❌ Bad: Div soup
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
```

### ARIA Labels
```typescript
// Search button with icon only
<button aria-label={t('Common.search')}>
  <SearchIcon />
</button>

// Status message
<div role="status" aria-live="polite">
  {t('Form.savedSuccessfully')}
</div>

// Alert message
<div role="alert" aria-live="assertive">
  {t('Form.errorOccurred')}
</div>
```

### Keyboard Navigation
```typescript
function Modal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <dialog
      open={isOpen}
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">{t('Modal.title')}</h2>
      {/* Modal content */}
    </dialog>
  );
}
```

### Color Contrast
Ensure sufficient contrast ratios:
- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+ or 14pt+ bold): 3:1 minimum
- **UI components**: 3:1 minimum
- **Focus indicators**: 3:1 minimum

```css
/* Good contrast examples */
.text-primary {
  color: #1a1a1a; /* Dark gray on white: 16.3:1 */
}

.text-secondary {
  color: #4a4a4a; /* Medium gray on white: 8.5:1 */
}

.button-primary {
  background: #0066cc; /* Blue: sufficient contrast */
  color: #ffffff;
}
```

## Design System Components

### Typography Scale
```typescript
export const typography = {
  h1: 'text-4xl font-bold',      // 36px
  h2: 'text-3xl font-bold',      // 30px
  h3: 'text-2xl font-semibold',  // 24px
  h4: 'text-xl font-semibold',   // 20px
  h5: 'text-lg font-medium',     // 18px
  h6: 'text-base font-medium',   // 16px
  body: 'text-base',             // 16px
  small: 'text-sm',              // 14px
  caption: 'text-xs',            // 12px
};
```

### Spacing Scale
```typescript
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};
```

### Color Palette
```typescript
export const colors = {
  primary: {
    light: '#3b82f6',
    DEFAULT: '#2563eb',
    dark: '#1d4ed8',
  },
  secondary: {
    light: '#94a3b8',
    DEFAULT: '#64748b',
    dark: '#475569',
  },
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    // ...
    900: '#111827',
  },
};
```

## User Flow Design

### Form Submission Flow
```
1. User fills form
   ↓
2. Client-side validation (on blur/submit)
   ↓
3. Show loading state
   ↓
4. Submit to API
   ↓
5a. Success: Show success message, redirect/refresh
5b. Error: Show error message, maintain form state
```

### Loading States
```typescript
function UserList() {
  const { t } = useAppTranslation();
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner />
        <p>{t('Common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <ErrorIcon />
        <p>{t('Common.errorLoadingData')}</p>
        <button onClick={() => refetch()}>{t('Common.retry')}</button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <EmptyIcon />
        <p>{t('Users.noUsersFound')}</p>
      </div>
    );
  }

  return <ul>{/* User list */}</ul>;
}
```

## Design Checklist

Before finalizing design:
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard accessible
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Touch targets min 44x44px
- [ ] Responsive on all screen sizes
- [ ] Loading states defined
- [ ] Error states defined
- [ ] Empty states defined
- [ ] Focus indicators visible
- [ ] All text uses translation keys
- [ ] Component props documented

## Next Steps

After design:
1. Create component specifications
2. Collaborate with Software Architect for technical feasibility
3. Hand off to Implementation Engineer for coding
4. Work with Quality Analyst for accessibility testing
5. Iterate based on user feedback
