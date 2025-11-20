# Security

> **Category**: Advanced | **Related Concepts**: [Authentication](../16-authentication/README.md), [Configuration](../31-configuration/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Security in Next.js involves protecting your application from common vulnerabilities like XSS, CSRF, and ensuring secure data handling. Next.js provides built-in security features and best practices.

**Key Points:**
- Security headers configuration
- XSS prevention
- CSRF protection
- Secure environment variables
- Content Security Policy
- Input validation

## 🎯 When to Use

- **All Applications**: Security is essential
- **User Input**: Sanitize and validate
- **API Routes**: Protect endpoints
- **Authentication**: Secure user data
- **Data Handling**: Protect sensitive data

## 💻 Basic Example

### Security Headers

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

### Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]
```

## 🔧 Advanced Example

### Input Sanitization

```typescript
// app/lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href']
  })
}
```

### CSRF Protection

```typescript
// app/lib/csrf.ts
import { randomBytes } from 'crypto'

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken
}
```

## 📋 Common Patterns

### Pattern 1: Security Headers
```typescript
async headers() {
  return [{ source: '/:path*', headers: securityHeaders }]
}
```
**When to use**: All applications

### Pattern 2: Input Validation
```typescript
const schema = z.object({ email: z.string().email() })
const result = schema.parse(input)
```
**When to use**: User input

### Pattern 3: Environment Variables
```typescript
const secret = process.env.SECRET_KEY
if (!secret) throw new Error('Missing secret')
```
**When to use**: Sensitive data

## ⚠️ Common Mistakes

### Mistake 1: Exposing Secrets
```typescript
// ❌ Wrong: Exposing secret in client
const apiKey = process.env.API_KEY
```

```typescript
// ✅ Correct: Use server-side only
const apiKey = process.env.API_KEY // Server-side only
```
**Why**: Client-side env vars are exposed.

### Mistake 2: Not Validating Input
```typescript
// ❌ Wrong: No validation
const userInput = req.body.data
await saveToDb(userInput)
```

```typescript
// ✅ Correct: Validate input
const schema = z.object({ name: z.string().min(1) })
const validated = schema.parse(req.body.data)
await saveToDb(validated)
```
**Why**: Unvalidated input can cause security issues.

## ✨ Best Practices

1. **Set security headers**: Configure in next.config.js
2. **Validate input**: Use Zod or similar
3. **Sanitize HTML**: Use DOMPurify
4. **Protect secrets**: Never expose in client
5. **Use HTTPS**: Always in production
6. **Rate limiting**: Prevent abuse
7. **Regular updates**: Keep dependencies updated

## 🔗 Related Concepts

- [Authentication](../16-authentication/README.md) - User authentication
- [Configuration](../31-configuration/README.md) - App configuration

## 📚 Resources

### Official Documentation
- [Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

## 🎓 Key Takeaways

- Configure security headers
- Validate and sanitize input
- Protect environment variables
- Use Content Security Policy
- Implement CSRF protection
- Keep dependencies updated

