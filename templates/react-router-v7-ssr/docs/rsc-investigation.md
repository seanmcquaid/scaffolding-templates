# React Server Components (RSC) Investigation

## Executive Summary

After investigating React Server Components support in React Router v7, we have concluded that **native RSC support is not yet available** in React Router v7.7.0. However, we have created an experimental template and documentation to explore RSC patterns and prepare for future integration.

## Current Findings

### React Router v7 Status
- **Version**: 7.7.0 (latest stable)
- **RSC Support**: ❌ Not available
- **SSR Support**: ✅ Full support with streaming
- **React 19 Compatibility**: ✅ Compatible

### Available Features
- Traditional SSR with `renderToPipeableStream`
- Server-side data loading via loaders
- Streaming SSR for improved performance
- React 19 concurrent features

### Future Flags Available
```typescript
future: {
  unstable_middleware: true,
  unstable_optimizeDeps: true,
  unstable_splitRouteModules: true,
  unstable_viteEnvironmentApi: true,
  unstable_subResourceIntegrity: boolean,
  // No RSC flags available yet
}
```

## Experimental RSC Template

We have created an experimental template (`react-router-v7-rsc`) that demonstrates:

1. **RSC Component Patterns**: Example server components showing future patterns
2. **Documentation**: Comprehensive guide to RSC roadmap and current limitations
3. **Migration Strategy**: Preparation for future RSC integration
4. **Current Workarounds**: Using loaders and middleware for server-side logic

### Key Files
- `app/components/rsc/ServerDataComponent.tsx`: Example RSC pattern
- `docs/rsc-support.md`: Comprehensive RSC documentation
- `react-router.config.ts`: Prepared configuration with RSC comments

## Current Workarounds

Until RSC support is available, developers can use:

### 1. React Router Loaders
```typescript
export async function loader() {
  // Server-side data fetching
  const data = await fetchFromDatabase();
  return json(data);
}
```

### 2. Server Middleware
```typescript
export const middleware: Route.MiddlewareFunction = async (
  { request },
  next
) => {
  // Server-side logic
  const serverData = await getServerData();
  return next();
};
```

### 3. Streaming SSR
React Router v7 already provides excellent SSR streaming capabilities with React 19.

## Roadmap and Recommendations

### Short Term
1. ✅ Use current SSR patterns with loaders
2. ✅ Leverage server middleware for shared logic
3. ✅ Prepare component architecture for RSC transition

### Medium Term
1. 🔄 Monitor React Router roadmap for RSC announcements
2. 🔄 Experiment with RSC patterns in preparation
3. 🔄 Community exploration of RSC integration

### Long Term
1. ⏳ Native React Router RSC support
2. ⏳ Seamless migration path from current SSR
3. ⏳ Full RSC ecosystem integration

## Impact on Templates

### react-router-v7-ssr
- Maintains current SSR approach
- Documents RSC investigation results
- Provides migration guidance

### react-router-v7-rsc (New)
- Experimental exploration template
- RSC pattern demonstrations
- Educational resource for future migration

## Conclusion

While React Router v7 does not yet support RSC natively, the current SSR implementation provides excellent performance and developer experience. The experimental template serves as a foundation for future RSC integration when it becomes available.

**Recommendation**: Continue using React Router v7 SSR patterns while monitoring the framework's roadmap for RSC support announcements.

---

*Investigation completed on: January 2025*  
*React Router Version: 7.7.0*  
*React Version: 19.1.0*