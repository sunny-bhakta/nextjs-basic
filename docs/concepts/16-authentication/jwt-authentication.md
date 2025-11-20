# JWT Authentication

> **Category**: Intermediate | **Related Concepts**: [NextAuth.js](./nextauth.md), [Protected Routes](./protected-routes.md)  
> **Last Updated**: 2024

## 📖 Overview

JWT (JSON Web Token) authentication is a token-based authentication method. Users receive a token after login, which they include in subsequent requests. This is stateless and works well for APIs and SPAs.

**Key Points:**
- Token-based authentication
- Stateless
- Secure token storage
- Token expiration
- Refresh tokens
- API-friendly

## 🎯 When to Use

- **API Authentication**: When building APIs
- **Stateless Auth**: When you need stateless authentication
- **SPA**: Single Page Applications
- **Microservices**: Distributed systems
- **Mobile Apps**: Mobile application authentication

## 💻 Basic Example

### Login Route

```typescript
// app/api/auth/login/route.ts
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  // Verify credentials
  const user = await verifyUser(email, password)
  
  if (!user) {
    return Response.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }
  
  // Create JWT token
  const token = sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )
  
  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  })
  
  return Response.json({ success: true, token })
}
```

### Verify Token

```typescript
// lib/auth.ts
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    return null
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as {
      userId: string
      email: string
    }
    
    return decoded
  } catch (error) {
    return null
  }
}
```

### Protected Route

```typescript
// app/api/protected/route.ts
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  const user = await getCurrentUser()
  
  if (!user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData(user.userId)
  return Response.json({ data })
}
```

## 🔧 Advanced Example

### Refresh Token

```typescript
// app/api/auth/login/route.ts
import { sign } from 'jsonwebtoken'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const user = await verifyUser(email, password)
  
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  
  // Access token (short-lived)
  const accessToken = sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  )
  
  // Refresh token (long-lived)
  const refreshToken = sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  )
  
  // Store refresh token in database
  await storeRefreshToken(user.id, refreshToken)
  
  const cookieStore = await cookies()
  cookieStore.set('access-token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 15 * 60, // 15 minutes
  })
  
  cookieStore.set('refresh-token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
  
  return Response.json({ success: true })
}
```

### Token Refresh

```typescript
// app/api/auth/refresh/route.ts
import { verify, sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh-token')?.value
  
  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 })
  }
  
  try {
    const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
      userId: string
    }
    
    // Verify token exists in database
    const isValid = await verifyRefreshToken(decoded.userId, refreshToken)
    
    if (!isValid) {
      return Response.json({ error: 'Invalid refresh token' }, { status: 401 })
    }
    
    // Generate new access token
    const accessToken = sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    )
    
    cookieStore.set('access-token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 15 * 60,
    })
    
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Invalid token' }, { status: 401 })
  }
}
```

## 📋 Common Patterns

### Pattern 1: Simple JWT
```typescript
const token = sign({ userId }, secret, { expiresIn: '1h' })
```
**When to use**: Simple token-based auth

### Pattern 2: Refresh Tokens
```typescript
// Access token + refresh token
const accessToken = sign({ userId }, secret, { expiresIn: '15m' })
const refreshToken = sign({ userId }, refreshSecret, { expiresIn: '7d' })
```
**When to use**: When you need token refresh

### Pattern 3: Token in Header
```typescript
const token = request.headers.get('authorization')?.replace('Bearer ', '')
```
**When to use**: API authentication

## ⚠️ Common Mistakes

### Mistake 1: Not Validating Token
```typescript
// ❌ Wrong: Not verifying token
const token = request.headers.get('authorization')
const user = decode(token) // Not verified!
```
**Why**: Always verify token signature.

```typescript
// ✅ Correct: Verify token
const token = request.headers.get('authorization')?.replace('Bearer ', '')
const decoded = verify(token, process.env.JWT_SECRET!)
```

### Mistake 2: Storing Token in localStorage
```typescript
// ❌ Wrong: localStorage (XSS vulnerable)
localStorage.setItem('token', token)
```
**Why**: localStorage is vulnerable to XSS.

```typescript
// ✅ Correct: HttpOnly cookie
cookieStore.set('token', token, { httpOnly: true })
```

### Mistake 3: Not Handling Expiration
```typescript
// ❌ Wrong: No expiration check
const decoded = verify(token, secret) // Might be expired
```
**Why**: Verify handles expiration, but handle errors.

```typescript
// ✅ Correct: Handle expiration
try {
  const decoded = verify(token, secret)
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    // Refresh token
  }
}
```

## ✨ Best Practices

1. **Verify tokens**: Always verify token signature
2. **Use HttpOnly cookies**: For web apps
3. **Set expiration**: Use short-lived tokens
4. **Use refresh tokens**: For better security
5. **Store securely**: Never expose secrets
6. **Handle errors**: Always handle token errors

## 🔗 Related Concepts

- [NextAuth.js](./nextauth.md) - Complete auth solution
- [Protected Routes](./protected-routes.md) - Securing routes
- [Session Management](./session-management.md) - Session handling

## 📚 Resources

### Official Documentation
- [JWT](https://jwt.io)

## 🧪 Practice Exercises

### Exercise 1: Basic JWT
**Difficulty**: Beginner  
**Goal**: Understand JWT authentication  
**Instructions**:
1. Create login endpoint
2. Generate JWT token
3. Verify token
4. Protect routes

### Exercise 2: Refresh Tokens
**Difficulty**: Intermediate  
**Goal**: Practice refresh tokens  
**Instructions**:
1. Implement refresh tokens
2. Create refresh endpoint
3. Handle token expiration
4. Test refresh flow

## 🎓 Key Takeaways

- JWT is token-based authentication
- Verify tokens on every request
- Use HttpOnly cookies for storage
- Set appropriate expiration
- Use refresh tokens for security
- Handle token errors gracefully

## ❓ FAQ

### Q: Where should I store JWT tokens?
**A**: HttpOnly cookies for web apps, secure storage for mobile.

### Q: How long should tokens last?
**A**: Access tokens: 15 minutes, refresh tokens: 7 days.

### Q: Do I need refresh tokens?
**A**: Recommended for better security, but not required.

### Q: How do I verify tokens?
**A**: Use `verify()` function from jsonwebtoken library.

### Q: Can I use JWT with NextAuth?
**A**: Yes, NextAuth uses JWT by default.

---

**Next Steps**: 
- Review: [Protected Routes](./protected-routes.md) for route protection
- Practice: Implement JWT authentication
- Build: Secure your API with JWT

