# Session Management

> **Category**: Intermediate | **Related Concepts**: [NextAuth.js](./nextauth.md), [Protected Routes](./protected-routes.md)  
> **Last Updated**: 2024

## 📖 Overview

Session management involves storing and managing user session data. Next.js supports multiple session strategies: JWT sessions, database sessions, and custom session storage.

**Key Points:**
- JWT sessions (stateless)
- Database sessions (stateful)
- Session storage
- Session expiration
- Session security
- Session refresh

## 🎯 When to Use

- **User Sessions**: When you need to track user sessions
- **Session Data**: When storing session-specific data
- **Security**: When you need secure session handling
- **Scalability**: When you need scalable sessions
- **Persistence**: When sessions need to persist

## 💻 Basic Example

### JWT Session

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      // ... provider config
    }),
  ],
})

export { handler as GET, handler as POST }
```

### Database Session

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
  },
  providers: [
    // ... providers
  ],
})

export { handler as GET, handler as POST }
```

### Custom Session Storage

```typescript
// lib/session.ts
import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')?.value
  
  if (!sessionId) {
    return null
  }
  
  // Get session from database
  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })
  
  if (!session || session.expiresAt < new Date()) {
    return null
  }
  
  return session
}

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  
  await db.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt,
    },
  })
  
  const cookieStore = await cookies()
  cookieStore.set('session-id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
  })
  
  return sessionId
}
```

## 🔧 Advanced Example

### Session with Custom Data

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.permissions = user.permissions
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.permissions = token.permissions as string[]
      }
      return session
    },
  },
})
```

### Session Refresh

```typescript
// app/api/auth/refresh/route.ts
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'

export async function POST() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')?.value
  
  if (!sessionId) {
    return Response.json({ error: 'No session' }, { status: 401 })
  }
  
  const session = await db.session.findUnique({
    where: { id: sessionId },
  })
  
  if (!session || session.expiresAt < new Date()) {
    return Response.json({ error: 'Session expired' }, { status: 401 })
  }
  
  // Extend session
  const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await db.session.update({
    where: { id: sessionId },
    data: { expiresAt: newExpiresAt },
  })
  
  return Response.json({ success: true })
}
```

## 📋 Common Patterns

### Pattern 1: JWT Session
```typescript
session: { strategy: 'jwt' }
```
**When to use**: Stateless sessions

### Pattern 2: Database Session
```typescript
adapter: PrismaAdapter(prisma)
session: { strategy: 'database' }
```
**When to use**: Persistent sessions

### Pattern 3: Custom Session
```typescript
// Custom session storage
const session = await getSession()
```
**When to use**: Custom requirements

## ⚠️ Common Mistakes

### Mistake 1: Not Setting Expiration
```typescript
// ❌ Wrong: No expiration
session: {
  strategy: 'jwt',
  // No maxAge
}
```
**Why**: Sessions should expire for security.

```typescript
// ✅ Correct: Set expiration
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

### Mistake 2: Storing Sensitive Data
```typescript
// ❌ Wrong: Sensitive data in session
token.password = user.password
```
**Why**: Don't store sensitive data in sessions.

```typescript
// ✅ Correct: Only store necessary data
token.id = user.id
token.email = user.email
```

### Mistake 3: Not Refreshing Sessions
```typescript
// ❌ Wrong: No session refresh
// Sessions expire and user gets logged out
```
**Why**: Refresh sessions to keep users logged in.

```typescript
// ✅ Correct: Refresh sessions
await refreshSession(sessionId)
```

## ✨ Best Practices

1. **Set expiration**: Always set session expiration
2. **Use secure storage**: HttpOnly cookies
3. **Refresh sessions**: Extend sessions on activity
4. **Clean up**: Remove expired sessions
5. **Limit data**: Don't store sensitive data
6. **Validate sessions**: Always validate session data

## 🔗 Related Concepts

- [NextAuth.js](./nextauth.md) - Session management
- [Protected Routes](./protected-routes.md) - Using sessions
- [JWT Authentication](./jwt-authentication.md) - JWT sessions

## 📚 Resources

### Official Documentation
- [NextAuth.js Sessions](https://next-auth.js.org/configuration/options#session)

## 🧪 Practice Exercises

### Exercise 1: Basic Session
**Difficulty**: Beginner  
**Goal**: Understand session management  
**Instructions**:
1. Set up JWT session
2. Store session data
3. Retrieve session
4. Test session expiration

### Exercise 2: Database Session
**Difficulty**: Intermediate  
**Goal**: Practice database sessions  
**Instructions**:
1. Set up database adapter
2. Store sessions in database
3. Handle session expiration
4. Test session persistence

## 🎓 Key Takeaways

- JWT sessions are stateless
- Database sessions are persistent
- Set appropriate expiration
- Use secure storage
- Refresh sessions regularly
- Clean up expired sessions

## ❓ FAQ

### Q: What's the difference between JWT and database sessions?
**A**: JWT is stateless (token-based), database is stateful (stored in DB).

### Q: How long should sessions last?
**A**: Typically 7-30 days, depending on security requirements.

### Q: Do I need to refresh sessions?
**A**: Yes, refresh sessions on user activity to keep them logged in.

### Q: Can I store custom data in sessions?
**A**: Yes, use callbacks to add custom data to JWT or session.

### Q: How do I invalidate sessions?
**A**: Remove from database or blacklist JWT tokens.

---

**Next Steps**: 
- Review: [Protected Routes](./protected-routes.md) for route protection
- Practice: Implement session management
- Build: Secure session handling

