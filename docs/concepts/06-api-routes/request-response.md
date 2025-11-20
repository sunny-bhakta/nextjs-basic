# Request/Response Handling

> **Category**: Core | **Related Concepts**: [Route Handlers](./route-handlers.md), [HTTP Methods](./http-methods.md)  
> **Last Updated**: 2024

## 📖 Overview

Route Handlers use the Web Request and Response APIs to handle incoming requests and send responses. Understanding how to parse requests, validate data, and format responses is crucial for building robust APIs.

**Key Points:**
- Use Web Request API for incoming requests
- Use Web Response API for responses
- Parse different content types (JSON, FormData, etc.)
- Handle query parameters and headers
- Set appropriate response headers
- Use NextResponse for advanced features

## 🎯 When to Use

- **Parsing Requests**: Extract data from requests
- **Validating Input**: Validate request data
- **Formatting Responses**: Structure API responses
- **Setting Headers**: CORS, content type, etc.
- **Error Responses**: Return proper error formats
- **Streaming**: Stream responses for large data

## 💻 Basic Example

### Reading JSON Body

```typescript
// app/api/users/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  
  // Validate
  if (!body.name || !body.email) {
    return Response.json(
      { error: 'Name and email required' },
      { status: 400 }
    )
  }
  
  const user = await createUser(body)
  return Response.json({ user }, { status: 201 })
}
```

### Reading Query Parameters

```typescript
// app/api/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  
  if (!query) {
    return Response.json(
      { error: 'Query parameter required' },
      { status: 400 }
    )
  }
  
  const results = await search(query, parseInt(page), parseInt(limit))
  return Response.json({ results })
}
```

### Reading Headers

```typescript
// app/api/data/route.ts
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const contentType = request.headers.get('content-type')
  const userAgent = request.headers.get('user-agent')
  
  if (!authHeader) {
    return Response.json(
      { error: 'Authorization required' },
      { status: 401 }
    )
  }
  
  const data = await getData(authHeader)
  return Response.json({ data })
}
```

## 🔧 Advanced Example

### Handling FormData

```typescript
// app/api/upload/route.ts
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    
    if (!file) {
      return Response.json(
        { error: 'File required' },
        { status: 400 }
      )
    }
    
    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      )
    }
    
    // Process file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save file
    await saveFile(buffer, file.name)
    
    return Response.json({
      success: true,
      filename: file.name,
      size: file.size
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    )
  }
}
```

### Using NextResponse

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await createUser(body)
    
    return NextResponse.json(
      { user },
      {
        status: 201,
        headers: {
          'Location': `/api/users/${user.id}`,
          'X-Created-At': new Date().toISOString(),
        },
      }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

### Streaming Response

```typescript
// app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const data = encoder.encode(`data: ${JSON.stringify({ count: i })}\n\n`)
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

### Reading Request Body as Text

```typescript
// app/api/webhook/route.ts
export async function POST(request: Request) {
  // Read as text for signature verification
  const body = await request.text()
  const signature = request.headers.get('x-signature')
  
  // Verify signature
  const isValid = verifySignature(body, signature)
  
  if (!isValid) {
    return Response.json(
      { error: 'Invalid signature' },
      { status: 401 }
    )
  }
  
  // Parse JSON after verification
  const data = JSON.parse(body)
  await processWebhook(data)
  
  return Response.json({ received: true })
}
```

### Conditional Response Format

```typescript
// app/api/data/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') || 'json'
  const data = await getData()
  
  if (format === 'xml') {
    const xml = convertToXML(data)
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
  
  if (format === 'csv') {
    const csv = convertToCSV(data)
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
      },
    })
  }
  
  // Default JSON
  return Response.json({ data })
}
```

## 📋 Common Patterns

### Pattern 1: JSON Request/Response
```typescript
export async function POST(request: Request) {
  const body = await request.json()
  const result = await process(body)
  return Response.json({ result })
}
```
**When to use**: Standard API communication

### Pattern 2: FormData Handling
```typescript
export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  // Process file
}
```
**When to use**: File uploads

### Pattern 3: Query Parameters
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const param = searchParams.get('param')
  // Use parameter
}
```
**When to use**: Filtering, pagination, search

