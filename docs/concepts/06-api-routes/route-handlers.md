# Route Handlers

> **Category**: Core | **Related Concepts**: [HTTP Methods](./http-methods.md), [Request/Response](./request-response.md)  
> **Last Updated**: 2024

## 📖 Overview

Route Handlers are the App Router way to create API endpoints. They use the `route.ts` (or `route.js`) file convention and allow you to create custom request handlers for a given route using the Web Request and Response APIs.

**Key Points:**
- Created with `route.ts` files in `app/` directory
- Use Web Request and Response APIs
- Support all HTTP methods
- Can run on Node.js or Edge runtime
- Type-safe with TypeScript
- No need for separate API directory

## 🎯 When to Use

- **API Endpoints**: Create RESTful API endpoints
- **Form Handling**: Process form submissions
- **Webhooks**: Handle webhook callbacks
- **Data Mutations**: Create, update, delete operations
- **Third-Party Integrations**: Integrate with external APIs
- **Custom Logic**: Server-side logic that doesn't fit in Server Components

## 💻 Basic Example

### Simple GET Handler

```typescript
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello, Next.js!' })
}
```

### Multiple HTTP Methods

```typescript
// app/api/users/route.ts
export async function GET() {
  const users = await fetchUsers()
  return Response.json({ users })
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return Response.json({ user }, { status: 201 })
}
```

### Dynamic Route Handler

```typescript
// app/api/users/[id]/route.ts
interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  const user = await getUserById(params.id)
  
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  return Response.json({ user })
}

export async function PUT(request: Request, { params }: RouteParams) {
  const body = await request.json()
  const user = await updateUser(params.id, body)
  return Response.json({ user })
}

export async function DELETE(request: Request, { params }: RouteParams) {
  await deleteUser(params.id)
  return Response.json({ message: 'User deleted' }, { status: 200 })
}
```

## 🔧 Advanced Example

### Route Handler with Authentication

```typescript
// app/api/protected/route.ts
import { cookies } from 'next/headers'

async function verifyAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    return null
  }
  
  // Verify token
  const user = await verifyToken(token)
  return user
}

export async function GET(request: Request) {
  const user = await verifyAuth()
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const data = await getProtectedData(user.id)
  return Response.json({ data })
}
```

### Route Handler with CORS

```typescript
// app/api/data/route.ts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function GET() {
  const data = await getData()
  return Response.json(data, { headers: corsHeaders })
}

export async function POST(request: Request) {
  const body = await request.json()
  const result = await createData(body)
  return Response.json(result, { 
    status: 201,
    headers: corsHeaders 
  })
}
```

### Route Handler with Streaming

```typescript
// app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const data = encoder.encode(`data: ${i}\n\n`)
        controller.enqueue(data)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      controller.close()
    },
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
```

## 📋 Common Patterns

### Pattern 1: RESTful CRUD
```typescript
// app/api/users/route.ts
export async function GET() { /* List */ }
export async function POST() { /* Create */ }

// app/api/users/[id]/route.ts
export async function GET() { /* Read */ }
export async function PUT() { /* Update */ }
export async function DELETE() { /* Delete */ }
```
**When to use**: Standard REST API patterns

### Pattern 2: Webhook Handler
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  
  // Verify webhook
  const event = verifyWebhook(body, signature)
  
  // Process event
  await processWebhook(event)
  
  return Response.json({ received: true })
}
```
**When to use**: Handling webhook callbacks

### Pattern 3: Proxy Route
```typescript
// app/api/proxy/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')
  
  if (!targetUrl) {
    return Response.json({ error: 'URL required' }, { status: 400 })
  }
  
  const res = await fetch(targetUrl)
  const data = await res.json()
  
  return Response.json(data)
}
```
**When to use**: Proxying requests to external APIs

## ⚠️ Common Mistakes

### Mistake 1: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
export async function GET() {
  const data = await fetchData() // Might throw
  return Response.json(data)
}
```
**Why**: Unhandled errors crash the API route.

```typescript
// ✅ Correct: Handle errors
export async function GET() {
  try {
    const data = await fetchData()
    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
```

### Mistake 2: Not Validating Input
```typescript
// ❌ Wrong: No validation
export async function POST(request: Request) {
  const body = await request.json()
  await createUser(body) // Unsafe
}
```
**Why**: Invalid data can cause errors or security issues.

```typescript
// ✅ Correct: Validate input
export async function POST(request: Request) {
  const body = await request.json()
  
  // Validate
  if (!body.name || !body.email) {
    return Response.json(
      { error: 'Name and email required' },
      { status: 400 }
    )
  }
  
  await createUser(body)
  return Response.json({ success: true }, { status: 201 })
}
```

### Mistake 3: Not Setting Proper Status Codes
```typescript
// ❌ Wrong: Always 200
export async function POST(request: Request) {
  const user = await createUser()
  return Response.json({ user }) // Should be 201
}
```
**Why**: Wrong status codes confuse API consumers.

```typescript
// ✅ Correct: Use appropriate status codes
export async function POST(request: Request) {
  const user = await createUser()
  return Response.json({ user }, { status: 201 }) // Created
}
```

## ✨ Best Practices

1. **Handle errors**: Always wrap in try-catch
2. **Validate input**: Validate all request data
3. **Use proper status codes**: 200, 201, 400, 401, 404, 500, etc.
4. **Set headers**: Content-Type, CORS, etc.
5. **Type safety**: Use TypeScript for type safety
6. **Security**: Validate, sanitize, authenticate
7. **Documentation**: Document your API endpoints

## 🔗 Related Concepts

- [HTTP Methods](./http-methods.md) - Handling different HTTP methods
- [Request/Response](./request-response.md) - Request and response handling
- [Edge Runtime](./edge-runtime.md) - Running on Edge
- [Authentication](./authentication.md) - API authentication

## 📚 Resources

### Official Documentation
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🧪 Practice Exercises

### Exercise 1: Basic CRUD API
**Difficulty**: Beginner  
**Goal**: Understand Route Handlers  
**Instructions**:
1. Create CRUD endpoints for a resource
2. Handle all HTTP methods
3. Add error handling
4. Test all endpoints

### Exercise 2: Authenticated API
**Difficulty**: Intermediate  
**Goal**: Practice API authentication  
**Instructions**:
1. Create protected endpoints
2. Add authentication middleware
3. Handle unauthorized requests
4. Test authentication flow

## 🎓 Key Takeaways

- Route Handlers use `route.ts` files
- Support all HTTP methods
- Use Web Request/Response APIs
- Can run on Node.js or Edge
- Always handle errors
- Validate input
- Use proper status codes

## ❓ FAQ

### Q: Where do I create Route Handlers?
**A**: Create `route.ts` files in the `app/api/` directory (or any `app/` subdirectory).

### Q: Can I use Route Handlers with Server Components?
**A**: Yes, Server Components can call Route Handlers, but prefer direct data fetching when possible.

### Q: Do Route Handlers need 'use client'?
**A**: No, Route Handlers are server-side by default.

### Q: Can I use Route Handlers for file uploads?
**A**: Yes, handle multipart/form-data in POST handlers.

### Q: How do I handle CORS?
**A**: Add CORS headers to your responses or use the OPTIONS method.

---

**Next Steps**: 
- Review: [HTTP Methods](./http-methods.md) for method handling
- Practice: Create a RESTful API
- Build: An authenticated API with Route Handlers

