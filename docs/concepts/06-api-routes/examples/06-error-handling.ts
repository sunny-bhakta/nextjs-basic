// Example 6: Error Handling
// Demonstrates comprehensive error handling in API routes

// app/api/users/route.ts - Basic error handling
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

// app/api/users/route.ts - Validation error handling
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
  } catch (error: any) {
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

// app/api/users/[id]/route.ts - Not found error
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

// app/lib/errors.ts - Custom error classes
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

// app/api/users/route.ts - Using custom error classes
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

// app/lib/error-handler.ts - Error handler utility
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

// app/api/users/route.ts - Using error handler utility
import { handleApiError } from '@/lib/error-handler'

export async function GET() {
  try {
    const users = await getUsers()
    return Response.json({ users })
  } catch (error) {
    return handleApiError(error)
  }
}

// app/lib/logger.ts - Error logging
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

// app/api/users/route.ts - Error logging
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

