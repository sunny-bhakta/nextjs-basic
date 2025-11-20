# React Query

> **Category**: Intermediate | **Related Concepts**: [Data Fetching](../05-data-fetching/README.md), [SWR](./swr.md)  
> **Last Updated**: 2024

## 📖 Overview

React Query (TanStack Query) is a powerful library for managing server state. It provides caching, synchronization, and background updates for server data.

**Key Points:**
- Server state management
- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states

## 🎯 When to Use

- **Server State**: When managing server data
- **Caching**: When you need data caching
- **Real-time Updates**: When you need fresh data
- **Complex Data**: When data fetching is complex
- **Optimistic Updates**: When you need optimistic UI
- **API Integration**: When integrating with APIs

## 💻 Basic Example

### Basic Setup

```typescript
// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Basic Query

```typescript
// app/components/UserList.tsx
'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchUsers() {
  const res = await fetch('/api/users')
  return res.json()
}

export default function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <ul>
      {data.map((user: { id: string; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

## 🔧 Advanced Example

### Mutations

```typescript
// app/components/CreateUser.tsx
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

async function createUser(data: { name: string; email: string }) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export default function CreateUser() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutation.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
```

### Optimistic Updates

```typescript
// app/components/TodoList.tsx
'use client'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

async function toggleTodo(id: string) {
  const res = await fetch(`/api/todos/${id}`, { method: 'PATCH' })
  return res.json()
}

export default function TodoList() {
  const queryClient = useQueryClient()
  
  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  })
  
  const mutation = useMutation({
    mutationFn: toggleTodo,
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      
      // Snapshot previous value
      const previousTodos = queryClient.getQueryData(['todos'])
      
      // Optimistically update
      queryClient.setQueryData(['todos'], (old: any[]) =>
        old.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
      
      return { previousTodos }
    },
    onError: (err, id, context) => {
      // Rollback on error
      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  
  return (
    <ul>
      {todos?.map((todo: { id: string; text: string; completed: boolean }) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => mutation.mutate(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Basic Query
```typescript
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
```
**When to use**: Simple data fetching

### Pattern 2: Mutation
```typescript
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```
**When to use**: Creating/updating data

### Pattern 3: Optimistic Update
```typescript
onMutate: async (id) => {
  // Optimistic update
  queryClient.setQueryData(['todos'], (old) => update(old, id))
}
```
**When to use**: Better perceived performance

## ⚠️ Common Mistakes

### Mistake 1: Not Wrapping with Provider
```typescript
// ❌ Wrong: No QueryClientProvider
function Component() {
  const { data } = useQuery({...}) // Error
}
```
**Why**: Need QueryClientProvider.

```typescript
// ✅ Correct: Wrap with provider
<QueryClientProvider client={queryClient}>
  <Component />
</QueryClientProvider>
```

### Mistake 2: Not Invalidating Queries
```typescript
// ❌ Wrong: Not invalidating after mutation
const mutation = useMutation({
  mutationFn: createUser,
  // Cache not updated
})
```
**Why**: Need to invalidate to refetch.

```typescript
// ✅ Correct: Invalidate queries
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

### Mistake 3: Wrong Query Key
```typescript
// ❌ Wrong: Inconsistent query keys
useQuery({ queryKey: ['users'] })
queryClient.invalidateQueries({ queryKey: ['user'] }) // Different key
```
**Why**: Query keys must match.

```typescript
// ✅ Correct: Consistent keys
useQuery({ queryKey: ['users'] })
queryClient.invalidateQueries({ queryKey: ['users'] })
```

## ✨ Best Practices

1. **Use QueryClientProvider**: Wrap app with provider
2. **Consistent query keys**: Use consistent key structure
3. **Invalidate after mutations**: Keep cache fresh
4. **Use selectors**: Transform data when needed
5. **Handle errors**: Always handle error states
6. **Optimize queries**: Set appropriate staleTime

## 🔗 Related Concepts

- [Data Fetching](../05-data-fetching/README.md) - Data fetching patterns
- [SWR](./swr.md) - Alternative data fetching

## 📚 Resources

### Official Documentation
- [React Query](https://tanstack.com/query)

## 🧪 Practice Exercises

### Exercise 1: Basic Query
**Difficulty**: Beginner  
**Goal**: Understand React Query  
**Instructions**:
1. Install React Query
2. Set up provider
3. Create queries
4. Test caching

### Exercise 2: Mutations
**Difficulty**: Intermediate  
**Goal**: Practice mutations  
**Instructions**:
1. Create mutations
2. Invalidate queries
3. Add optimistic updates
4. Test all scenarios

## 🎓 Key Takeaways

- React Query manages server state
- Automatic caching and refetching
- Use mutations for updates
- Invalidate queries after mutations
- Optimistic updates for better UX
- Excellent TypeScript support

## ❓ FAQ

### Q: How do I install React Query?
**A**: Run `npm install @tanstack/react-query`.

### Q: Do I need a provider?
**A**: Yes, wrap your app with QueryClientProvider.

### Q: How do I invalidate queries?
**A**: Use `queryClient.invalidateQueries({ queryKey: [...] })`.

### Q: Can I use with Server Components?
**A**: React Query works in Client Components. Use Server Components for initial data.

### Q: How do I handle errors?
**A**: Use the `error` property from useQuery or useMutation.

---

**Next Steps**: 
- Review: [SWR](./swr.md) for alternative
- Practice: Set up React Query
- Build: Manage server state

