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

## HTTP Requests

For managing state for HTTP requests, I recommend the following:

1. Whatever is built into your framework - React Router has loaders, actions, clientLoaders and clientActions for this but if you want to utilize a client cache, you'll need one of the tools below in addition.
2. TanStack Query if not using Redux Toolkit
3. Redux Toolkit Query if using Redux Toolkit
