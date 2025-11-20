# HTTP Methods

> **Category**: Core | **Related Concepts**: [Route Handlers](./route-handlers.md), [Request/Response](./request-response.md)  
> **Last Updated**: 2024

## 📖 Overview

Route Handlers in Next.js support all HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. Each method has specific use cases and conventions in RESTful API design.

**Key Points:**
- Support all standard HTTP methods
- Each method has specific purpose
- Follow REST conventions
- Use appropriate methods for operations
- Handle method-specific logic

## 🎯 When to Use

- **GET**: Retrieve data (read operations)
- **POST**: Create new resources
- **PUT**: Replace entire resource
- **PATCH**: Partially update resource
- **DELETE**: Remove resources
- **OPTIONS**: CORS preflight requests
- **HEAD**: Get headers without body

## 💻 Basic Example

### GET - Retrieve Data

```typescript
// app/api/users/route.ts
export async function GET() {
  const users = await getUsers()
  return Response.json({ users })
}
```

### POST - Create Resource

```typescript
// app/api/users/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return Response.json({ user }, { status: 201 })
}
```

### PUT - Update Resource

```typescript
// app/api/users/[id]/route.ts
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const user = await updateUser(params.id, body)
  return Response.json({ user })
}
```

### DELETE - Remove Resource

```typescript
// app/api/users/[id]/route.ts
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteUser(params.id)
  return Response.json({ message: 'User deleted' }, { status: 200 })
}
```

## 🔧 Advanced Example

### Complete CRUD API

```typescript
// app/api/products/route.ts
// GET - List all products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  const products = await getProducts({ page, limit })
  return Response.json({ products })
}

// POST - Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate
    if (!body.name || !body.price) {
      return Response.json(
        { error: 'Name and price required' },
        { status: 400 }
      )
    }
    
    const product = await createProduct(body)
    return Response.json({ product }, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// app/api/products/[id]/route.ts
// GET - Get single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await getProductById(params.id)
  
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 })
  }
  
  return Response.json({ product })
}

// PUT - Replace entire product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const product = await replaceProduct(params.id, body)
  return Response.json({ product })
}

// PATCH - Partially update product
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const product = await updateProduct(params.id, body)
  return Response.json({ product })
}

// DELETE - Remove product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteProduct(params.id)
  return Response.json({ message: 'Product deleted' }, { status: 200 })
}
```

### OPTIONS for CORS

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

### HEAD Method

```typescript
// app/api/files/[name]/route.ts
export async function HEAD(
  request: Request,
  { params }: { params: { name: string } }
) {
  const file = await getFileInfo(params.name)
  
  if (!file) {
    return new Response(null, { status: 404 })
  }
  
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size.toString(),
      'Last-Modified': file.modified.toUTCString(),
    },
  })
}
```

## 📋 Common Patterns

### Pattern 1: RESTful CRUD
```typescript
// Collection: /api/users
GET    // List
POST   // Create

// Resource: /api/users/[id]
GET    // Read
PUT    // Replace
PATCH  // Update
DELETE // Delete
```
**When to use**: Standard REST API design

### Pattern 2: Query Parameters
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get('filter')
  const sort = searchParams.get('sort')
  // Use parameters
}
```
**When to use**: Filtering, sorting, pagination

### Pattern 3: Method-Specific Logic
```typescript
export async function POST(request: Request) {
  // Create logic
}

export async function PUT(request: Request) {
  // Replace logic
}

export async function PATCH(request: Request) {
  // Partial update logic
}
```
**When to use**: Different operations need different logic

## ⚠️ Common Mistakes

### Mistake 1: Using Wrong Method
```typescript
// ❌ Wrong: Using GET for mutation
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  await deleteUser(searchParams.get('id')) // Should be DELETE
}
```
**Why**: GET should be idempotent and safe.

```typescript
// ✅ Correct: Use DELETE method
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteUser(params.id)
}
```

### Mistake 2: Not Using Proper Status Codes
```typescript
// ❌ Wrong: Always 200
export async function POST(request: Request) {
  const user = await createUser()
  return Response.json({ user }) // Should be 201
}
```
**Why**: Status codes communicate operation results.

```typescript
// ✅ Correct: Use appropriate status codes
export async function POST(request: Request) {
  const user = await createUser()
  return Response.json({ user }, { status: 201 }) // Created
}
```

### Mistake 3: PUT vs PATCH Confusion
```typescript
// ❌ Wrong: Using PUT for partial update
export async function PUT(request: Request, { params }) {
  const body = await request.json()
  await updateUser(params.id, body) // Partial update
}
```
**Why**: PUT should replace entire resource.

```typescript
// ✅ Correct: Use PATCH for partial updates
export async function PATCH(request: Request, { params }) {
  const body = await request.json()
  await updateUser(params.id, body) // Partial update
}
```

## ✨ Best Practices

1. **Follow REST conventions**: Use methods as intended
2. **Use proper status codes**: 200, 201, 400, 404, 500, etc.
3. **GET should be safe**: No side effects
4. **POST for creation**: Use 201 status code
5. **PUT for replacement**: Replace entire resource
6. **PATCH for updates**: Partial updates
7. **DELETE for removal**: Use 200 or 204 status

## 🔗 Related Concepts

- [Route Handlers](./route-handlers.md) - Creating route handlers
- [Request/Response](./request-response.md) - Handling requests
- [Authentication](./authentication.md) - Securing endpoints

## 📚 Resources

### Official Documentation
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🧪 Practice Exercises

### Exercise 1: RESTful API
**Difficulty**: Beginner  
**Goal**: Understand HTTP methods  
**Instructions**:
1. Create CRUD endpoints
2. Use appropriate HTTP methods
3. Set proper status codes
4. Test all methods

### Exercise 2: Advanced Methods
**Difficulty**: Intermediate  
**Goal**: Practice all HTTP methods  
**Instructions**:
1. Implement GET, POST, PUT, PATCH, DELETE
2. Add OPTIONS for CORS
3. Add HEAD method
4. Test all methods

## 🎓 Key Takeaways

- GET: Retrieve data (read)
- POST: Create resources
- PUT: Replace entire resource
- PATCH: Partially update resource
- DELETE: Remove resources
- OPTIONS: CORS preflight
- HEAD: Get headers only
- Use appropriate status codes
- Follow REST conventions

## ❓ FAQ

### Q: What's the difference between PUT and PATCH?
**A**: PUT replaces the entire resource, PATCH partially updates it.

### Q: Should GET requests have side effects?
**A**: No, GET should be safe and idempotent (no side effects).

### Q: What status code for POST?
**A**: Use 201 (Created) for successful POST requests.

### Q: Can I use custom HTTP methods?
**A**: Route Handlers support standard HTTP methods. Custom methods aren't supported.

### Q: How do I handle OPTIONS for CORS?
**A**: Create an OPTIONS handler that returns CORS headers.

---

**Next Steps**: 
- Review: [Request/Response](./request-response.md) for handling requests
- Practice: Create a RESTful API
- Build: An API with all HTTP methods

