// Example 7: API Patterns
// Demonstrates common patterns and best practices

// app/api/users/route.ts - RESTful CRUD Pattern
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
  try {
    const body = await request.json()
    
    if (!body.name || !body.email) {
      return Response.json(
        { error: 'Name and email required' },
        { status: 400 }
      )
    }
    
    const user = await createUser(body)
    return Response.json({ user }, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// app/api/users/[id]/route.ts
// GET - Read user
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUserById(params.id)
  
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
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
  return Response.json({ message: 'User deleted' }, { status: 200 })
}

// app/api/products/route.ts - Pagination Pattern
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

// app/api/webhooks/stripe/route.ts - Webhook Pattern
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

// app/api/upload/route.ts - File Upload Pattern
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

// app/api/proxy/route.ts - Proxy Pattern
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')
  
  if (!targetUrl) {
    return Response.json(
      { error: 'URL parameter required' },
      { status: 400 }
    )
  }
  
  try {
    const res = await fetch(targetUrl)
    const data = await res.json()
    
    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    )
  }
}

// app/lib/api-middleware.ts - Middleware Pattern
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

// app/api/protected/route.ts - Using middleware
import { withAuth } from '@/lib/api-middleware'

async function handler(request: Request, user: any) {
  const data = await getProtectedData(user.id)
  return Response.json({ data })
}

export const GET = withAuth(handler)

// app/api/users/[id]/activate/route.ts - Action Endpoint Pattern
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await activateUser(params.id)
    return Response.json({ message: 'User activated' }, { status: 200 })
  } catch (error) {
    return Response.json(
      { error: 'Failed to activate user' },
      { status: 500 }
    )
  }
}

// app/api/users/[userId]/posts/route.ts - Nested Resource Pattern
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const posts = await getPostsByUserId(params.userId)
  return Response.json({ posts })
}

