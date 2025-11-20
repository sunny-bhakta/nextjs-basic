// Example 3: Request/Response Handling
// Demonstrates parsing requests and formatting responses

// app/api/users/route.ts - Reading JSON body
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

// app/api/search/route.ts - Reading query parameters
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

// app/api/data/route.ts - Reading headers
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

// app/api/upload/route.ts - Handling FormData
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
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return Response.json(
        { error: 'File too large (max 5MB)' },
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

// app/api/users/route.ts - Using NextResponse
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

// app/api/webhook/route.ts - Reading request body as text
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

// app/api/data/route.ts - Conditional response format
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

