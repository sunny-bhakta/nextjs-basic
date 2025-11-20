// Example 8: Complete API Routes Example
// A comprehensive example combining all API route concepts

// app/api/products/route.ts - Complete CRUD API with all features
import { NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

// GET - List products with pagination
export async function GET(request: Request) {
  try {
    // Authenticate
    const { user, error } = await authenticateRequest(request)
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Rate limiting
    const rateLimit = checkRateLimit(user.id, 100, 60000)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '100',
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }
    
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    // Fetch products
    const [products, total] = await Promise.all([
      getProducts({ page, limit, category, search }),
      getProductCount({ category, search })
    ])
    
    const totalPages = Math.ceil(total / limit)
    
    return NextResponse.json(
      {
        data: products,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - Create product
export async function POST(request: Request) {
  try {
    // Authenticate
    const { user, error } = await authenticateRequest(request)
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Check admin role
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    
    // Parse and validate body
    const body = await request.json()
    
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: {
            name: body.name ? null : 'Name is required',
            price: body.price ? null : 'Price is required',
            category: body.category ? null : 'Category is required'
          }
        },
        { status: 400 }
      )
    }
    
    // Create product
    const product = await createProduct(body)
    
    return NextResponse.json(
      { product },
      {
        status: 201,
        headers: {
          'Location': `/api/products/${product.id}`,
          'X-Created-At': new Date().toISOString(),
        },
      }
    )
  } catch (error: any) {
    if (error.code === 'DUPLICATE_NAME') {
      return NextResponse.json(
        { error: 'Product name already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// app/api/products/[id]/route.ts - Single product operations
import { NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/auth'
import { NotFoundError } from '@/lib/errors'
import { handleApiError } from '@/lib/error-handler'

// GET - Get single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id)
    
    if (!product) {
      throw new NotFoundError('Product')
    }
    
    return NextResponse.json({ product })
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT - Replace entire product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(request)
    
    if (error || !user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    const product = await replaceProduct(params.id, body)
    
    return NextResponse.json({ product })
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH - Partially update product
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(request)
    
    if (error || !user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    const product = await updateProduct(params.id, body)
    
    return NextResponse.json({ product })
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(request)
    
    if (error || !user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    
    await deleteProduct(params.id)
    
    return NextResponse.json(
      { message: 'Product deleted' },
      { status: 200 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}

// app/api/products/[id]/upload/route.ts - File upload endpoint
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(request)
    
    if (error || !user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'File required' },
        { status: 400 }
      )
    }
    
    // Validate file
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      )
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }
    
    // Process file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Upload to storage
    const url = await uploadToStorage(buffer, file.name, params.id)
    
    // Update product with image URL
    await updateProduct(params.id, { imageUrl: url })
    
    return NextResponse.json({
      success: true,
      url,
      filename: file.name,
      size: file.size
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// app/api/webhooks/stripe/route.ts - Webhook handler
export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }
    
    // Verify webhook signature
    const event = verifyStripeWebhook(body, signature)
    
    // Process event
    switch (event.type) {
      case 'payment.succeeded':
        await handlePaymentSucceeded(event.data)
        break
      case 'payment.failed':
        await handlePaymentFailed(event.data)
        break
      case 'customer.created':
        await handleCustomerCreated(event.data)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    return handleApiError(error)
  }
}

// app/api/revalidate/route.ts - On-demand revalidation
import { revalidateTag, revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    // Authenticate
    const apiKey = request.headers.get('x-api-key')
    
    if (apiKey !== process.env.REVALIDATE_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { tag, path } = body
    
    if (tag) {
      revalidateTag(tag)
    }
    
    if (path) {
      revalidatePath(path)
    }
    
    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return handleApiError(error)
  }
}

// Summary:
// - Complete CRUD operations
// - Authentication and authorization
// - Rate limiting
// - Error handling
// - Validation
// - File uploads
// - Webhooks
// - Pagination
// - On-demand revalidation
// - Best practices

