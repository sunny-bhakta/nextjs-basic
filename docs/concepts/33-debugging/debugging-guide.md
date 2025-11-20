# Debugging

> **Category**: Advanced | **Related Concepts**: [Error Handling](../26-error-handling/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Debugging Next.js applications involves using development tools, source maps, logging strategies, and browser DevTools to identify and fix issues efficiently.

**Key Points:**
- VS Code debugging for server and client
- Source maps for readable stack traces
- Effective logging strategies
- Network debugging for API calls
- React DevTools for component debugging
- Chrome DevTools for browser debugging

## 🎯 When to Use

- **Development**: Debugging during development
- **Production Issues**: Investigating production bugs
- **Performance**: Identifying performance bottlenecks
- **API Issues**: Debugging API calls and responses
- **Component Issues**: Debugging React components
- **Build Errors**: Fixing build-time errors

## 💻 Basic Example

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Console Logging

```typescript
// app/page.tsx
export default function Page() {
  console.log('Server-side log')
  console.error('Error log')
  console.warn('Warning log')
  
  return <div>Page</div>
}
```

### Source Maps

```typescript
// next.config.js
module.exports = {
  productionBrowserSourceMaps: true, // Enable source maps in production
}
```

## 🔧 Advanced Example

### Advanced VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    },
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Structured Logging

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data)
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error)
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data)
  },
}

// Usage
logger.info('User logged in', { userId: '123' })
logger.error('Failed to fetch data', error)
```

### Network Debugging

```typescript
// lib/api-debug.ts
export async function debugFetch(url: string, options?: RequestInit) {
  const startTime = Date.now()
  console.log(`[FETCH] ${options?.method || 'GET'} ${url}`, options)
  
  try {
    const response = await fetch(url, options)
    const duration = Date.now() - startTime
    console.log(`[FETCH] ${response.status} ${url} (${duration}ms)`)
    
    const data = await response.json()
    console.log(`[FETCH] Response:`, data)
    
    return response
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[FETCH] Error ${url} (${duration}ms):`, error)
    throw error
  }
}
```

## 📋 Common Patterns

### Pattern 1: Conditional Logging
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info')
}
```
**When to use**: Logging only in development

### Pattern 2: Error Boundaries
```typescript
'use client'
import { ErrorBoundary } from 'react-error-boundary'
```
**When to use**: Catching and logging React errors

### Pattern 3: Debug Flags
```typescript
const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true'
if (DEBUG) console.log('Debug info')
```
**When to use**: Client-side debugging flags

## ⚠️ Common Mistakes

### Mistake 1: Logging Sensitive Data
```typescript
// ❌ Wrong: Logging sensitive information
console.log('User data:', { password: user.password, token: user.token })
```

```typescript
// ✅ Correct: Sanitize sensitive data
console.log('User data:', { id: user.id, email: user.email })
```
**Why**: Sensitive data in logs is a security risk.

### Mistake 2: Too Many Console Logs
```typescript
// ❌ Wrong: Excessive logging
console.log('Step 1')
console.log('Step 2')
console.log('Step 3')
// ... many more
```

```typescript
// ✅ Correct: Use structured logging
logger.info('Processing started', { step: 'initialization' })
```
**Why**: Too many logs make debugging harder.

### Mistake 3: Not Using Source Maps
```typescript
// ❌ Wrong: No source maps in production
module.exports = {
  productionBrowserSourceMaps: false,
}
```

```typescript
// ✅ Correct: Enable source maps
module.exports = {
  productionBrowserSourceMaps: true,
}
```
**Why**: Source maps help debug production issues.

## ✨ Best Practices

1. **Use VS Code debugger**: Set up proper debugging configuration
2. **Enable source maps**: For readable stack traces
3. **Structured logging**: Use consistent log format
4. **Sanitize logs**: Never log sensitive data
5. **Use React DevTools**: Debug component state
6. **Network debugging**: Log API calls and responses
7. **Error boundaries**: Catch and log React errors
8. **Production logging**: Use proper logging service

## 🔗 Related Concepts

- [Error Handling](../26-error-handling/README.md) - Error handling patterns
- [Configuration](../31-configuration/README.md) - Source maps configuration

## 📚 Resources

### Official Documentation
- [Debugging](https://nextjs.org/docs/app/building-your-application/configuring/debugging)
- [Source Maps](https://nextjs.org/docs/app/api-reference/next-config-js/productionBrowserSourceMaps)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

## 🎓 Key Takeaways

- VS Code debugging supports server and client
- Source maps enable readable production errors
- Structured logging improves debugging
- Never log sensitive information
- Use React DevTools for component debugging
- Network debugging helps with API issues
- Error boundaries catch React errors

