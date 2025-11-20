# SWR

> **Category**: Intermediate | **Related Concepts**: [React Query](./react-query.md), [Data Fetching](../05-data-fetching/README.md)  
> **Last Updated**: 2024

## 📖 Overview

SWR (stale-while-revalidate) is a data fetching library that provides caching, revalidation, and synchronization. It's lightweight and perfect for Next.js applications.

**Key Points:**
- Lightweight data fetching
- Automatic revalidation
- Caching
- Background updates
- Error handling
- TypeScript support

## 🎯 When to Use

- **Data Fetching**: When fetching server data
- **Caching**: When you need data caching
- **Real-time**: When you need fresh data
- **Lightweight**: When you want minimal bundle
- **Next.js**: When using Next.js
- **API Integration**: When integrating with APIs

## 💻 Basic Example

### Basic Setup

```typescript
// app/providers.tsx
'use client'

import { SWRConfig } from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      {children}
    </SWRConfig>
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

### Basic Usage

```typescript
// app/components/UserList.tsx
'use client'

import useSWR from 'swr'

export default function UserList() {
  const { data, error, isLoading } = useSWR('/api/users')
  
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

import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'

export default function CreateUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { mutate } = useSWRConfig()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    
    // Revalidate users list
    mutate('/api/users')
    
    setName('')
    setEmail('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">Create User</button>
    </form>
  )
}
```

### Conditional Fetching

```typescript
// app/components/UserProfile.tsx
'use client'

import useSWR from 'swr'

export default function UserProfile({ userId }: { userId: string | null }) {
  const { data, error } = useSWR(
    userId ? `/api/users/${userId}` : null, // Don't fetch if no userId
    fetcher
  )
  
  if (!userId) return <div>No user selected</div>
  if (error) return <div>Error loading user</div>
  if (!data) return <div>Loading...</div>
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Basic Fetch
```typescript
const { data } = useSWR('/api/users', fetcher)
```
**When to use**: Simple data fetching

### Pattern 2: Conditional
```typescript
const { data } = useSWR(shouldFetch ? '/api/data' : null, fetcher)
```
**When to use**: Conditional fetching

### Pattern 3: Revalidation
```typescript
mutate('/api/users') // Revalidate
```
**When to use**: After mutations

## ⚠️ Common Mistakes

### Mistake 1: Not Providing Fetcher
```typescript
// ❌ Wrong: No fetcher
const { data } = useSWR('/api/users') // Error
```
**Why**: Need to provide fetcher or configure globally.

```typescript
// ✅ Correct: Provide fetcher
const { data } = useSWR('/api/users', fetcher)
```

### Mistake 2: Not Revalidating
```typescript
// ❌ Wrong: Not revalidating after mutation
await createUser()
// Cache not updated
```
**Why**: Need to revalidate to update cache.

```typescript
// ✅ Correct: Revalidate
await createUser()
mutate('/api/users')
```

### Mistake 3: Wrong Key
```typescript
// ❌ Wrong: Inconsistent keys
useSWR('/api/users')
mutate('/api/user') // Different key
```
**Why**: Keys must match.

```typescript
// ✅ Correct: Consistent keys
useSWR('/api/users')
mutate('/api/users')
```

## ✨ Best Practices

1. **Configure globally**: Set up SWRConfig
2. **Use consistent keys**: Keep keys consistent
3. **Revalidate after mutations**: Keep cache fresh
4. **Handle errors**: Always handle error states
5. **Use conditional fetching**: Don't fetch when not needed
6. **Optimize revalidation**: Set appropriate intervals

## 🔗 Related Concepts

- [React Query](./react-query.md) - Alternative data fetching
- [Data Fetching](../05-data-fetching/README.md) - Data fetching patterns

## 📚 Resources

### Official Documentation
- [SWR](https://swr.vercel.app)

## 🧪 Practice Exercises

### Exercise 1: Basic SWR
**Difficulty**: Beginner  
**Goal**: Understand SWR basics  
**Instructions**:
1. Install SWR
2. Set up SWRConfig
3. Create queries
4. Test caching

### Exercise 2: Mutations
**Difficulty**: Intermediate  
**Goal**: Practice mutations  
**Instructions**:
1. Create mutations
2. Revalidate cache
3. Handle errors
4. Test all scenarios

## 🎓 Key Takeaways

- SWR is lightweight and simple
- Automatic revalidation
- Use mutate for cache updates
- Consistent query keys
- Handle errors properly
- Great for Next.js

## ❓ FAQ

### Q: How do I install SWR?
**A**: Run `npm install swr`.

### Q: Do I need a provider?
**A**: SWRConfig is optional but recommended for global config.

### Q: How do I revalidate?
**A**: Use `mutate(key)` to revalidate specific queries.

### Q: Can I use with Server Components?
**A**: SWR works in Client Components. Use Server Components for initial data.

### Q: What's the difference from React Query?
**A**: SWR is lighter and simpler, React Query has more features.

---

**Next Steps**: 
- Review: [React Query](./react-query.md) for comparison
- Practice: Set up SWR
- Build: Manage server state

