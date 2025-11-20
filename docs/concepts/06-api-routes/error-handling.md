# Error Handling in API Routes

> **Category**: Core | **Related Concepts**: [Route Handlers](./route-handlers.md), [Error Handling](../26-error-handling/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Proper error handling in API routes ensures your API returns consistent, helpful error responses and doesn't crash when something goes wrong. Good error handling improves API reliability and developer experience.

**Key Points:**
- Handle errors gracefully
- Return consistent error formats
- Use appropriate HTTP status codes
- Log errors for debugging
- Provide helpful error messages
- Don't expose sensitive information

## 🎯 When to Use

- **All API Routes**: Every route should handle errors
- **External API Calls**: When calling external services
- **Database Operations**: When querying databases
- **Validation Errors**: When input validation fails
- **Authentication Errors**: When auth fails
- **Unexpected Errors**: Catch-all error handling

## 💻 Basic Example

### Basic Error Handling

```typescript
// app/api/users/route.ts
export async function GET() {
  try {
    const users = await getUsers()
    return Response.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
```

### Validation Error Handling

```typescript
// app/api/users/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation
    if (!body.name || !body.email) {
      return Response.json(
        { 
          error: 'Validation failed',
          details: {
            name: body.name ? null : 'Name is required',
            email: body.email ? null : 'Email is required'
          }
        },
        { status: 400 }
      )
    }
    
    const user = await createUser(body)
    return Response.json({ user }, { status: 201 })
  } catch (error) {
    if (error.code === 'DUPLICATE_EMAIL') {
      return Response.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }
    
    return Response.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

### Not Found Error

```typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(params.id)
    
    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return Response.json({ user })
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
```

## 🔧 Advanced Example

### Custom Error Class

```typescript
// app/lib/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(400, message, details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(404, `${resource} not found`)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message)
    this.name = 'UnauthorizedError'
  }
}

// app/api/users/route.ts
import { ValidationError, NotFoundError } from '@/lib/errors'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name) {
      throw new ValidationError('Name is required', { field: 'name' })
    }
    
    const user = await createUser(body)
    return Response.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(
        { error: error.message, details: error.details },
        { status: error.statusCode }
      )
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Error Handler Utility

```typescript
// app/lib/error-handler.ts
export function handleApiError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof ApiError) {
    return Response.json(
      { 
        error: error.message,
        details: error.details,
        code: error.name
      },
      { status: error.statusCode }
    )
  }
  
  if (error instanceof Error) {
    // Don't expose internal errors in production
    const message = process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message
    
    return Response.json(
      { error: message },
      { status: 500 }
    )
  }
  
  return Response.json(
    { error: 'Unknown error occurred' },
    { status: 500 }
  )
}

// app/api/users/route.ts
import { handleApiError } from '@/lib/error-handler'

export async function GET() {
  try {
    const users = await getUsers()
    return Response.json({ users })
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Error Logging

```typescript
// app/lib/logger.ts
export function logError(error: Error, context?: any) {
  const errorLog = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  }
  
  // Log to error tracking service
  if (process.env.ERROR_TRACKING_URL) {
    fetch(process.env.ERROR_TRACKING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorLog),
    }).catch(console.error)
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', errorLog)
  }
}

// app/api/users/route.ts
import { logError } from '@/lib/logger'

export async function GET() {
  try {
    const users = await getUsers()
    return Response.json({ users })
  } catch (error) {
    logError(error as Error, { endpoint: '/api/users', method: 'GET' })
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
```

## 📋 Common Patterns

### Pattern 1: Try-Catch
```typescript
try {
  // Operation
} catch (error) {
  return Response.json({ error: 'Failed' }, { status: 500 })
}
```
**When to use**: Basic error handling

### Pattern 2: Custom Error Classes
```typescript
throw new ValidationError('Invalid input')
// Handle with instanceof check
```
**When to use**: Structured error handling

### Pattern 3: Error Handler Utility
```typescript
catch (error) {
  return handleApiError(error)
}
```
**When to use**: Consistent error responses

## ⚠️ Common Mistakes

### Mistake 1: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
export async function GET() {
  const users = await getUsers() // Might throw
  return Response.json({ users })
}
```
**Why**: Unhandled errors crash the route.

```typescript
// ✅ Correct: Handle errors
export async function GET() {
  try {
    const users = await getUsers()
    return Response.json({ users })
  } catch (error) {
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}
```

### Mistake 2: Exposing Internal Errors
```typescript
// ❌ Wrong: Exposing stack traces
catch (error) {
  return Response.json({ 
    error: error.message,
    stack: error.stack // Exposes internal details
  })
}
```
**Why**: Security risk - exposes internal structure.

```typescript
// ✅ Correct: Hide internal errors
catch (error) {
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : error.message
  
  return Response.json({ error: message }, { status: 500 })
}
```

### Mistake 3: Wrong Status Codes
```typescript
// ❌ Wrong: Always 500
catch (error) {
  return Response.json({ error: 'Not found' }, { status: 500 })
}
```
**Why**: Wrong status codes confuse API consumers.

```typescript
// ✅ Correct: Use appropriate status codes
if (error instanceof NotFoundError) {
  return Response.json({ error: 'Not found' }, { status: 404 })
}
```

## ✨ Best Practices

1. **Always handle errors**: Wrap operations in try-catch
2. **Use proper status codes**: 400, 401, 404, 500, etc.
3. **Consistent error format**: Use same structure for all errors
4. **Log errors**: Log for debugging but don't expose to users
5. **Custom error classes**: Create specific error types
6. **Validation errors**: Return 400 with details
7. **Hide internal errors**: Don't expose stack traces in production

## 🔗 Related Concepts

- [Route Handlers](./route-handlers.md) - Creating handlers
- [Error Handling](../26-error-handling/README.md) - General error handling
- [Security](../29-security/README.md) - Security practices

## 📚 Resources

### Official Documentation
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🧪 Practice Exercises

### Exercise 1: Basic Error Handling
**Difficulty**: Beginner  
**Goal**: Understand error handling  
**Instructions**:
1. Create API routes with error handling
2. Handle different error types
3. Return appropriate status codes
4. Test error scenarios

### Exercise 2: Advanced Error Handling
**Difficulty**: Intermediate  
**Goal**: Practice structured error handling  
**Instructions**:
1. Create custom error classes
2. Implement error handler utility
3. Add error logging
4. Test all error scenarios

## 🎓 Key Takeaways

- Always handle errors in API routes
- Use appropriate HTTP status codes
- Return consistent error formats
- Log errors for debugging
- Don't expose internal errors in production
- Use custom error classes for structure
- Validate input and return validation errors

## ❓ FAQ

### Q: What status code for validation errors?
**A**: Use 400 (Bad Request) for validation errors.

### Q: Should I log all errors?
**A**: Yes, log errors for debugging, but don't expose details to users.

### Q: How do I handle database errors?
**A**: Catch database errors and return appropriate API errors without exposing DB details.

### Q: What's a good error response format?
**A**: `{ error: string, details?: any }` is a common format.

### Q: Should I expose stack traces?
**A**: Only in development. Hide in production for security.

---

**Next Steps**: 
- Review: [Route Handlers](./route-handlers.md) for handler basics
- Practice: Add error handling to your API
- Build: A robust API with comprehensive error handling

