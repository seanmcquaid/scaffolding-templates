# React Server Components (RSC) Support in React Router V7

## Current Status

⚠️ **Important**: React Router v7 does not yet have native React Server Components (RSC) support. This template serves as an exploration of what RSC integration might look like when it becomes available.

## What Are React Server Components?

React Server Components are a new feature in React 19 that allows components to run on the server, giving them access to server-side resources like databases, files, and APIs without exposing sensitive information to the client.

### Benefits of RSC:
- **Server-side data access**: Direct database queries, file system access
- **Reduced bundle size**: Server components don't ship to the client
- **Improved performance**: Less JavaScript sent to the browser
- **Security**: API keys and sensitive logic stay on the server
- **SEO-friendly**: Content is rendered on the server

## Current Limitations

### React Router v7 Limitations
1. **No native RSC support**: React Router v7.7.0 does not include RSC configuration options
2. **Traditional SSR only**: Current implementation uses `renderToPipeableStream` for standard SSR
3. **No RSC build pipeline**: Build tools are not configured for RSC bundling

### What We Can Do Today
1. **Standard SSR**: Full server-side rendering with hydration
2. **Server-side data loading**: Using React Router loaders for server data
3. **Streaming SSR**: Progressive HTML streaming for better performance

## Workarounds and Alternatives

### 1. React Router Loaders
```typescript
// app/routes/dashboard.tsx
export async function loader() {
  // Server-side data fetching
  const data = await fetchServerData();
  return { data };
}

export default function Dashboard() {
  const { data } = useLoaderData<typeof loader>();
  return <div>{/* Use server data */}</div>;
}
```

### 2. Server-side API Integration
```typescript
// Server-side data fetching in loaders
export async function loader({ request }: LoaderArgs) {
  // This runs on the server, similar to RSC
  const database = await connectToDatabase();
  const data = await database.query(/* ... */);
  return json(data);
}
```

### 3. Middleware for Server Logic
```typescript
// Server middleware for shared server logic
export const serverMiddleware: Route.MiddlewareFunction = async (
  { request },
  next
) => {
  // Server-side logic
  const serverData = await getServerData();
  
  // Pass to routes via context or headers
  const response = await next();
  return response;
};
```

## Future RSC Integration

When React Router adds RSC support, it might look like:

### Configuration
```typescript
// react-router.config.ts
export default {
  future: {
    unstable_rsc: true, // Enable RSC support
  },
  rsc: {
    serverComponents: './app/server-components',
    clientComponents: './app/client-components',
  },
} satisfies Config;
```

### Server Components
```tsx
// app/server-components/DataComponent.tsx
async function DataComponent() {
  // This would run only on the server
  const data = await database.query(/* ... */);
  
  return (
    <div>
      <h1>Server Data</h1>
      <ClientComponent data={data} />
    </div>
  );
}
```

### Client Components
```tsx
'use client';

// app/client-components/InteractiveComponent.tsx
function InteractiveComponent({ data }) {
  // This runs on the client for interactivity
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Data: {data}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
```

## Roadmap for RSC Support

### Phase 1: Current (React Router v7.7.0)
- ✅ Standard SSR with streaming
- ✅ Server-side data loading via loaders
- ✅ React 19 compatibility
- ❌ No native RSC support

### Phase 2: Experimental (Future)
- 🔄 Community exploration of RSC patterns
- 🔄 Build tool configuration for RSC
- 🔄 Component separation strategies

### Phase 3: Native Support (TBD)
- ⏳ Official React Router RSC integration
- ⏳ Built-in server/client component bundling
- ⏳ RSC-optimized routing and data loading

## Current Best Practices

Until RSC support is available, follow these patterns:

1. **Use loaders for server data**:
   ```typescript
   export async function loader() {
     return await getServerData();
   }
   ```

2. **Leverage server middleware**:
   ```typescript
   export const middleware = [serverDataMiddleware];
   ```

3. **Optimize SSR streaming**:
   ```typescript
   // Use React 19's enhanced streaming capabilities
   const { pipe } = renderToPipeableStream(/* ... */);
   ```

4. **Prepare for RSC transition**:
   - Separate server and client logic
   - Use async components where possible
   - Structure data flow for server/client boundaries

## Migration Strategy

When RSC support becomes available:

1. **Component Audit**: Identify components that should be server-only
2. **Boundary Definition**: Determine client component boundaries
3. **Data Flow**: Refactor loaders to use RSC patterns
4. **Build Configuration**: Update bundling for RSC
5. **Testing**: Ensure SSR/hydration still works correctly

## Resources

- [React Server Components](https://react.dev/reference/rsc/server-components)
- [React Router v7 Documentation](https://reactrouter.com/start/framework/introduction)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)

---

This template will be updated as React Router RSC support becomes available.