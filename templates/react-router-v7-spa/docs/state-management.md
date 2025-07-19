# State Management

State management is incredibly difficult to get right and most teams tend to overuse certain techniques or libraries. Cory House has a [tweet](https://twitter.com/housecor/status/1437765673439088644/photo/1) explaining state management patterns that I think are a good starting place but they basically boil for me down to the following:

| State Type                                        | Use case                                        |
| ------------------------------------------------- | ----------------------------------------------- |
| URL                                               | Sharable app location                           |
| Web storage                                       | Persist between sessions, one browser           |
| Local state                                       | Only one component needs the state              |
| Lifted state                                      | Multiple related components need the state      |
| Derived state                                     | State can be derived from existing state        |
| Refs                                              | DOM Reference, state that isn't rendered        |
| Context                                           | Subtree state or a small amount of Global state |
| Global state (Redux Toolkit, Zustand, Jotai, etc) | A considerable amount of Global State           |

I generally recommend keeping state as local as you can and using Global state only when you need to.

## Interactive Examples

This template includes comprehensive examples for each state management pattern. Visit the [State Management Examples](/state-management-examples) page to explore:

- **URL State**: Product search with filters, pagination, and modal state stored in URL parameters
- **Web Storage**: User preferences with localStorage and session data with sessionStorage
- **Local State**: Counter, toggle, form, and todo list examples using useState and useReducer
- **Lifted State**: Shopping cart and chat application demonstrating shared state between siblings
- **Derived State**: Analytics dashboard, search results, and computed values using useMemo
- **Refs**: Focus management, DOM measurements, timers, and previous value tracking
- **Context**: Theme provider, authentication, and settings with nested context providers
- **Global State**: Shopping cart, user session, and notifications with custom global store

Each example includes:
- Live interactive demonstrations
- Code explanations and best practices
- When to use (and when not to use) each pattern
- Performance considerations
- TypeScript examples

## HTTP Requests

For managing state for HTTP requests, I recommend the following:

1. Whatever is built into your framework - React Router has loaders, actions, clientLoaders and clientActions for this but if you want to utilize a client cache, you'll need one of the tools below in addition.
2. TanStack Query if not using Redux Toolkit
3. Redux Toolkit Query if using Redux Toolkit

The template includes TanStack Query examples in the [React Query](/react-query) page, demonstrating server state management with caching, mutations, and optimistic updates.
