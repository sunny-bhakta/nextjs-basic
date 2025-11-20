# API Route Patterns

> **Category**: Core | **Related Concepts**: [Route Handlers](./route-handlers.md), [Data Fetching Patterns](../05-data-fetching/patterns.md)  
> **Last Updated**: 2024

## 📖 Overview

API Route Patterns are common approaches and best practices for building APIs in Next.js. These patterns help you create consistent, maintainable, and scalable API endpoints.

**Key Points:**
- Common patterns for different use cases
- Best practices for API design
- Reusable code patterns
- Error handling patterns
- Authentication patterns
- Performance optimization patterns

## 🎯 When to Use

- **Building APIs**: When creating API endpoints
- **Consistency**: Maintaining consistent API design
- **Best Practices**: Following proven patterns
- **Code Reuse**: Reusable patterns across routes
- **Scalability**: Patterns that scale well

## 💻 Basic Example

### RESTful CRUD Pattern

```typescript
// app/api/users/route.ts
// GET - List all users
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  const users = await getUsers({ page, limit })
  return Response.json({ users })
}

// POST - Create user
export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return Response.json({ user }, { status: 201 })
}

// app/api/users/[id]/route.ts
// GET - Get user
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUserById(params.id)
  if (!user) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json({ user })
}

// PUT - Update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const user = await updateUser(params.id, body)
  return Response.json({ user })
}

// DELETE - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteUser(params.id)
  return Response.json({ message: 'Deleted' }, { status: 200 })
}
```

## 🔧 Advanced Example

### Middleware Pattern

```typescript
// app/lib/api-middleware.ts
export async function withAuth(
  handler: (request: Request, user: any) => Promise<Response>
) {
  return async (request: Request, context?: any) => {
    const user = await authenticateRequest(request)
    
    if (!user) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    return handler(request, user)
  }
}

export async function withValidation(
  schema: any,
  handler: (request: Request, data: any) => Promise<Response>
) {
  return async (request: Request, context?: any) => {
    const body = await request.json()
    const result = schema.safeParse(body)
    
    if (!result.success) {
      return Response.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      )
    }
    
    return handler(request, result.data)
  }
}

// app/api/protected/route.ts
import { withAuth } from '@/lib/api-middleware'

async function handler(request: Request, user: any) {
  const data = await getProtectedData(user.id)
  return Response.json({ data })
}

export const GET = withAuth(handler)
```

### Pagination Pattern

```typescript
// app/api/products/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = (page - 1) * limit
  
  const [products, total] = await Promise.all([
    getProducts({ limit, offset }),
    getProductCount()
  ])
  
  const totalPages = Math.ceil(total / limit)
  
  return Response.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  })
}
```

### Webhook Pattern

```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  
  if (!signature) {
    return Response.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }
  
  // Verify webhook signature
  const event = verifyStripeWebhook(body, signature)
  
  // Process event based on type
  switch (event.type) {
    case 'payment.succeeded':
      await handlePaymentSucceeded(event.data)
      break
    case 'payment.failed':
      await handlePaymentFailed(event.data)
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }
  
  return Response.json({ received: true })
}
```

### File Upload Pattern

```typescript
// app/api/upload/route.ts
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Validate file
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return Response.json(
        { error: 'File too large' },
        { status: 400 }
      )
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }
    
    // Process file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Upload to storage (S3, etc.)
    const url = await uploadToStorage(buffer, file.name)
    
    return Response.json({
      success: true,
      url,
      filename: file.name,
      size: file.size
    })
  } catch (error) {
    return Response.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

## 📋 Common Patterns

### Pattern 1: RESTful Resource
```typescript
// Collection: /api/resource
GET    // List
POST   // Create

// Item: /api/resource/[id]
GET    // Read
PUT    // Update
DELETE // Delete
```
**When to use**: Standard REST API

### Pattern 2: Action Endpoints
```typescript
// app/api/users/[id]/activate/route.ts
export async function POST() {
  // Action on resource
}
```
**When to use**: Non-CRUD operations

### Pattern 3: Nested Resources
```typescript
// app/api/users/[userId]/posts/route.ts
export async function GET() {
  // Get posts for specific user
}
```
**When to use**: Related resources

## ⚠️ Common Mistakes

### Mistake 1: Inconsistent Response Format
```typescript
// ❌ Wrong: Inconsistent formats
export async function GET() {
  return Response.json(users) // Array
}

export async function POST() {
  return Response.json({ user }) // Object
}
```
**Why**: Inconsistent formats confuse API consumers.

```typescript
// ✅ Correct: Consistent format
export async function GET() {
  return Response.json({ data: users })
}

export async function POST() {
  return Response.json({ data: user })
}
```

### Mistake 2: Not Using Status Codes
```typescript
// ❌ Wrong: Always 200
export async function POST() {
  const user = await createUser()
  return Response.json({ user }) // Should be 201
}
```
**Why**: Status codes communicate operation results.

```typescript
// ✅ Correct: Use proper status codes
export async function POST() {
  const user = await createUser()
  return Response.json({ user }, { status: 201 })
}
```

### Mistake 3: No Input Validation
```typescript
// ❌ Wrong: No validation
export async function POST(request: Request) {
  const body = await request.json()
  await createUser(body) // Unsafe
}
```
**Why**: Invalid input causes errors.

```typescript
// ✅ Correct: Validate input
export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name) {
    return Response.json({ error: 'Name required' }, { status: 400 })
  }
  await createUser(body)
}
```

## ✨ Best Practices

1. **Follow REST conventions**: Use standard HTTP methods
2. **Consistent responses**: Use consistent response format
3. **Proper status codes**: Use appropriate HTTP status codes
4. **Validate input**: Always validate request data
5. **Handle errors**: Comprehensive error handling
6. **Document APIs**: Document your API endpoints
7. **Version APIs**: Consider API versioning

## 🔗 Related Concepts

- [Route Handlers](./route-handlers.md) - Handler basics
- [HTTP Methods](./http-methods.md) - Method handling
- [Data Fetching Patterns](../05-data-fetching/patterns.md) - Data patterns

## 📚 Resources

### Official Documentation
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🧪 Practice Exercises

### Exercise 1: RESTful API
**Difficulty**: Intermediate  
**Goal**: Build a complete REST API  
**Instructions**:
1. Create CRUD endpoints
2. Add pagination
3. Implement error handling
4. Add authentication
5. Test all endpoints

### Exercise 2: Advanced Patterns
**Difficulty**: Advanced  
**Goal**: Practice advanced patterns  
**Instructions**:
1. Implement middleware pattern
2. Add webhook handling
3. Create file upload endpoint
4. Add rate limiting
5. Document the API

## 🎓 Key Takeaways

- Follow REST conventions
- Use consistent response formats
- Implement proper error handling
- Validate all input
- Use appropriate status codes
- Consider middleware for reusable logic
- Document your APIs

## ❓ FAQ

### Q: Should I use REST or GraphQL?
**A**: REST is simpler and works well for most cases. GraphQL is better for complex data requirements.

### Q: How do I version my API?
**A**: Use URL versioning: `/api/v1/users` or header versioning.

### Q: Should I use middleware?
**A**: Yes, middleware helps with reusable logic like auth and validation.

### Q: How do I handle file uploads?
**A**: Use `request.formData()` to get files from multipart/form-data.

### Q: What's the best response format?
**A**: Use consistent format like `{ data: ..., error?: ... }` or follow JSON:API spec.

---

**Next Steps**: 
- Review: Individual guide topics for details
- Practice: Implement different patterns
- Build: A production-ready API with best practices

