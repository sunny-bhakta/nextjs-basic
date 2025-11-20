# Route Handlers (API Routes)

## Overview

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs. They're the App Router equivalent of API Routes in the Pages Router.

## Basic Syntax

Create a `route.ts` (or `route.js`) file in any `app` directory:

```typescript
// app/api/hello/route.ts
export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}
```

This creates an API endpoint at `/api/hello`.

## HTTP Methods

Route Handlers support all HTTP methods:

```typescript
// app/api/users/route.ts
export async function GET() {
  return Response.json({ users: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ created: true, data: body })
}

export async function PUT(request: Request) {
  // Handle PUT request
}

export async function DELETE() {
  // Handle DELETE request
}

export async function PATCH(request: Request) {
  // Handle PATCH request
}
```

## Reading Request Data

### JSON Body

```typescript
export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ received: body })
}
```

### Form Data

```typescript
export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  return Response.json({ name })
}
```

### Query Parameters

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  return Response.json({ id })
}
```

### Headers

```typescript
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  return Response.json({ auth: authHeader })
}
```

## Response Helpers

### JSON Response

```typescript
export async function GET() {
  return Response.json({ message: 'Hello' })
}
```

### Text Response

```typescript
export async function GET() {
  return new Response('Hello, World!')
}
```

### Redirect

```typescript
import { redirect } from 'next/navigation'

export async function GET() {
  redirect('/home')
}
```

### NextResponse

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}

// With status code
export async function POST() {
  return NextResponse.json(
    { error: 'Not found' },
    { status: 404 }
  )
}

// With headers
export async function GET() {
  return NextResponse.json(
    { data: 'secret' },
    {
      headers: {
        'Set-Cookie': 'token=abc123',
      },
    }
  )
}
```

## Dynamic Route Handlers

```typescript
// app/api/users/[id]/route.ts
interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  const userId = params.id
  return Response.json({ userId })
}
```

## Route Segment Config

Configure route behavior:

```typescript
export const dynamic = 'force-dynamic' // or 'force-static'
export const revalidate = 60 // Revalidate every 60 seconds
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs' // or 'edge'
export const preferredRegion = 'us-east-1'
```

## Edge Runtime

Run on the Edge:

```typescript
export const runtime = 'edge'

export async function GET() {
  return Response.json({ message: 'Running on Edge' })
}
```

## Complete Example

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  
  const users = await fetchUsers(parseInt(page))
  
  return NextResponse.json({
    users,
    page: parseInt(page),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await createUser(body)
    
    return NextResponse.json(
      { user },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

## Best Practices

1. **Validate input**: Always validate request data
2. **Handle errors**: Use try-catch and return appropriate status codes
3. **Use TypeScript**: Type your request and response data
4. **Consider Edge Runtime**: Use Edge for better performance when possible
5. **Set proper headers**: Include CORS headers if needed

## Common Mistakes

### ❌ Wrong: Not handling errors

```typescript
export async function POST(request: Request) {
  const body = await request.json() // Might throw error
  return Response.json({ data: body })
}
```

### ✅ Correct: Handle errors properly

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json()
    return Response.json({ data: body })
  } catch (error) {
    return Response.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}
```

## Related Topics

- [API Routes](../06-api-routes/README.md)
- [Data Fetching](../05-data-fetching/README.md)
- [Error Handling](../26-error-handling/README.md)

