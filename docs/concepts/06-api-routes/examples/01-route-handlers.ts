// Example 1: Route Handlers
// Demonstrates creating API endpoints with route.ts

// app/api/hello/route.ts - Simple GET handler
export async function GET() {
  return Response.json({ message: 'Hello, Next.js!' })
}

// app/api/users/route.ts - Multiple HTTP methods
export async function GET() {
  const users = await getUsers()
  return Response.json({ users })
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return Response.json({ user }, { status: 201 })
}

// app/api/users/[id]/route.ts - Dynamic route handler
interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const user = await getUserById(params.id)
  
  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return Response.json({ user })
}

export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  const body = await request.json()
  const user = await updateUser(params.id, body)
  return Response.json({ user })
}

export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  await deleteUser(params.id)
  return Response.json(
    { message: 'User deleted' },
    { status: 200 }
  )
}

// app/api/protected/route.ts - Route handler with authentication
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
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData(user.id)
  return Response.json({ data })
}

// app/api/data/route.ts - Route handler with CORS
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

// app/api/stream/route.ts - Streaming response
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

