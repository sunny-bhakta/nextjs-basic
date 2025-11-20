# API Authentication

> **Category**: Core | **Related Concepts**: [Route Handlers](./route-handlers.md), [Authentication](../16-authentication/README.md)  
> **Last Updated**: 2024

## 📖 Overview

API Authentication in Route Handlers involves verifying user identity and authorizing access to protected endpoints. Common methods include API keys, JWT tokens, session cookies, and OAuth.

**Key Points:**
- Verify user identity before processing requests
- Protect sensitive endpoints
- Use secure authentication methods
- Validate tokens and credentials
- Handle unauthorized requests
- Set appropriate security headers

## 🎯 When to Use

- **Protected Endpoints**: Endpoints that require authentication
- **User-Specific Data**: Data that belongs to specific users
- **Admin Operations**: Administrative functions
- **API Security**: Securing your API
- **Rate Limiting**: Limiting requests per user
- **Audit Logging**: Tracking who accessed what

## 💻 Basic Example

### API Key Authentication

```typescript
// app/api/protected/route.ts
function verifyApiKey(apiKey: string): boolean {
  return apiKey === process.env.API_KEY
}

export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey || !verifyApiKey(apiKey)) {
    return Response.json(
      { error: 'Invalid API key' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData()
  return Response.json({ data })
}
```

### JWT Token Authentication

```typescript
// app/api/protected/route.ts
import { verify } from 'jsonwebtoken'

async function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return Response.json(
      { error: 'Authorization required' },
      { status: 401 }
    )
  }
  
  const token = authHeader.substring(7)
  const user = await verifyToken(token)
  
  if (!user) {
    return Response.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
  
  const data = await getUserData(user.id)
  return Response.json({ data })
}
```

### Cookie-Based Authentication

```typescript
// app/api/user/route.ts
import { cookies } from 'next/headers'

async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')?.value
  
  if (!sessionId) {
    return null
  }
  
  const session = await getSessionFromDb(sessionId)
  return session
}

export async function GET(request: Request) {
  const session = await getSession()
  
  if (!session) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const user = await getUser(session.userId)
  return Response.json({ user })
}
```

## 🔧 Advanced Example

### Authentication Middleware Pattern

```typescript
// app/lib/auth.ts
export async function authenticateRequest(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'No token provided', user: null }
  }
  
  const token = authHeader.substring(7)
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    const user = await getUserById(decoded.userId)
    
    if (!user) {
      return { error: 'User not found', user: null }
    }
    
    return { error: null, user }
  } catch (error) {
    return { error: 'Invalid token', user: null }
  }
}

// app/api/protected/route.ts
import { authenticateRequest } from '@/lib/auth'

export async function GET(request: Request) {
  const { error, user } = await authenticateRequest(request)
  
  if (error || !user) {
    return Response.json(
      { error: error || 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData(user.id)
  return Response.json({ data })
}
```

### Role-Based Authorization

```typescript
// app/lib/auth.ts
export async function requireAuth(request: Request) {
  const { user, error } = await authenticateRequest(request)
  
  if (error || !user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

export function requireRole(user: any, role: string) {
  if (user.role !== role && user.role !== 'admin') {
    throw new Error('Forbidden')
  }
}

// app/api/admin/users/route.ts
import { requireAuth, requireRole } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request)
    requireRole(user, 'admin')
    
    const users = await getAllUsers()
    return Response.json({ users })
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: error.message === 'Unauthorized' ? 401 : 403 }
    )
  }
}
```

### Rate Limiting with Authentication

```typescript
// app/lib/rate-limit.ts
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(userId: string, limit: number = 100, window: number = 60000) {
  const now = Date.now()
  const userLimit = rateLimitMap.get(userId)
  
  if (!userLimit || now > userLimit.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + window })
    return { allowed: true, remaining: limit - 1 }
  }
  
  if (userLimit.count >= limit) {
    return { allowed: false, remaining: 0 }
  }
  
  userLimit.count++
  return { allowed: true, remaining: limit - userLimit.count }
}

// app/api/data/route.ts
import { authenticateRequest } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

export async function GET(request: Request) {
  const { user, error } = await authenticateRequest(request)
  
  if (error || !user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const rateLimit = checkRateLimit(user.id, 100, 60000)
  
  if (!rateLimit.allowed) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }
  
  const data = await getData()
  return Response.json({ data }, {
    headers: {
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
    },
  })
}
```

