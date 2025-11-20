# API Routes Examples

This directory contains practical code examples demonstrating Next.js API Routes (Route Handlers) concepts.

## Examples

### 1. Route Handlers (`01-route-handlers.ts`)
Demonstrates basic Route Handler creation:
- Simple GET handler
- Multiple HTTP methods
- Dynamic routes
- Authentication
- CORS handling
- Streaming responses

### 2. HTTP Methods (`02-http-methods.ts`)
Shows handling different HTTP methods:
- GET (read)
- POST (create)
- PUT (replace)
- PATCH (update)
- DELETE (remove)
- OPTIONS (CORS)
- HEAD (headers only)

### 3. Request/Response (`03-request-response.ts`)
Demonstrates request/response handling:
- Reading JSON body
- Reading query parameters
- Reading headers
- Handling FormData
- Using NextResponse
- Reading body as text
- Conditional response formats

### 4. Edge Runtime (`04-edge-runtime.ts`)
Shows Edge Runtime usage:
- Basic Edge handler
- Geo headers
- Edge caching
- Edge authentication
- Proxying external APIs
- A/B testing
- Redirects

### 5. Authentication (`05-authentication.ts`)
Demonstrates API authentication:
- API key authentication
- JWT token authentication
- Cookie-based authentication
- Authentication middleware
- Role-based authorization
- Rate limiting

### 6. Error Handling (`06-error-handling.ts`)
Shows comprehensive error handling:
- Basic error handling
- Validation errors
- Not found errors
- Custom error classes
- Error handler utility
- Error logging

### 7. Patterns (`07-patterns.ts`)
Demonstrates common API patterns:
- RESTful CRUD
- Pagination
- Webhooks
- File uploads
- Proxy pattern
- Middleware pattern
- Action endpoints
- Nested resources

### 8. Complete Example (`08-complete-example.ts`)
A comprehensive example combining:
- All HTTP methods
- Authentication and authorization
- Rate limiting
- Error handling
- Validation
- File uploads
- Webhooks
- Pagination

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/api/` directory
3. **Set up dependencies** if needed (JWT, validation libraries, etc.)
4. **Run your Next.js app**: `npm run dev`
5. **Test endpoints** using:
   - Browser (for GET requests)
   - Postman or curl
   - Your frontend application

**Note**: These example files intentionally show multiple patterns in a single file for documentation purposes. In a real project, each route handler would be in its own file. Some functions (like `getUsers()`, `createUser()`, etc.) are placeholders - replace them with your actual database/API calls.

## File Structure

When implementing these examples, your `app/api/` directory should look like:

```
app/
└── api/
    ├── hello/
    │   └── route.ts              # Simple GET handler
    ├── users/
    │   ├── route.ts              # List/Create users
    │   └── [id]/
    │       └── route.ts          # Get/Update/Delete user
    ├── products/
    │   ├── route.ts              # List/Create products
    │   └── [id]/
    │       ├── route.ts          # Get/Update/Delete product
    │       └── upload/
    │           └── route.ts      # Upload product image
    ├── protected/
    │   └── route.ts              # Protected endpoint
    ├── webhooks/
    │   └── stripe/
    │       └── route.ts          # Stripe webhook
    ├── revalidate/
    │   └── route.ts              # On-demand revalidation
    └── ...
```

## Key Concepts Demonstrated

### Route Handlers
- Created with `route.ts` files
- Support all HTTP methods
- Use Web Request/Response APIs
- Can run on Node.js or Edge runtime

### HTTP Methods
- GET: Retrieve data
- POST: Create resources
- PUT: Replace entire resource
- PATCH: Partially update resource
- DELETE: Remove resources
- OPTIONS: CORS preflight
- HEAD: Get headers only

### Request Handling
- `request.json()` - Parse JSON body
- `request.formData()` - Parse form data
- `request.text()` - Get raw text
- `new URL(request.url).searchParams` - Query parameters
- `request.headers.get()` - Read headers

### Response Formatting
- `Response.json()` - JSON response
- `NextResponse.json()` - Enhanced JSON response
- `new Response()` - Custom response
- Set status codes and headers

### Authentication
- API keys
- JWT tokens
- Cookie sessions
- Role-based access control

### Error Handling
- Try-catch blocks
- Custom error classes
- Proper status codes
- Error logging
- Consistent error format

## Testing the Examples

### Using curl

```bash
# GET request
curl http://localhost:3000/api/users

# POST request
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# With authentication
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using fetch (in your app)

```typescript
// GET request
const res = await fetch('/api/users')
const data = await res.json()

// POST request
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
})
const data = await res.json()
```

## Dependencies

Some examples may require additional packages:

```bash
# JWT authentication
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken

# Validation
npm install zod

# Database (examples use placeholder functions)
npm install prisma @prisma/client
# or
npm install mongodb
```

## Best Practices

1. **Always handle errors**: Wrap operations in try-catch
2. **Validate input**: Validate all request data
3. **Use proper status codes**: 200, 201, 400, 401, 404, 500, etc.
4. **Set headers**: Content-Type, CORS, etc.
5. **Authenticate endpoints**: Protect sensitive endpoints
6. **Rate limiting**: Prevent abuse
7. **Log errors**: For debugging and monitoring
8. **Consistent responses**: Use same format for all responses

## Common Patterns

### RESTful API
```typescript
// Collection: /api/resource
GET    // List
POST   // Create

// Resource: /api/resource/[id]
GET    // Read
PUT    // Update
DELETE // Delete
```

### Authentication Middleware
```typescript
async function withAuth(handler) {
  return async (request) => {
    const user = await authenticate(request)
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
    return handler(request, user)
  }
}
```

### Error Handling
```typescript
try {
  // Operation
} catch (error) {
  if (error instanceof ValidationError) {
    return Response.json({ error: error.message }, { status: 400 })
  }
  return Response.json({ error: 'Internal error' }, { status: 500 })
}
```

## Next Steps

After trying these examples:
1. Modify them to fit your needs
2. Combine different patterns
3. Create your own API patterns
4. Explore the [detailed guides](../README.md) for more information
5. Set up error tracking and monitoring
6. Add API documentation (OpenAPI/Swagger)

