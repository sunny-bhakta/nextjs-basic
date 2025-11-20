# Server vs Client Variables

> **Category**: Intermediate | **Related Concepts**: [Environment Files](./env-files.md), [Security](../29-security/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Understanding the difference between server and client environment variables is crucial for security. Server variables are only accessible on the server, while client variables (with NEXT_PUBLIC_ prefix) are exposed to the browser.

**Key Points:**
- Server variables: Only on server
- Client variables: NEXT_PUBLIC_ prefix
- Security implications
- Bundle inclusion
- Best practices
- Type safety

## 🎯 When to Use

- **API Keys**: Server-only (never expose)
- **Database URLs**: Server-only
- **Public URLs**: Client-accessible
- **Feature Flags**: Can be client or server
- **Analytics IDs**: Usually client-accessible

## 💻 Basic Example

### Server Variables

```typescript
// .env.local
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret-api-key

// app/api/data/route.ts (Server Component)
export async function GET() {
  const apiKey = process.env.API_KEY // ✅ Server-only
  const dbUrl = process.env.DATABASE_URL // ✅ Server-only
  
  // Use safely on server
  const data = await fetchData(apiKey, dbUrl)
  return Response.json({ data })
}
```

### Client Variables

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=analytics-123

// app/components/ClientComponent.tsx (Client Component)
'use client'

export default function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL // ✅ Client-accessible
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID // ✅ Client-accessible
  
  // Use in client component
  return <div>API: {apiUrl}</div>
}
```

## 🔧 Advanced Example

### Mixed Usage

```typescript
// .env.local
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret-key
NEXT_PUBLIC_API_URL=https://api.example.com

// app/api/proxy/route.ts (Server)
export async function GET() {
  const apiKey = process.env.API_KEY // Server-only
  const publicUrl = process.env.NEXT_PUBLIC_API_URL // Can access server too
  
  // Use both
  const res = await fetch(`${publicUrl}/data`, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  })
  return Response.json(await res.json())
}

// app/components/ClientComponent.tsx (Client)
'use client'

export default function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL // ✅ Client-accessible
  // const apiKey = process.env.API_KEY // ❌ Undefined in client
  
  return <div>API URL: {apiUrl}</div>
}
```

### Type-Safe Environment

```typescript
// env.server.ts (Server-only)
export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL!,
  API_KEY: process.env.API_KEY!,
} as const

// env.client.ts (Client-accessible)
export const clientEnv = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID!,
} as const

// Usage in Server Component
import { serverEnv } from '@/env.server'
const dbUrl = serverEnv.DATABASE_URL

// Usage in Client Component
'use client'
import { clientEnv } from '@/env.client'
const apiUrl = clientEnv.API_URL
```

## 📋 Common Patterns

### Pattern 1: Server-Only
```typescript
// Server Component
const secret = process.env.SECRET_KEY
```
**When to use**: Secrets, API keys, database URLs

### Pattern 2: Client-Accessible
```typescript
// Client Component
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```
**When to use**: Public URLs, analytics IDs

### Pattern 3: Both
```typescript
// NEXT_PUBLIC_ variables accessible in both
const publicUrl = process.env.NEXT_PUBLIC_API_URL
```
**When to use**: Public configuration

## ⚠️ Common Mistakes

### Mistake 1: Exposing Secrets
```typescript
// ❌ Wrong: Using server variable in client
'use client'
const apiKey = process.env.API_KEY // undefined, but if NEXT_PUBLIC_ would expose
```
**Why**: Server variables are undefined in client, but if you add NEXT_PUBLIC_ it exposes secrets.

```typescript
// ✅ Correct: Use NEXT_PUBLIC_ only for public values
'use client'
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

### Mistake 2: Missing NEXT_PUBLIC_ Prefix
```typescript
// ❌ Wrong: No prefix, undefined in client
'use client'
const apiUrl = process.env.API_URL // undefined
```
**Why**: Client can't access variables without NEXT_PUBLIC_ prefix.

```typescript
// ✅ Correct: Add NEXT_PUBLIC_ prefix
'use client'
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

### Mistake 3: Using Client Variables for Secrets
```typescript
// ❌ Wrong: NEXT_PUBLIC_ with secret
NEXT_PUBLIC_API_KEY=secret-key // Exposed to browser!
```
**Why**: NEXT_PUBLIC_ variables are bundled and visible in browser.

```typescript
// ✅ Correct: Keep secrets server-only
API_KEY=secret-key // Server-only
```

## ✨ Best Practices

1. **Never expose secrets**: Never use NEXT_PUBLIC_ for secrets
2. **Use NEXT_PUBLIC_ sparingly**: Only for truly public values
3. **Separate concerns**: Create separate env files for server/client
4. **Validate on server**: Always validate server variables
5. **Document clearly**: Document which variables are client/server
6. **Type safety**: Use TypeScript for type safety

## 🔗 Related Concepts

- [Environment Files](./env-files.md) - Environment file setup
- [Security](../29-security/README.md) - Security best practices

## 📚 Resources

### Official Documentation
- [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## 🧪 Practice Exercises

### Exercise 1: Server Variables
**Difficulty**: Beginner  
**Goal**: Understand server variables  
**Instructions**:
1. Create server-only variables
2. Use in API routes
3. Verify client can't access
4. Test functionality

### Exercise 2: Client Variables
**Difficulty**: Intermediate  
**Goal**: Practice client variables  
**Instructions**:
1. Create NEXT_PUBLIC_ variables
2. Use in client components
3. Verify bundle inclusion
4. Test in browser

## 🎓 Key Takeaways

- Server variables: No prefix, server-only
- Client variables: NEXT_PUBLIC_ prefix, bundled
- Never expose secrets to client
- Use NEXT_PUBLIC_ sparingly
- Separate server and client concerns
- Validate and type variables

## ❓ FAQ

### Q: Can client access server variables?
**A**: No, server variables are undefined in client components.

### Q: Do NEXT_PUBLIC_ variables work on server?
**A**: Yes, they're accessible on both server and client.

### Q: Are NEXT_PUBLIC_ variables secure?
**A**: No, they're bundled and visible in browser. Never use for secrets.

### Q: How do I know if variable is server or client?
**A**: Server variables have no prefix, client variables have NEXT_PUBLIC_ prefix.

### Q: Can I use server variables in API routes?
**A**: Yes, API routes run on server, so all variables are accessible.

---

**Next Steps**: 
- Review: [Environment Files](./env-files.md) for setup
- Practice: Set up server and client variables
- Build: Secure your application