## 📋 Common Patterns

### Pattern 1: Bearer Token
```typescript
const token = request.headers.get('authorization')?.replace('Bearer ', '')
```
**When to use**: JWT or OAuth tokens

### Pattern 2: API Key Header
```typescript
const apiKey = request.headers.get('x-api-key')
```
**When to use**: Simple API key authentication

### Pattern 3: Cookie Session
```typescript
const cookieStore = await cookies()
const sessionId = cookieStore.get('session-id')?.value
```
**When to use**: Web applications with sessions

## ⚠️ Common Mistakes

### Mistake 1: Not Validating Tokens
```typescript
// ❌ Wrong: Not verifying token
export async function GET(request: Request) {
  const token = request.headers.get('authorization')
  const user = getUserFromToken(token) // Not verified!
}
```
**Why**: Unverified tokens are a security risk.

```typescript
// ✅ Correct: Verify token
export async function GET(request: Request) {
  const token = request.headers.get('authorization')
  const user = await verifyToken(token) // Verified
  if (!user) return Response.json({ error: 'Invalid token' }, { status: 401 })
}
```

### Mistake 2: Exposing Secrets
```typescript
// ❌ Wrong: Hardcoded secrets
const SECRET = 'my-secret-key' // Exposed in code
```
**Why**: Secrets should be in environment variables.

```typescript
// ✅ Correct: Use environment variables
const SECRET = process.env.JWT_SECRET // From .env
```

### Mistake 3: Not Handling Expired Tokens
```typescript
// ❌ Wrong: No expiration check
const decoded = verify(token, secret) // Might be expired
```
**Why**: Expired tokens should be rejected.

```typescript
// ✅ Correct: Check expiration
try {
  const decoded = verify(token, secret, { maxAge: '1h' })
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    return Response.json({ error: 'Token expired' }, { status: 401 })
  }
}
```

## ✨ Best Practices

1. **Always verify**: Verify all tokens and credentials
2. **Use environment variables**: Never hardcode secrets
3. **Set secure headers**: Use security headers
4. **Handle errors**: Return appropriate error responses
5. **Rate limiting**: Implement rate limiting
6. **HTTPS only**: Always use HTTPS in production
7. **Token expiration**: Use short-lived tokens

## 🔗 Related Concepts

- [Route Handlers](./route-handlers.md) - Creating handlers
- [Authentication](../16-authentication/README.md) - General authentication
- [Security](../29-security/README.md) - Security best practices

## 📚 Resources

### Official Documentation
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🧪 Practice Exercises

### Exercise 1: API Key Authentication
**Difficulty**: Beginner  
**Goal**: Understand basic authentication  
**Instructions**:
1. Create protected endpoint
2. Add API key verification
3. Handle unauthorized requests
4. Test authentication

### Exercise 2: JWT Authentication
**Difficulty**: Intermediate  
**Goal**: Practice JWT authentication  
**Instructions**:
1. Create JWT verification
2. Add protected endpoints
3. Handle token expiration
4. Implement refresh tokens

## 🎓 Key Takeaways

- Always verify authentication tokens
- Use environment variables for secrets
- Handle unauthorized requests properly
- Implement rate limiting
- Use secure headers
- Check token expiration
- Never expose secrets in code

## ❓ FAQ

### Q: How do I verify JWT tokens?
**A**: Use a JWT library like `jsonwebtoken` to verify tokens with your secret.

### Q: Should I use API keys or JWT?
**A**: API keys for server-to-server, JWT for user authentication.

### Q: How do I handle token expiration?
**A**: Check token expiration when verifying, return 401 if expired.

### Q: Can I use cookies for API authentication?
**A**: Yes, but ensure they're HttpOnly and Secure for security.

### Q: How do I implement rate limiting?
**A**: Track requests per user/IP and reject if limit exceeded.

---

**Next Steps**: 
- Review: [Error Handling](./error-handling.md) for error responses
- Practice: Create authenticated API endpoints
- Build: A secure API with authentication

