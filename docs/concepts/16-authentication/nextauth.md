# NextAuth.js (Auth.js)

> **Category**: Intermediate | **Related Concepts**: [Session Management](./session-management.md), [Protected Routes](./protected-routes.md)  
> **Last Updated**: 2024

## 📖 Overview

NextAuth.js (now Auth.js) is a popular authentication library for Next.js. It provides a complete authentication solution with support for multiple providers, session management, and secure authentication flows.

**Key Points:**
- Multiple authentication providers
- Session management
- Secure by default
- TypeScript support
- Easy to integrate
- Works with App Router

## 🎯 When to Use

- **Complete Auth Solution**: When you need full authentication
- **Multiple Providers**: When supporting OAuth providers
- **Session Management**: When you need session handling
- **Quick Setup**: When you want quick authentication setup
- **Production Ready**: When you need production-ready auth

## 💻 Basic Example

### Basic Setup

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === 'user' && credentials?.password === 'pass') {
          return { id: '1', name: 'User', email: 'user@example.com' }
        }
        return null
      }
    })
  ],
})

export { handler as GET, handler as POST }
```

### Using in Components

```typescript
// app/components/UserButton.tsx
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function UserButton() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Loading...</p>
  
  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  
  return <button onClick={() => signIn()}>Sign in</button>
}
```

### Session Provider

```typescript
// app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
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

## 🔧 Advanced Example

### OAuth Provider

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
```

### Database Session

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
```

## 📋 Common Patterns

### Pattern 1: Credentials
```typescript
CredentialsProvider({
  async authorize(credentials) {
    // Verify credentials
    return user
  }
})
```
**When to use**: Email/password authentication

### Pattern 2: OAuth
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})
```
**When to use**: Social authentication

### Pattern 3: Database
```typescript
adapter: PrismaAdapter(prisma)
```
**When to use**: Persistent sessions

## ⚠️ Common Mistakes

### Mistake 1: Not Wrapping with SessionProvider
```typescript
// ❌ Wrong: No SessionProvider
'use client'
export default function Component() {
  const { data: session } = useSession() // Error
}
```
**Why**: useSession requires SessionProvider.

```typescript
// ✅ Correct: Wrap with SessionProvider
<SessionProvider>
  <Component />
</SessionProvider>
```

### Mistake 2: Missing Environment Variables
```typescript
// ❌ Wrong: No env vars
GoogleProvider({
  clientId: 'client-id', // Hardcoded
})
```
**Why**: Should use environment variables.

```typescript
// ✅ Correct: Use env vars
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
})
```

### Mistake 3: Not Handling Loading State
```typescript
// ❌ Wrong: No loading check
const { data: session } = useSession()
return <div>{session.user.email}</div> // Might be undefined
```
**Why**: Session loads asynchronously.

```typescript
// ✅ Correct: Check status
const { data: session, status } = useSession()
if (status === 'loading') return <div>Loading...</div>
if (!session) return <div>Not signed in</div>
return <div>{session.user.email}</div>
```

## ✨ Best Practices

1. **Use SessionProvider**: Wrap app with SessionProvider
2. **Environment variables**: Store secrets in env vars
3. **Handle loading**: Always check session status
4. **Secure callbacks**: Validate in callbacks
5. **Use adapters**: For database sessions
6. **Type safety**: Use TypeScript types

## 🔗 Related Concepts

- [Session Management](./session-management.md) - Managing sessions
- [Protected Routes](./protected-routes.md) - Securing routes
- [JWT Authentication](./jwt-authentication.md) - Token-based auth

## 📚 Resources

### Official Documentation
- [NextAuth.js](https://next-auth.js.org)
- [Auth.js](https://authjs.dev)

## 🧪 Practice Exercises

### Exercise 1: Basic Setup
**Difficulty**: Beginner  
**Goal**: Understand NextAuth setup  
**Instructions**:
1. Install NextAuth
2. Set up basic auth
3. Create login page
4. Test authentication

### Exercise 2: OAuth Provider
**Difficulty**: Intermediate  
**Goal**: Practice OAuth integration  
**Instructions**:
1. Set up OAuth provider
2. Configure callbacks
3. Test OAuth flow
4. Handle sessions

## 🎓 Key Takeaways

- NextAuth provides complete auth solution
- Support for multiple providers
- Session management included
- Secure by default
- Works with App Router
- TypeScript support

## ❓ FAQ

### Q: How do I install NextAuth?
**A**: Run `npm install next-auth` and set up the API route.

### Q: Can I use with App Router?
**A**: Yes, NextAuth works with App Router using route handlers.

### Q: How do I protect routes?
**A**: Use middleware or server-side session checks.

### Q: Can I use multiple providers?
**A**: Yes, add multiple providers to the providers array.

### Q: How do I customize the session?
**A**: Use callbacks to customize JWT and session.

---

**Next Steps**: 
- Review: [Session Management](./session-management.md) for sessions
- Practice: Set up authentication
- Build: Secure your application

