# Security Examples

This directory contains practical code examples demonstrating security practices in Next.js.

## Examples

### 1. Security Headers (`01-security-headers.ts`)
Demonstrates security headers:
- Header configuration
- Content Security Policy
- Security best practices

### 2. XSS Prevention (`02-xss-prevention.tsx`)
Shows XSS prevention:
- Input sanitization
- Safe rendering
- DOMPurify usage

### 3. CSRF Protection (`03-csrf-protection.ts`)
Demonstrates CSRF protection:
- Token generation
- Token validation
- API route protection

## How to Use

1. **Copy configuration**: Add to next.config.js
2. **Install dependencies**: DOMPurify, etc.
3. **Implement patterns**: Follow examples
4. **Test security**: Verify headers and protection

## Key Concepts

### Security Headers
- X-Frame-Options
- Content-Security-Policy
- X-Content-Type-Options

### XSS Prevention
- Input sanitization
- Safe rendering
- Content Security Policy

### CSRF Protection
- Token generation
- Token validation
- SameSite cookies

## Best Practices

1. **Set security headers**: Configure in next.config.js
2. **Validate input**: Use validation libraries
3. **Sanitize HTML**: Use DOMPurify
4. **Protect secrets**: Server-side only
5. **Use HTTPS**: Always in production

