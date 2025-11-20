# State Management

> **Category**: Intermediate | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [Client Components](../03-app-router/client-components.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js applications can use various state management solutions, from React's built-in state to external libraries.

## Key Topics

- [React Context API](./react-context.md) - Built-in state management
- [Zustand](./zustand.md) - Lightweight state management
- [Redux](./redux.md) - Popular state management library
- [React Query](./react-query.md) - Server state management
- [SWR](./swr.md) - Data fetching and caching

## Quick Comparison

| Solution | Use Case | Bundle Size | Complexity |
|----------|----------|-------------|------------|
| React Context | Global state, theme | None (built-in) | Low |
| Zustand | Simple global state | Small | Low |
| React Query | Server state | Medium | Medium |
| SWR | Data fetching | Small | Low |
| Redux | Complex state | Large | High |

## Quick Start

### React Context
```typescript
const Context = createContext()
export function Provider({ children }) {
  const [value, setValue] = useState()
  return <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
}
```

### Zustand
```typescript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```

## Learning Path

1. Start with [React Context](./react-context.md) for built-in solution
2. Learn [Zustand](./zustand.md) for simple state
3. Explore [React Query](./react-query.md) for server state
4. Consider [Redux](./redux.md) for complex state

## Detailed Guides

- **[React Context API](./react-context.md)** - Built-in state management
- **[Zustand](./zustand.md)** - Lightweight state management
- **[Redux](./redux.md)** - Complex state management
- **[React Query](./react-query.md)** - Server state management
- **[SWR](./swr.md)** - Data fetching and caching

## Examples

See the [examples](./examples/) folder for working code samples:

- **[React Context](./examples/01-react-context.tsx)** - Context API examples
- **[Zustand](./examples/02-zustand.tsx)** - Zustand examples
- **[React Query](./examples/03-react-query.tsx)** - React Query examples
- **[SWR](./examples/04-swr.tsx)** - SWR examples
- **[Redux](./examples/05-redux.tsx)** - Redux examples

See [examples/README.md](./examples/README.md) for detailed descriptions and usage instructions.

## Resources

- [State Management Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/client-side)
- [Zustand](https://zustand-demo.pmnd.rs)
- [React Query](https://tanstack.com/query)
- [SWR](https://swr.vercel.app)
- [Redux Toolkit](https://redux-toolkit.js.org)

---

**Previous**: [Authentication](../16-authentication/README.md) | **Next**: [Forms & User Input](../18-forms-user-input/README.md)

