// Example 7: Route Handlers (API Routes in App Router)
// Demonstrates how to create API endpoints using route handlers

// app/api/hello/route.ts
// Creates endpoint: GET /api/hello

export async function GET() {
  return Response.json({ message: 'Hello, Next.js!' })
}

// app/api/users/route.ts
// Creates endpoints: GET /api/users, POST /api/users

export async function GET() {
  // Simulate fetching users
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]
  
  return Response.json({ users })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body
    
    // Simulate creating a user
    const newUser = {
      id: Date.now(),
      name,
      email,
    }
    
    return Response.json(
      { user: newUser, message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// app/api/users/[id]/route.ts
// Creates endpoints: GET /api/users/[id], PUT /api/users/[id], DELETE /api/users/[id]

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  const userId = params.id
  
  // Simulate fetching a user
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
  }
  
  return Response.json({ user })
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const userId = params.id
    const body = await request.json()
    
    // Simulate updating a user
    const updatedUser = {
      id: userId,
      ...body,
    }
    
    return Response.json({ user: updatedUser, message: 'User updated' })
  } catch (error) {
    return Response.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const userId = params.id
  
  // Simulate deleting a user
  return Response.json(
    { message: `User ${userId} deleted successfully` },
    { status: 200 }
  )
}

// app/api/search/route.ts
// Demonstrates reading query parameters

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const page = searchParams.get('page') || '1'
  
  // Simulate search
  const results = {
    query,
    page: parseInt(page),
    results: [
      { id: 1, title: `Result for ${query}` },
      { id: 2, title: `Another result for ${query}` },
    ],
  }
  
  return Response.json(results)
}

// app/api/upload/route.ts
// Demonstrates handling form data

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    
    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Simulate file processing
    return Response.json({
      message: 'File uploaded successfully',
      filename: file.name,
      size: file.size,
      name,
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    )
  }
}

// app/api/auth/login/route.ts
// Demonstrates reading headers and setting cookies

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    // Simulate authentication
    if (email === 'user@example.com' && password === 'password') {
      return NextResponse.json(
        { message: 'Login successful' },
        {
          status: 200,
          headers: {
            'Set-Cookie': 'token=abc123; HttpOnly; Secure; SameSite=Strict',
          },
        }
      )
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

