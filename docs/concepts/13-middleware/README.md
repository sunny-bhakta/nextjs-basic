# Middleware

> **Category**: Intermediate | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [Routing](../01-routing/README.md), [Authentication](../16-authentication/README.md)  
> **Status**: ⏳ Not Started

## Overview

Middleware allows you to run code before a request is completed. You can modify the request/response, redirect, rewrite URLs, and more.

## Key Topics

- [Middleware Basics](./middleware-basics.md) - Creating middleware
- Request/Response Manipulation - Modifying requests and responses
- Redirects and Rewrites - URL manipulation
- Authentication Checks - Protecting routes
- Edge Runtime - Running on the Edge

## Quick Start

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: '/about/:path*',
}
```

## Learning Path

1. Understand [Middleware Basics](./middleware-basics.md)
2. Learn request/response manipulation
3. Practice authentication
4. Implement redirects/rewrites

## Detailed Guides

- **[Middleware Basics](./middleware-basics.md)** - Creating and using middleware

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Basic Middleware](./examples/01-basic-middleware.ts)** - Basic middleware examples
- **[Authentication Middleware](./examples/02-auth-middleware.ts)** - Auth protection examples

See [examples/README.md](./examples/README.md) for detailed descriptions.

## Resources

- [Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

**Previous**: [Environment Variables](../12-environment-variables/README.md) | **Next**: [Redirects & Rewrites](../14-redirects-rewrites/README.md)

