# Authentication

> **Category**: Intermediate | **Priority**: 🔴 High | **Difficulty**: Intermediate  
> **Related Concepts**: [Middleware](../13-middleware/README.md), [API Routes](../06-api-routes/README.md)  
> **Status**: ⏳ Not Started

## Overview

Implementing authentication in Next.js involves protecting routes, managing sessions, and integrating with authentication providers.

## Key Topics

- [NextAuth.js](./nextauth.md) - Popular authentication library
- [JWT Authentication](./jwt-authentication.md) - Token-based auth
- [Session Management](./session-management.md) - Managing user sessions
- [OAuth Providers](./oauth-providers.md) - Google, GitHub, etc.
- [Protected Routes](./protected-routes.md) - Securing pages and API routes

## Quick Start

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
```

## Learning Path

1. Start with [NextAuth.js](./nextauth.md)
2. Learn [OAuth Providers](./oauth-providers.md)
3. Understand [Session Management](./session-management.md)
4. Implement [Protected Routes](./protected-routes.md)
5. Explore [JWT Authentication](./jwt-authentication.md)

## Detailed Guides

- **[NextAuth.js](./nextauth.md)** - Complete authentication solution
- **[JWT Authentication](./jwt-authentication.md)** - Token-based authentication
- **[Session Management](./session-management.md)** - Managing user sessions
- **[OAuth Providers](./oauth-providers.md)** - Social authentication
- **[Protected Routes](./protected-routes.md)** - Securing routes

## Examples

See the [examples](./examples/) folder for working code samples:

- **[NextAuth Setup](./examples/01-nextauth-setup.tsx)** - Basic NextAuth setup
- **[OAuth Providers](./examples/02-oauth-providers.tsx)** - OAuth integration
- **[Protected Routes](./examples/03-protected-routes.tsx)** - Route protection
- **[JWT Authentication](./examples/04-jwt-authentication.ts)** - JWT auth
- **[Complete Example](./examples/05-complete-example.tsx)** - Comprehensive auth setup

See [examples/README.md](./examples/README.md) for detailed descriptions and usage instructions.

## Resources

- [NextAuth.js](https://next-auth.js.org)
- [Authentication Patterns](https://nextjs.org/docs/app/building-your-application/authentication)

---

**Previous**: [Internationalization](../15-internationalization/README.md) | **Next**: [State Management](../17-state-management/README.md)

