---
name: nextjs-ssr-development
description: Expert in Next.js App Router with Server Components, Server Actions, and modern React patterns. Specializes in building performant SSR applications.
---

# Next.js SSR Development

Build production-ready Next.js applications with App Router, Server Components, and optimal performance.

## When to Use

Use this skill for Next.js projects that need:
- Server-side rendering with Server Components
- Server Actions for mutations
- Optimal data fetching strategies
- SEO optimization with metadata API
- Image and font optimization
- Streaming and Suspense

## File Structure (App Router)

```
app/
├── layout.tsx           # Root layout (Server Component)
├── page.tsx            # Home page (Server Component)
├── error.tsx           # Error boundary
├── loading.tsx         # Loading UI
├── not-found.tsx       # 404 page
├── dashboard/
│   ├── layout.tsx      # Nested layout
│   ├── page.tsx        # Dashboard page
│   └── [id]/
│       └── page.tsx    # Dynamic route
└── api/
    └── route.ts        # API route handler
```

## Server Components (Default)

```tsx
// app/users/[id]/page.tsx
import { getUserById } from '@/services/userService';
import { UserProfile } from '@/components/app/UserProfile';

export default async function UserPage({ params }: { params: { id: string } }) {
  // Fetch data directly in Server Component
  const user = await getUserById(params.id);
  
  return <UserProfile user={user} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  
  return {
    title: `${user.name} - Profile`,
    description: user.bio,
    openGraph: {
      title: user.name,
      description: user.bio,
      images: [user.avatar],
    },
  };
}
```

## Client Components

```tsx
'use client';

import { useState } from 'react';
import useAppTranslation from '@/hooks/useAppTranslation';

export function Counter() {
  const { t } = useAppTranslation();
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{t('Counter.count')}: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        {t('Counter.increment')}
      </button>
    </div>
  );
}
```

## Server Actions

```tsx
// app/actions/user.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const UpdateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function updateUser(userId: string, formData: FormData) {
  const validated = UpdateUserSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
  });
  
  await db.updateUser(userId, validated);
  
  revalidatePath(`/users/${userId}`);
  return { success: true };
}

// Usage in Client Component
'use client';

import { updateUser } from '@/app/actions/user';
import { useFormStatus } from 'react-dom';

export function UpdateUserForm({ userId }: { userId: string }) {
  const { pending } = useFormStatus();
  
  return (
    <form action={updateUser.bind(null, userId)}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit" disabled={pending}>
        {pending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

## Data Fetching Patterns

### Parallel Data Fetching
```tsx
export default async function DashboardPage() {
  // Fetch in parallel
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments(),
  ]);
  
  return (
    <div>
      <UserInfo user={user} />
      <PostsList posts={posts} />
      <CommentsList comments={comments} />
    </div>
  );
}
```

### Sequential Data Fetching
```tsx
export default async function UserPostsPage({ params }: Props) {
  // Fetch user first
  const user = await getUser(params.userId);
  
  // Then fetch user's posts
  const posts = await getPostsByUser(user.id);
  
  return <PostsList user={user} posts={posts} />;
}
```

### Streaming with Suspense
```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Fast content renders immediately */}
      <QuickStats />
      
      {/* Slow content streams in */}
      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
```

## Caching Strategies

### Default Caching
```tsx
// Cached by default
const user = await fetch('https://api.example.com/users/1');

// Revalidate every 60 seconds
const user = await fetch('https://api.example.com/users/1', {
  next: { revalidate: 60 }
});

// No caching
const user = await fetch('https://api.example.com/users/1', {
  cache: 'no-store'
});
```

### Route Segment Config
```tsx
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic'; // Disable all caching
export const revalidate = 3600; // Revalidate every hour
export const runtime = 'edge'; // Use Edge Runtime
```

## Image Optimization

```tsx
import Image from 'next/image';

export function UserAvatar({ user }: { user: User }) {
  return (
    <Image
      src={user.avatar}
      alt={user.name}
      width={200}
      height={200}
      priority // Load immediately for above-the-fold images
      placeholder="blur"
      blurDataURL={user.avatarBlurHash}
    />
  );
}
```

## Font Optimization

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Route Handlers (API Routes)

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function GET(request: NextRequest) {
  const users = await db.getUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = CreateUserSchema.parse(body);
  
  const user = await db.createUser(validated);
  return NextResponse.json(user, { status: 201 });
}

// Dynamic route: app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.getUserById(params.id);
  return NextResponse.json(user);
}
```

## Middleware

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

## Error Handling

```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Could not find the requested resource</p>
    </div>
  );
}
```

## Performance Best Practices

1. **Use Server Components by default**: Only use Client Components when needed
2. **Fetch data in Server Components**: Reduces client bundle size
3. **Use Suspense for streaming**: Improve perceived performance
4. **Optimize images with next/image**: Automatic optimization
5. **Preload critical data**: Use `generateStaticParams` for static pages
6. **Monitor Core Web Vitals**: Track LCP, FID, CLS

## SEO Optimization

```tsx
// app/layout.tsx or app/page.tsx
export const metadata = {
  title: {
    default: 'Site Name',
    template: '%s | Site Name',
  },
  description: 'Site description',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'Author Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    siteName: 'Site Name',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
  },
};
```

## Key Principles

1. **Server Components First**: Use Server Components by default
2. **Client Components Sparingly**: Only for interactivity
3. **Data Fetching in Servers**: Reduce client-side requests
4. **Optimize Everything**: Images, fonts, and code splitting
5. **SEO-Friendly**: Use metadata API for all pages
6. **Type-Safe**: Use TypeScript for all code