## ⚠️ Common Mistakes

### Mistake 1: Not Validating Request Body
```typescript
// ❌ Wrong: No validation
export async function POST(request: Request) {
  const body = await request.json()
  await createUser(body) // Unsafe
}
```
**Why**: Invalid data can cause errors.

```typescript
// ✅ Correct: Validate input
export async function POST(request: Request) {
  const body = await request.json()
  
  if (!body.name || !body.email) {
    return Response.json(
      { error: 'Name and email required' },
      { status: 400 }
    )
  }
  
  await createUser(body)
}
```

### Mistake 2: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
export async function POST(request: Request) {
  const body = await request.json()
  const result = await process(body) // Might throw
  return Response.json({ result })
}
```
**Why**: Unhandled errors crash the route.

```typescript
// ✅ Correct: Handle errors
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await process(body)
    return Response.json({ result })
  } catch (error) {
    return Response.json(
      { error: 'Processing failed' },
      { status: 500 }
    )
  }
}
```

### Mistake 3: Not Setting Content-Type
```typescript
// ❌ Wrong: Missing Content-Type
export async function GET() {
  const data = { message: 'Hello' }
  return new Response(JSON.stringify(data))
}
```
**Why**: Clients might not parse correctly.

```typescript
// ✅ Correct: Set Content-Type
export async function GET() {
  const data = { message: 'Hello' }
  return Response.json(data) // Automatically sets Content-Type
}
```

## ✨ Best Practices

1. **Validate input**: Always validate request data
2. **Handle errors**: Wrap in try-catch blocks
3. **Set headers**: Content-Type, CORS, etc.
4. **Use Response.json**: For JSON responses
5. **Parse correctly**: Use appropriate parsing method
6. **Set status codes**: Use appropriate HTTP status codes
7. **Type safety**: Use TypeScript for type safety

## 🔗 Related Concepts

- [Route Handlers](./route-handlers.md) - Creating handlers
- [HTTP Methods](./http-methods.md) - Method handling
- [Error Handling](./error-handling.md) - Error responses

## 📚 Resources

### Official Documentation
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🧪 Practice Exercises

### Exercise 1: Request Parsing
**Difficulty**: Beginner  
**Goal**: Understand request handling  
**Instructions**:
1. Create endpoints that read JSON, FormData, query params
2. Validate input
3. Return appropriate responses
4. Test all request types

### Exercise 2: Advanced Responses
**Difficulty**: Intermediate  
**Goal**: Practice response formatting  
**Instructions**:
1. Create endpoints with different response formats
2. Set custom headers
3. Use NextResponse
4. Handle streaming

## 🎓 Key Takeaways

- Use `request.json()` for JSON bodies
- Use `request.formData()` for form data
- Use `request.text()` for raw text
- Parse query parameters from URL
- Read headers with `request.headers.get()`
- Use `Response.json()` for JSON responses
- Set appropriate headers and status codes

## ❓ FAQ

### Q: How do I read JSON from request?
**A**: Use `await request.json()` to parse JSON body.

### Q: How do I handle file uploads?
**A**: Use `await request.formData()` and get the file with `formData.get('file')`.

### Q: How do I read query parameters?
**A**: Use `new URL(request.url).searchParams` to access query parameters.

### Q: Can I stream responses?
**A**: Yes, use `ReadableStream` and return it as a Response.

### Q: What's the difference between Response and NextResponse?
**A**: NextResponse extends Response with additional convenience methods and better TypeScript support.

---

**Next Steps**: 
- Review: [Error Handling](./error-handling.md) for error responses
- Practice: Create endpoints with different request types
- Build: A robust API with proper request/response handling

